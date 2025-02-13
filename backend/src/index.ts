import "reflect-metadata";
import "module-alias/register";
import cors from "cors";
import datasource from "./lib/datasource";
import depthLimit from "graphql-depth-limit";
import express from "express";
import http from "http";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import Cookies from "cookies";
import UserEntity from "./entities/User.entity";
import { jwtVerify, SignJWT } from "jose";
import UserService from "./services/user.service";
import RefreshTokenService from "./services/refresh.service";
import { GraphQLError } from "graphql";
export interface MyContext {
  req: express.Request;
  res: express.Response;
  user: UserEntity | null;
}
export interface Payload {
  email: string;
}

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  validationRules: [depthLimit(5)], //n+1
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
async function main() {
  await server.start();
  //route dédiée au refreshtoken :  (séparation des responsabilités!)

  app.post(
    "/auth/refresh",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:5173", "https://studio.apollographql.com"],
      credentials: true,
    }),
    // cors<cors.CorsRequest>({origin: ["http://localhost:5173"]}),
    express.json({ limit: "50mb" }),
    async (req, res) => {
      const cookies = new Cookies(req, res);
      const refreshToken = cookies.get("refreshtoken");

      if (!refreshToken) {
        res.status(401).json({ message: "Pas de refresh token" });
        return;
      }
      try {
        const refreshService = new RefreshTokenService();
        const refreshData = await refreshService.findRefreshToken(refreshToken);

        if (!refreshData || refreshData.expiresAt < new Date()) {
          cookies.set("token", null);
          cookies.set("refreshtoken", null);
          res.status(401).json({ message: "Refresh token invalide" });
          return;
        }

        // Création du nouveau token
        const newToken = await new SignJWT({ email: refreshData.user.email })
          .setProtectedHeader({ alg: "HS256", typ: "jwt" })
          .setExpirationTime("2h")
          .sign(new TextEncoder().encode(process.env.SECRET_KEY));

        // Mise à jour du cookie avec le nouveau token
        cookies.set("token", newToken, {
          httpOnly: true,
          // secure: process.env.NODE_ENV === "production",
        });

        // Mise à jour de la dernière utilisation
        await refreshService.used(refreshData);

        res.json({ success: true });
      } catch (error) {
        console.error("Erreur refresh:", error);
        res.status(500).json({ message: "Erreur serveur" });
      }
    }
  );
  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: ["http://localhost:5173", "https://studio.apollographql.com"],
      credentials: true,
    }),
    // cors<cors.CorsRequest>({origin: ["http://localhost:5173"]}),
    express.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        let user: UserEntity | null = null;

        const cookies = new Cookies(req, res);
        const token = cookies.get("token");
        const refreshtoken = cookies.get("refreshtoken");
        if (token) {
          try {
            const verify = await jwtVerify<Payload>(
              token,
              new TextEncoder().encode(process.env.SECRET_KEY)
            );
            user = await new UserService().findUserByEmail(
              verify.payload.email
            );
          } catch (err: any) {
            if (err.code === "ERR_JWT_EXPIRED" && refreshtoken) {
              const refreshService = new RefreshTokenService();
              const refreshData = await refreshService.findRefreshToken(
                refreshtoken
              );
              if (refreshData) {
                let cookies = new Cookies(req, res);
                cookies.set("token");
                throw new GraphQLError("Le token d'authentification a expiré", {
                  extensions: {
                    code: "TOKEN_EXPIRED",
                    http: {
                      status: 401,
                    },
                  },
                });
              }
            }
          }
        }
        return { req, res, user }; //envoi à tous les resolveurs cet objet
      },
    })
  );

  await datasource.initialize(); //initialisation de la base de données

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4005 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4005/`);
}

main();

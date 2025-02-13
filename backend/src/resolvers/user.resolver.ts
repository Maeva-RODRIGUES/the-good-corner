import {
  Message,
  MutationRegisterArgs,
  QueryLoginArgs,
} from "@/generated/graphql";
import UserService from "@/services/user.service";
import * as argon2 from "argon2";
import { SignJWT } from "jose";
import { MyContext } from "..";
import Cookies from "cookies";
import RefreshTokenService from "@/services/refresh.service";

export default {
  Query: {
    users: async () => {
      return await new UserService().listUsers();
    },
    login: async (_: any, { infos }: QueryLoginArgs, ctx: MyContext) => {
      const user = await new UserService().findUserByEmail(infos.email);
      if (!user) {
        throw new Error("Vérifiez vos informations");
      }
      const isPasswordValid = await argon2.verify(
        user.password,
        infos.password
      );
      const m: Message = {
        message: isPasswordValid ? "Bienvenue!" : "Vérifiez vos informations",
        success: isPasswordValid,
      };
      if (isPasswordValid) {
        const token = await new SignJWT({ email: user.email })
          .setProtectedHeader({ alg: "HS256", typ: "jwt" })
          .setExpirationTime("5sec")
          // .setExpirationTime("2h")
          .sign(new TextEncoder().encode(`${process.env.SECRET_KEY}`));
        let cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token", token, { httpOnly: true });

        if (infos.rememberMe) {
          const refreshService = new RefreshTokenService();
          const new_refresh_token = refreshService.generateRefreshToken();
          await refreshService.storeRefreshToken(
            new_refresh_token,
            user,
            ctx.req,
            ctx.res
          );
        }
      }
      return m;
    },
    logout: async (_: any, __: any, ctx: MyContext) => {
      // if (ctx.user) {
        let cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token"); //sans valeur, le cookie token sera supprimé
        cookies.set("refreshtoken"); //sans valeur, le cookie token sera supprimé
      // }
      const m: Message = {
        message: "Vous avez été déconnecté",
        success: true,
      };

      return m;
    },

    checkToken: async (_: any, __: any, ctx: MyContext) => {
      return ctx.user ? { email: ctx.user.email } : null;
    },

    // refreshToken: async(_:any, __:any, ctx: MyContext) => {
    //   const cookies = new Cookies(ctx.req, ctx.res);
    //   const token = cookies.get("refreshtoken");


    // }
  },
  Mutation: {
    register: async (_: any, { infos }: MutationRegisterArgs) => {
      console.log("Mes infos => ", infos);
      const user = await new UserService().findUserByEmail(infos.email);
      if (user) {
        throw new Error("Cet email est déjà pris!");
      }
      const newUser = await new UserService().createUser(infos);
      return newUser;
    },
  },
};

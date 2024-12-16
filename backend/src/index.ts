import "reflect-metadata";
import "module-alias/register";

import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

type BookTS = {
  id: string;
  title: string;
  author: string;
};
function generateRandomId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

const books: BookTS[] = [
  {
    id: generateRandomId(),
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    id: generateRandomId(),
    title: "City of Glass",
    author: "Paul Auster",
  },
];
console.log("%c⧭", "color: #ff0000", books);

const typeDefs = `#graphql
  type Book {
    id: ID
    title: String
    author: String
  }

  type Query {
    books: [Book]
    findBook(id: ID): Book
  }
  type Mutation {
    addBook(data: AddBookInput!): Book
    # addBook(title: String, author: String, tata: String, toto: String, description: String, active: Boolean): Book
    deleteBook(id: ID): [Book]
  }

  input AddBookInput {
    title: String!
    author: String!
  }
`;

const resolvers = {
  Query: {
    books: () => {
      console.log("COUCOU");
      return books;
    },
    findBook: (parent: any, args: any) => {
      return books.find((b) => b.id === args.id);
    },
  },
  Mutation: {
    addBook: (parent: any, args: any, context: any, infos: any) => {
      console.log("PARENT", parent);
      console.log("ARGS", args);
      console.log("CONTEXT", context);
      console.log("INFOS", infos);
      // 4 positions : 1ere parent,  2eme position les arguments, 3eme position: le contexte, 4eme: infos
      const book = {
        id: generateRandomId(),
        title: args.data.title,
        author: args.data.author,
      };
      books.push(book);

      return book;
    },
    deleteBook: (parent: any, args: any) => {
      console.log(args.id);
      // GraphQL importe peu, à nous de faire la logique de suppression
      const index = books.findIndex((b) => b.id === args.id);
      if (index === -1) {
        throw new Error("Le livre n'a pas été trouvé");
      }

      books.splice(index, 1);
      return books;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});
async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
}
main();




// import express from "express";
// import adsRouter from "./routes/ads.routes";
// import categoriesRouter from "./routes/categories.routes";
// import tagsRouter from "./routes/tags.routes";
// import datasource from "./lib/datasource";
// import cors from "cors";
// import path from "path";

// const app = express();

// app.use(cors({ origin: ["http://localhost:5173"] })); // on autorise le front à communiquer avec notre back
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads"))); // on expose à l'extérieur notre dossier uploads (http://localhost:4000/uploads)

// app.use("/ads", adsRouter);
// app.use("/categories", categoriesRouter);
// app.use("/tags", tagsRouter);

// app.listen(4000, async () => {
//   await datasource.initialize(); //initialisation de la base de données
//   console.log("Le serveur est lancé sur le port 4000");
// });

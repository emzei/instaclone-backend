require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";

const PORT = process.env.PORT;

const startServer = async () => {
  const apollo = new ApolloServer({
    resolvers,
    typeDefs,
    context: async ({ req }) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });

  await apollo.start();
  const app = express();
  app.use(logger("tiny"));
  app.use("/static", express.static("uploads"));
  apollo.applyMiddleware({ app });

  await new Promise((fn)=>app.listen({port:PORT}, fn));
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
};

startServer();
require("dotenv").config();
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 4000;
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.authorization),
    };
  },
});

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen({ port: PORT }, () => {
  console.log(
    `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath} ✅`
  );
});

require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer, PubSub } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import http from "http";
import { execute, subscribe } from "graphql";
import { SubscriptionServer } from "subscriptions-transport-ws";

const PORT = process.env.PORT;
const pubsub = new PubSub();
const apollo = new ApolloServer({
  resolvers,
  typeDefs,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      pubsub,
    };
  },
});

const app = express();
app.use(logger("tiny"));
apollo.applyMiddleware({ app });

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer);

httpServer.listen(PORT, () => {
  console.log(`🚀Server is running on http://localhost:${PORT} ✅`);

  // Create a WebSocket server for subscriptions
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema: apollo.schema,
      onConnect: async (connectionParams, webSocket) => {
        const loggedInUser = await getUser(connectionParams.token);
        return {
          loggedInUser,
        };
      },
    },
    {
      server: httpServer,
      path: apollo.graphqlPath,
    }
  );
});

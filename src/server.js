require("dotenv").config();
// requiring dotenv will allow you to use process. in the code like process.env.PORT for instance
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import logger from "morgan";
import cors from "cors";
import { createServer } from "http";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

const app = express();
const PORT = process.env.PORT || 4000;
// app.use(logger("tiny"));
// app.use("/static", express.static("uploads"));
// app.use(cors());

const httpServer = createServer(app);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const server = new ApolloServer({
  schema,
  context: async ({ req }) => {
    if (req) {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    }
  },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),

    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

const wsServer = new WebSocketServer({
  server: httpServer,
  // try path: '/static' if it doesnt work
  path: "/graphql",
});

const serverCleanup = useServer({ schema }, wsServer);

const startServer = async () => {
  await server.start();
  server.applyMiddleware({ app });
  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};

startServer().catch((err) => console.error("Error starting the server:", err));

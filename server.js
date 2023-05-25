// must require dotenv before importing anything else
require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";
import createAccountResolvers from "./users/createAccount/createAccount.resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    return {
      loggedInUser: await getUser(req.headers.token),
      protectResolver,
    };
  },
});

server
  .listen()
  .then(() => console.log("Sever is running on http://localhost:4000/"));

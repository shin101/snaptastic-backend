// must require dotenv before importing anything else 
require('dotenv').config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    "token":
    "TOKEN_HERE"
  }
});

server.listen().then(() => console.log("Sever is running on http://localhost:4000/"));
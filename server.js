// must require dotenv before importing anything else 
require('dotenv').config();
import { ApolloServer } from "apollo-server";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req}) => {
    console.log(req.headers);
    return {
      loggedInUser: await getUser(req.headers.token),
    }
  }
});

server.listen().then(() => console.log("Sever is running on http://localhost:4000/"));
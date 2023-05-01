// must require dotenv before importing anything else 
require('dotenv').config();
import { ApolloServer } from "apollo-server";
import schema from "./schema";


const server = new ApolloServer({
  schema
});

server.listen().then(() => console.log("Sever is running on http://localhost:4000/"));
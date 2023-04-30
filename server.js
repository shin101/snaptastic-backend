import {ApolloServer, gql} from "apollo-server";

// graphQL schema
const typeDefs = gql`
  type Movie {
    id: Int
    title: string
    year: Int
  }
  type Query {
    hello:String
  }
  type Mutation {
    createMovie(title:String!): Boolean
    deleteMovie(title:String!): Boolean
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
  },
  Mutation: {
    createMovie: (_, args) => {
      console.log(args);
      return true
    },
    deleteMovie: (_, args) => {
      console.log(args);
      return true
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(() => console.log("Sever is running on http://localhost:4000/"));
import { gql } from "apollo-server";

// we don't need to store password in graphQL, just in prisma
export default gql`
  type User{
    id: String!
    firstName:String!
    lastName:String
    username:String!
    email:String!
    createdAt: String!
    updatedAt: String!
  }
`;

    // need username to see profile. returns User
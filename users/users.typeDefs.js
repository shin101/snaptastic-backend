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
type LoginResult {
  ok: Boolean!
  oken: String
  error: String
}
type Mutation {
  createAccount(
    firstName:String!
    lastName:String
    username:String!
    email:String!
    password: String!
  ): User
  login(username:String!, password:String!): LoginResult!
}

  type Query{
    seeProfile(username:String): User
  }
`;

    // need username to see profile. returns User
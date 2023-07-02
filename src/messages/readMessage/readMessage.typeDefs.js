import { gql } from "apollo-server-express";

export default gql`
  type readMessageResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    readMessage(id: Int!): readMessageResponse!
  }
`;

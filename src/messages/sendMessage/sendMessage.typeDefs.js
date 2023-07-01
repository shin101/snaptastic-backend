import { gql } from "apollo-server-express";

export default gql`
  type sendMessageResponse {
    ok: Boolean!
    error: String
  }
  type Mutation {
    sendMessage(
      payload: String!
      roomId: Int
      userId: Int
    ): sendMessageResponse!
  }
`;

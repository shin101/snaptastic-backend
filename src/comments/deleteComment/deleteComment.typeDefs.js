import { gql } from "apollo-server";

export default gql`
  type deleteCommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    deleteComment(id: Int!): deleteCommentResult!
  }
`;

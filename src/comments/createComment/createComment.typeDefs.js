import { gql } from "apollo-server-express";

export default gql`
  type createCommentResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    createComment(photoId: Int!, payload: String!): createCommentResult!
  }
`;

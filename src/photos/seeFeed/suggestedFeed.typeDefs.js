import { gql } from "apollo-server-express";

export default gql`
  type Query {
    seeSuggested(offset: Int): [Photo]
  }
`;

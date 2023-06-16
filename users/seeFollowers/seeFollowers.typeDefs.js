export default gql`
  type SeeFollowersResult {
    ok: Boolean!
    error: String
    followers: [User]
    totalPages: Int
  }
  type Query {
    seeFollowers(usenamr: String!, page: Int!): SeeFollowersResult!
  }
`;

import { gql } from "apollo-server";

// we don't need to store password in graphQL, just in prisma
export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    isFollowing: Boolean!
  }
`;

// isFollowing: Boolean!
// isMe: Boolean!

// need username to see profile. returns User

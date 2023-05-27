import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
      avatar: Upload
      bio: String
    ): EditProfileResult!
  }
`;

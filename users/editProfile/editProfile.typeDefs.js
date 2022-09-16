import { gql } from "apollo-server";

export default gql`
  scalar Upload
  type EditProfileResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    editProfile(
      username: String
      password: String
      firstName: String
      lastName: String
      email: String
      bio: String
      avatar: Upload
    ): EditProfileResult
  }
`;

import { gql } from "apollo-server";

export default gql`
  type User {
    id: Int!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginResult{
    ok: Boolean!
    token: String
    error: String
  }

  type Mutation {
    createAccount(
        firstName: String!
        lastName: String
        username: String!
        email: String!    
        password: String!
    ):User

    login(username: String!, password: String!): LoginResult!

    editProfile(
        username: String!
        password: String!
        firstName: String
        lastName: String
        email: String
    ): User
  }
  type Query {
     seeProfile(username:String!): User
  }
`;

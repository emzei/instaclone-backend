//const { ApolloServer, gql } = require('apollo-server');
import { ApolloServer, gql } from "apollo-server";

// The GraphQL schema
const typeDefs = gql`
  type Movie {
    title: String
    year: Int
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title:String!): Boolean
    deleteMovie(title:String!): Boolean
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ "title": "Hello", year: 2022 }),
  },
  Mutation: {
    // root, args, context, info
    createMovie: (_, {title}) => {
      console.log(title);
      return true
    },
    deleteMovie: (_, {title}) => {
      console.log(title);
      return true      
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen()
  .then(() => {
    console.log(`🚀 Server ready at http://localhost:4000/`);
  });
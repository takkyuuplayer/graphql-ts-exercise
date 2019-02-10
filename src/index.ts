import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import * as Link from "./resolvers/Link";
import * as Mutation from "./resolvers/Mutation";
import * as Query from "./resolvers/Query";
import * as User from "./resolvers/User";

const server = new GraphQLServer({
  resolvers: {
    Query,
    Mutation,
    User,
    Link
  },
  typeDefs: "./src/schema.graphql",
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

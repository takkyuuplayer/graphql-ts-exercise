import { GraphQLServer } from "graphql-yoga";

interface ILink {
  id: string;
  description: string;
  url: string;
}
const links: ILink[] = [
  {
    description: "Fullstack tutorial for GraphQL",
    id: "link-0",
    url: "www.howtographql.com",
  },
];

const typeDefs = `
type Query {
  info: String!
  feed: [Link!]!
}

type Link {
  id: ID!
  description: String!
  url: String!
}
`;

const resolvers = {
  Link: {
    description: (parent: ILink) => parent.description,
    id: (parent: ILink) => parent.id,
    url: (parent: ILink) => parent.url,
  },
  Query: {
    feed: () => links,
    info: () => `This is the API of a hackernews Clone`,
  },
};

const server = new GraphQLServer({
  resolvers,
  typeDefs,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

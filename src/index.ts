import { GraphQLServer } from "graphql-yoga";
import _ from "lodash";
import { ulid } from "ulid";

interface ILink {
  id?: string;
  description: string;
  url: string;
}
let links: ILink[] = [
  {
    description: "Fullstack tutorial for GraphQL",
    id: ulid(),
    url: "www.howtographql.com",
  },
];

const resolvers = {
  Mutation: {
    post: (parent: any, args: ILink): ILink => {
      const link: ILink = {
        description: args.description,
        id: ulid(),
        url: args.url,
      };
      links = [...links, link];
      return link;
    },
    updateLink: (parent: any, args: ILink): ILink | null => {
      const link = _.find(links, (el) => (el.id = args.id)) as ILink | null;
      if (link === void 0) {
        return null;
      }
      links = links.map((l) =>
        l === link
          ? { id: l.id, description: args.description, url: args.url }
          : l,
      );

      return link;
    },
    deleteLink: (parent: any, args: ILink): ILink | null => {
      const link = _.find(links, (el) => (el.id = args.id)) as ILink | null;
      if (link === void 0) {
        return null;
      }
      links = links.filter((l) => l !== link);

      return link;
    },
  },
  Query: {
    feed: () => links,
    info: () => `This is the API of a hackernews Clone`,
    link: (parent: any, args: ILink) => {
      return _.find(links, (el) => (el.id = args.id)) as ILink | null;
    },
  },
};

const server = new GraphQLServer({
  resolvers,
  typeDefs: "./src/schema.graphql",
});
server.start(() => console.log(`Server is running on http://localhost:4000`));

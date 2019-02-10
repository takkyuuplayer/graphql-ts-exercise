import { IContext, ILink } from "../utils";

export function info() {
  return `This is the API of a hackernews Clone`;
}

export async function feed(parent: any, args: any, context: IContext) {
  const where = args.filter ? {
    OR: [
      { description_contains: args.filter },
      { url_contains: args.filter },
    ],
  } : {};

  const links = await context.prisma.links({
    where,
    skip: args.skip,
    first: args.first,
    orderBy: args.orderBy,
  });
  const count = await context.prisma
    .linksConnection({
      where,
    })
    .aggregate()
    .count();
  return {
    links,
    count,
  };
}

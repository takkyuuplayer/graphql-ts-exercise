import { IContext, ILink } from "../utils";

export function info() {
  return `This is the API of a hackernews Clone`;
}

export function feed(root: any, args: ILink, context: IContext) {
  return context.prisma.links();
}

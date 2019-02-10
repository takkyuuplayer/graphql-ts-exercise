import { IContext, ILink } from "../utils";

export function postedBy(parent: any, args: ILink, context: IContext) {
  return context.prisma.link({ id: parent.id }).postedBy();
}

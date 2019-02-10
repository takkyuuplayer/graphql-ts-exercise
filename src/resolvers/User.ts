import { IContext } from "../utils";

export function links(parent: any, args: any, context: IContext) {
  return context.prisma.user({ id: parent.id }).links();
}

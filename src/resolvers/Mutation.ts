import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { APP_SECRET, getUserId, IContext, ILink } from "../utils";

export function post(parent: any, args: ILink, context: IContext) {
  const userId = getUserId(context);
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } },
  });
}

export function deleteLink(root: any, args: ILink, context: IContext) {
  return context.prisma.deleteLink({ id: args.id as string });
}

export async function signup(root: any, args: any, context: IContext) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.prisma.createUser({ ...args, password });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

export async function login(root: any, args: any, context: IContext) {
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  // 2
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  // 3
  return {
    token,
    user,
  };
}

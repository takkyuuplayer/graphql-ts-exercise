import jwt from "jsonwebtoken";
import { Prisma } from "./generated/prisma-client";

export const APP_SECRET = "TEST";

export interface IContext {
  prisma: Prisma;
  request: any;
}

export interface ILink {
  id?: string;
  description: string;
  url: string;
}

interface IAuthorizationToken {
  userId: string;
}

export function getUserId(context: IContext) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET) as IAuthorizationToken;
    return userId;
  }

  throw new Error("Not authenticated");
}

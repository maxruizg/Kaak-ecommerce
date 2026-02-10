import { PrismaClient } from "@prisma/client";

declare global {
  var __db__: PrismaClient | undefined;
}

function getClient(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set — database features are disabled");
  }

  if (process.env.NODE_ENV === "production") {
    return new PrismaClient();
  }

  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
  return global.__db__;
}

let _prisma: PrismaClient | undefined;

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!_prisma) {
      _prisma = getClient();
    }
    return Reflect.get(_prisma, prop);
  },
});

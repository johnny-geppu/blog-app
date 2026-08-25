// PrismaClientを使えるようにするためのファイル。

// prisma.ts
//    ↓
// PrismaClientを用意
//    ↓
// // DBにアクセスするための窓

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const prisma =
    globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}

// prisma.post.findMany(...)

// などを使えるようにする。

// イメージとしては、


// DBに最初から入れておくダミーデータを作るファイル。

import { PrismaClient } from "@prisma/client";
import * as bcypt from 'bcryptjs'

const prisma = new PrismaClient

async function main() {
    //クリーンアップ
    await prisma.post.deleteMany()
    await prisma.user.deleteMany()

    const hasshedPassword = await bcypt.hash('password123', 12)
    const dammyImages = [
        'https://picsum.photos/600/400',
        'https://picsum.photos/600/400',
    ]
    //ユーザー作成
    const user = await prisma.user.create({
        data: {
            email: 'test@example.com',
            name: 'Test User',
            password: hasshedPassword,

            posts: {
                create: [
                    {
                        title: 'ダミーデータその１',
                        content: 'これはダミー1',
                        topImage: dammyImages[0]
                    },
                    {
                        title: 'ダミーデータその２',
                        content: 'これはダミー２',
                        topImage: dammyImages[1]
                    }
                ]
            }
        }
    })
}

main()
    .catch((e) => {
        console.log(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

//コールバック関数「あとで実行してね」と別の関数に渡す関数
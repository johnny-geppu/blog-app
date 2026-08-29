import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// auth.config.ts の設定を使って、アクセス時にAuth.jsの認証チェックを実行
export default NextAuth(authConfig).auth;


export const config = {

    // Proxyを実行するURLを指定
    // 基本的に各ページで実行するが、
    // API・Next.js内部ファイル・png画像などは除外する
    matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};

/*
【認証関連3ファイルの関係】                                 
auth.ts
→ ログイン時の本人確認
→ Credentials / Zod / Prisma / bcrypt などを使う
auth.config.ts
→ ログイン状態に応じて、どのページにアクセスできるか決める
→ authorized() でアクセス許可・拒否を判定
proxy.ts（このファイル）
→ ページにアクセスされたとき認証チェックを発動
→ auth.config.ts の設定を使ってアクセスをチェック


流れ：
ページにアクセス
    ↓
proxy.ts
    ↓
auth.config.ts の authorized()
    ↓
ログイン状態・アクセス先を確認
    ↓
アクセス許可 / 拒否
*/

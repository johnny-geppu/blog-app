
// ログイン状態に応じて、各ページへのアクセスを制御する設定

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {

    // Auth.jsが使用するログインページを指定
    pages: {
        signIn: '/login',
    },

    callbacks: {

        // ページにアクセスするたびに実行され、
        // 「このユーザーをこのページに通していいか」を判定する
        authorized({ auth, request: { nextUrl } }) {

            // auth.user が存在する → ログイン済み
            // auth.user が存在しない → 未ログイン
            // !! を使って true / false に変換している
            const isLoggedIn = !!auth?.user;


            // 今アクセスしようとしているページが
            // /dashboard または /manage から始まるかを判定
            //
            // 例：
            // /dashboard        → true
            // /dashboard/posts  → true
            // /manage           → true
            // /login            → false
            const isOnDashboard =
                nextUrl.pathname.startsWith('/dashboard') ||
                nextUrl.pathname.startsWith('/manage');


            // ========================================
            // ① /dashboard・/manage にアクセスした場合
            // ========================================
            if (isOnDashboard) {

                // ログイン済みなら、そのままアクセスを許可
                if (isLoggedIn) {
                    return true;
                }

                // 未ログインなら /login にリダイレクト
                return Response.redirect(
                    new URL('/login', nextUrl)
                );


            // ========================================
            // ② ログイン済みなのに /login にアクセスした場合
            // ========================================
            } else if (
                isLoggedIn &&
                nextUrl.pathname === '/login'
            ) {

                // すでにログインしているので、
                // ログイン画面ではなく /dashboard にリダイレクト
                return Response.redirect(
                    new URL('/dashboard', nextUrl)
                );
            }


            // ========================================
            // ③ それ以外のページ
            // ========================================

            // 特に制限しないのでアクセスを許可
            return true;
        },
    },


    // 実際のログイン方法（Credentialsなど）は
    // auth.ts 側で設定するため、ここでは空にしている
    providers: [],

} satisfies NextAuthConfig;
// satisfies NextAuthConfig によって、
// authConfig がAuth.jsの設定として正しい形になっているか型チェックする

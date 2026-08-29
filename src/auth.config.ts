// 「ログイン状態に応じて、どのページへのアクセスを許可するか」を設定するファイル

import type { NextAuthConfig } from 'next-auth';

export const authConfig = {

    // ログインページを /login に設定
    pages: {
        signIn: '/login',
    },

    // ページにアクセスしていいかを判定する処理
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {

            // ユーザーがログインしているか確認
            // !! で true / false に変換
            const isLoggedIn = !!auth?.user;

            // 現在アクセスしようとしているページが
            // /dashboard または /manage か確認
            const isOnDashboard =
                nextUrl.pathname.startsWith('/dashboard') ||
                nextUrl.pathname.startsWith('/manage');

            // /dashboard または /manage にアクセスする場合
            if (isOnDashboard) {

                // ログイン済みならアクセス許可
                if (isLoggedIn) return true;

                // 未ログインならアクセス拒否
                // → Auth.jsによってログインページへ誘導される
                return false;

                // ログイン済みなのに /login にアクセスした場合
            } else if (
                isLoggedIn &&
                nextUrl.pathname === '/login'
            ) {

                // /dashboard にリダイレクト
                return Response.redirect(
                    new URL('/dashboard', nextUrl)
                );
            }

            // それ以外のページはアクセス許可
            return true;
        },
    },

    // ログイン方法はauth.ts側で設定するので、ここでは空
    providers: [],

} satisfies NextAuthConfig; // Auth.jsの設定として正しい型かチェック
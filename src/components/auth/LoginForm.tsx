'use client';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authentication';

export default function LoginForm() {
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined,
    )
    return (
        <Card className="w-full max-w-md mx-auto shadow-md">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">
                    ログイン
                </CardTitle>
                <CardDescription>
                    メールアドレスとパスワードを入力してください
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form action={formAction} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">
                            メールアドレス
                        </Label>

                        <Input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@mail.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">
                            パスワード
                        </Label>

                        <Input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="パスワードを入力"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isPending}
                    >
                        {isPending ? "ログイン中..." : "ログイン"}
                    </Button>

                    {errorMessage && (
                        <p className="text-sm text-red-500">
                            {errorMessage}
                        </p>
                    )}
                </form>
            </CardContent>
        </Card>
    )
}
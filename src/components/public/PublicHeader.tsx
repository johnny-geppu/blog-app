// ヘッダーのReactコンポーネント。

import Link from "next/link"
import { Button } from "../ui/button"
import { Input } from "@base-ui/react"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

export default function PublicHeader() {
    return (
        <div>
            <header className="border-b bg-blue-200">
                <div className="container mx-auto px-4 py-4 flex item-center justify-between">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink
                                    render={<Link href="/dashboard" />}
                                    className="font-bold text-xl"
                                >
                                    ブログ
                                </NavigationMenuLink>
                            </NavigationMenuItem>

                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex items-center gap-4">
                        <input type="text"
                            placeholder="記事を検索"
                            className="w-200px lg:w-300px  " />
                        <Button variant="outline">
                            <Link href="/login">
                                ログイン
                            </Link>
                        </Button>
                        <Button variant="outline">
                            <Link href="/register">
                                登録
                            </Link>
                        </Button>
                    </div>
                </div>
            </header>
        </div>
    )
}

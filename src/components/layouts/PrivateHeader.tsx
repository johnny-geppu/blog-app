import Link from "next/link"

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

import Setting from "./Setting"
import { auth } from "@/auth"

export default async function PrivateHeader() {
    const session = await auth()

    if (!session?.user?.email) {
        throw new Error("不正なリクエストです")
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-[#fdfdfd]-200 bg-[#281c30] text-[#f2f8f4] shadow-sm">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuLink
                                render={<Link href="/dashboard" />}
                                className="
                                    hover:text-black text-xl font-bold text-white hover:bg-white "
                            >
                                管理ページ
                            </NavigationMenuLink>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>

                <Setting session={session} />
            </div>
        </header>
    )
}
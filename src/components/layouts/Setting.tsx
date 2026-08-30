import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/auth"
import { Button } from "@/components/ui/button"
import { Session } from "next-auth"


export default function Setting({ session }: { session: Session }) {
    const handleLogout = async () => {
        'use server'
        await signOut()
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="ghost" />}>
                {session.user?.name}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

'use server'

import { prisma } from "../prisma"
import redirect from "next/navigation"
type ActionState = {
    success: boolean,
    errors: Record<string, string[]>
}

export async function deletePost(postId: string): Promise<ActionState> {
    try {
    

        await prisma.post.delete({
            where: { id: postId }
        })
        return { success: true, errors: {} }

    } catch (error) {
        console.error("Error deleting post:", error)
        return { success: false, errors: { general: ['記事の削除に失敗しました'] } }
    }
}
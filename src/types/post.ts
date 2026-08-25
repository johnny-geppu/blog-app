// ブログ記事に関するデータの型をここにまとめておく場所

export type Post = {
    id: string
    title: string
    content: string
    topImage: string | null
    createdAt: Date
    author: {
        name: string
    }
}
export type PostCardProps = { post: Post }
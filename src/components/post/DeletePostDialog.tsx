import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { deletePost } from "@/lib/actions/deletePost"



type DeletePostDialogProps = {
  postId: string;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function DeletePostDialog({ postId, isOpen, onOpenChange }: DeletePostDialogProps) {
  console.log("DeletePostDialog render", { postId, isOpen })

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange} >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>記事の削除</AlertDialogTitle>
          <AlertDialogDescription>
            記事を削除しますか？<br />この操作は元に戻せません。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>キャンセル</AlertDialogCancel>
          <AlertDialogAction onClick={() => deletePost(postId)} 
          className="bg-red-500 text-white px-4 py-2 rounded">
            削除する
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

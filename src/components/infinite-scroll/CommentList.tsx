"use client";

import { Loader2 } from "lucide-react";
import { Comment } from "./Comments";
import { Button } from "../ui/button";
import { useCommentsKY } from "@/hooks/useComments";

export default function CommentsList() {
  const { data, isPending, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommentsKY()

  const comments = data?.pages.flatMap(page => page.comments)

  if (isPending) return <Loader2 className="animate-spin mx-auto" />
  //if (isError) return <div>Error: {error.message}</div>

  return (
    <div className="space-y-4">
      {comments && comments.length > 0 && (
        <>
          <div className="space-y-3">
            {
              comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))
            }
          </div>
          <div className="flex justify-center my-4">
            {
              hasNextPage && (
                <Button
                  variant="outline"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="flex items-center space-x-2"
                >
                  {isFetchingNextPage ? <Loader2 className="animate-spin" /> : "Load More"}

                </Button>
              )
            }
          </div>
        </>
      )}
      {!isError && !comments?.length && (<div className="text-center text-gray-500">No comments found</div>)}
      {isError && <div className="text-red-500">Error: {error.message}</div>}
    </div>
  )
}
"use client";

import { Loader2 } from "lucide-react";
import { Comment } from "./Comments";
import { useCommentsKY } from "@/hooks/useComments";
import InfiniteScrollContainer from "./InfiniteScrollContainer";

export default function CommentsListScroll() {
  const { data, isPending, isError, error, isFetching, fetchNextPage, hasNextPage, isFetchingNextPage } = useCommentsKY()

  const comments = data?.pages.flatMap(page => page.comments)

  if (isPending) return <Loader2 className="animate-spin mx-auto" />

  return (
    <div className="space-y-4 mb-10">
      {comments && comments.length > 0 && (
        <InfiniteScrollContainer
          onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
          className="space-y-3">
          {
            comments.map((comment) => (
              <Comment key={comment.id} comment={comment} />
            ))
          }
          {isFetchingNextPage && <div className="flex justify-center my-4"><Loader2 className="animate-spin" /></div>}
        </InfiniteScrollContainer>
      )}
      {!hasNextPage && <div className="text-center text-xs uppercase text-foreground">No more Comments</div>}
      {!isError && !comments?.length && (<div className="text-center text-gray-500">No comments found</div>)}
      {isError && <div className="text-red-500">Error: {error.message}</div>}
    </div>
  )
}
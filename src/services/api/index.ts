import { comments, type Comment } from "@/app/api/comments/data";
import { CommentsResponse } from "@/app/api/comments/route";
import { postData } from "@/lib/fetch-utils";
import { InfiniteData, QueryClient } from "@tanstack/react-query"

// This simulates a call to your DB/ORM
export function getComments(take: number, cursor?: number): { data: Comment[], nextCursor: number | null } {
  // Find the starting index based on cursor
  let startIndex = 0;

  if (cursor) {
    // Find the index of the comment with the given ID (cursor)
    const cursorIndex = comments.findIndex((comment) => comment.id === cursor);
    if (cursorIndex !== -1) {
      startIndex = cursorIndex; // Start at this comment
    }
  }

  // Get the slice of comments for this page (fetch take + 1 to check if more exist)
  const fetchedItems = comments.slice(startIndex, startIndex + take + 1);

  // The additional item becomes the next cursor
  const nextCursor = fetchedItems.length > take ? fetchedItems[take].id : null;

  return {
    data: fetchedItems.slice(0, take),
    nextCursor,
  };
}


export function createComment(newComment: { text: string }) {
  const data = postData<{ comment: Comment }>('/api/comments', newComment)
  return data
}


export const createCommentOnSuccess = (
  queryClient: QueryClient,
  queryKey: unknown[],
) => {
  return async ({ comment }: { comment: CommentsResponse["comments"][0] }) => {
    await queryClient.cancelQueries({ queryKey })

    queryClient.setQueryData<InfiniteData<CommentsResponse, number | undefined>>(
      queryKey,
      oldData => {
        const firstPage = oldData?.pages[0]
        if (!firstPage) return oldData

        return {
          ...oldData,
          pages: [
            {
              ...firstPage,
              totalComments: firstPage.totalComments + 1,
              comments: [comment, ...firstPage.comments]
            },
            ...oldData.pages.slice(1)
          ]
        }
      }
    )
  }
}

type PageUpdater<TData> = (firstPage: TData, optimisticItem: TData[keyof TData]) => TData

export function createOptimisticOnMutate<TQueryResponse, TNewData, TOptimisticItem>({
  queryClient,
  queryKey,
  buildOptimisticItem,
  updateFirstPage
}: {
  queryClient: QueryClient
  queryKey: unknown[]
  buildOptimisticItem: (newData: TNewData) => TOptimisticItem
  updateFirstPage: PageUpdater<TQueryResponse>
}) {
  return async (newData: TNewData) => {
    await queryClient.cancelQueries({ queryKey })

    const previousData = queryClient.getQueryData<InfiniteData<TQueryResponse, number | undefined>>(queryKey)
    const optimisticItem = buildOptimisticItem(newData)

    queryClient.setQueryData<InfiniteData<TQueryResponse, number | undefined>>(queryKey, old => {
      if (!old) return undefined
      const firstPage = old.pages[0]
      if (!firstPage) return old

      return {
        ...old,
        pages: [
          updateFirstPage(firstPage, optimisticItem as unknown as TQueryResponse[keyof TQueryResponse]),
          ...old.pages.slice(1)
        ]
      }
    })

    return { previousData, optimisticItem }
  }
}


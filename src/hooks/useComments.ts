import { CommentsResponse } from "@/app/api/comments/route"
import { CreateCommentResponse, GetCommentsResponse } from "@/app/api/infinite-comments/route"
import { fetchData } from "@/lib/fetch-utils"
import { createComment, createCommentOnSuccess } from "@/services/api"
import { InfiniteData, QueryKey, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import ky from "ky"


const queryKey: QueryKey = ["comments"]
// const mutableQueryKey = [...queryKey, "extra"] // * this is a mutable query key. It can be changed at runtime. This is useful for when you want to add extra parameters to the query key, like a filter or a search term

export function useComments() {
  return (
    useInfiniteQuery({
      queryKey, // queryKey: ["comments"],
      queryFn: ({ pageParam }) => fetchData<CommentsResponse>(`/api/comments?${pageParam ? `cursor=${pageParam}` : ""}`),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor
    })
  )
}

// * THIS HOOK IS FOR THE INFINITE SCROLLING BUT IT USES KY FOR FETCHING DATA
export function useCommentsKY() {
  return (
    useInfiniteQuery({
      //queryKey: ["comments"],
      queryKey,
      queryFn: ({ pageParam }) => ky.get(`/api/infinite-comments?${pageParam ? `cursor=${pageParam}` : ""}`).json<GetCommentsResponse>(),
      initialPageParam: undefined as number | undefined,
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      // getPreviousPageParam: (firstPage) => firstPage.prevCursor
    })
  )
}

export function useCreateCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newComment: { text: string }) => createComment(newComment),
    onSuccess: createCommentOnSuccess(queryClient, ["comments"])
  })
}

// * This hook is for the infinite scrolling but it uses ky for fetching data
export function useCreateCommentMutationKY() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newComment: { text: string }) =>
      ky
        .post("/api/infinite-comments", { json: newComment })
        .json<CreateCommentResponse>(), // * this is the response type
    onSuccess: async ({ comment }) => {
      await queryClient.cancelQueries({ queryKey }) // * cancel any outgoing queries
      queryClient.setQueryData<InfiniteData<CommentsResponse, number | undefined>>(queryKey, (oldData) => {
        const firstPage = oldData?.pages[0]
        if (firstPage) {
          return {
            ...oldData,
            pages: [
              {
                ...firstPage,
                comments: [comment, ...firstPage.comments], // ? add the new comment to the first page
                // nextCursor: firstPage.comments.length + 1, // ? update the next cursor to the length of the comments array + 1
              },
              ...oldData.pages.slice(1) // ? keep the rest of the pages as they are
            ]
          }
        }
      })
      // queryClient.invalidateQueries({ queryKey: ["comments"] }) // * Useful when normal queries but not for infinite queries
    }
  })
}






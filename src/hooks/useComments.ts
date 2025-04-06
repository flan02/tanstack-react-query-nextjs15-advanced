import { CommentsResponse } from "@/app/api/comments/route"
import { fetchData } from "@/lib/fetch-utils"
import { createComment, createCommentOnSuccess } from "@/services/api"
import { QueryKey, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query"


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

export function useCreateCommentMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (newComment: { text: string }) => createComment(newComment),
    onSuccess: createCommentOnSuccess(queryClient, ["comments"])
  })
}





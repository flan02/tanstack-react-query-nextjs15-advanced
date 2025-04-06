import { Comment } from "@/app/api/comments/data"
import { CommentsResponse } from "@/app/api/comments/route"
import { createComment, createOptimisticOnMutate } from "@/services/api"
import { QueryKey, useMutation, useQueryClient } from "@tanstack/react-query"

const queryKey: QueryKey = ["comments"]

export function useCreateCommentMutationOptimistic() {
  const queryClient = useQueryClient()


  return useMutation({
    mutationFn: (newComment: { text: string }) => createComment(newComment),
    onMutate: createOptimisticOnMutate<CommentsResponse, { text: string }, Comment>({
      queryClient,
      queryKey: ["comments"],
      buildOptimisticItem: (newComment): Comment => ({
        id: Date.now(),
        user: {
          name: "Current User",
          avatar: "CU"
        },
        text: newComment.text,
        createdAt: new Date().toISOString()
      }),
      updateFirstPage: (firstPage, optimisticComment) => ({
        ...firstPage,
        totalComments: firstPage.totalComments + 1,
        comments: [optimisticComment as unknown as Comment, ...firstPage.comments]
      })
    }),
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(queryKey, context?.previousData)

    }
  })
}


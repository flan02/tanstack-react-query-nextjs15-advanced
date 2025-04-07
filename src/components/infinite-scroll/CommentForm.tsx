"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCreateCommentMutationKY } from "@/hooks/useComments";
import { useState } from "react";
import { toast } from "sonner";

export default function CommentForm() {
  const [commentText, setCommentText] = useState("");

  const mutation = useCreateCommentMutationKY()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!commentText.trim()) return;

    // do something with the input
    mutation.mutate(
      { text: commentText.trim() },
      {
        onSuccess: () => {
          setCommentText("") // reset the input after successful submission
          toast.success("Comment posted successfully") // show success message
        },
        onError: (error) => {
          toast.error(`Error: ${error.message}`) // show error message
        }
      });
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment..."
        className="flex-1"
        disabled={mutation.isPending} // disable input while loading
      />
      <Button type="submit" disabled={!commentText.trim() || !commentText.trim()}>
        {mutation.isPending ? "Posting..." : "Post"}
      </Button>
    </form>
  );
}
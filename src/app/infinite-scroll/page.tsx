import CommentForm from "@/components/infinite-scroll/CommentForm";
import CommentsList from "@/components/infinite-scroll/CommentList";
import CommentsListScroll from "@/components/infinite-scroll/CommentListScroll";


export default function InfiniteScrollPage() {
  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">
          Infinite Scroll with React Query
        </h1>
        <p className="mb-4">
          This example demonstrates how to implement infinite scroll with React
          Query&apos;s hook. Moreover, we will use react-intersection-observer to fetch more data when the user scrolls to the bottom of the page.
          <br />
        </p>
      </div>
      <div className="mb-6">
      </div>
      <div className="max-w-xl mx-auto p-4 space-y-4">
        <h2 className="text-xl font-bold">Comments</h2>
        <CommentForm />
        {/* <CommentsList /> */}
        <CommentsListScroll />
      </div>



    </div>
  );
}
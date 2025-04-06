"use client";

import InfiniteComments from "./InfiniteComments";

export default function InfiniteQueryPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">
          Optimistic Queries with React Query
        </h1>
        <p className="mb-4">
          This example demonstrates how to implement optimistic updates. Posting the comment before it loads to our server. I add 5000ms of delay on purpose and 10% to throw and server error
          in this case the comment will be removed from the UI. This is a great way to improve user experience by making the app feel more responsive.
          <br />
        </p>
        <span className="text-foreground font-bold">Try posting a new
          comment </span>
      </div>

      <div className="mb-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <InfiniteComments />
        </div>
      </div>


      <div className="mt-8 space-y-4 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-2xl font-bold">Benefits of Optimistic Updates</h2>
        <p className="mb-3">
          Optimistic updates provide a better user experience by immediately
          updating the UI before the server confirms the change. The server in
          this demo has a 10% chance of randomly returning an error to
          demonstrate the rollback behavior.
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Instant UI feedback makes the application feel more responsive
          </li>
          <li>Automatic rollbacks if the server request fails</li>
          <li>Enhanced user experience without sacrificing data integrity</li>
        </ul>
      </div>
    </div>
  );
}
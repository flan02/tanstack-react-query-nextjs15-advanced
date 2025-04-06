"use client";

import InfiniteComments from "./InfiniteComments";

export default function InfiniteQueryPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">
          Mutation Queries with React Query
        </h1>
        <p className="mb-4">
          This demo showcases mutations, updating the query cache
          after a mutation.
          I caused the delay on purpose to simulate a real-world scenario where the server takes time to respond (5000ms approximately).
          Additionaly I added a 10% chance of failure to simulate a server error.
          <br />
        </p>
        <span className="text-foreground font-bold">Try posting a new
          comment</span>
      </div>

      <div className="mb-6">
        <div className="border rounded-lg p-4 bg-gray-50">
          <InfiniteComments />
        </div>
      </div>

    </div>
  );
}
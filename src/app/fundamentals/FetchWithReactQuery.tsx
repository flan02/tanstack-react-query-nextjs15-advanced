import { useQuery } from "@tanstack/react-query"
import { Post } from "../api/posts/data"
import { fetchData } from "@/lib/fetch-utils"


type Props = {
  category: string
}

const FetchWithReactQuery = ({ category }: Props) => {
  const { data: posts, isLoading, isError, error } = useQuery({
    queryKey: ["posts", category], // identifies the query in the cache and it can be accessed from anywhere component in the app
    queryFn: () => fetchData<Post[]>(`/api/posts?category=${category}`),
    retry: false,
    refetchOnWindowFocus: false, // prevents refetching when the window is focused
    staleTime: 1000 * 60 * 5, // 5 minutes. It helps to avoid unnecessary refetching of data that is still fresh.
    gcTime: 1000 * 60 * 10, // 10 minutes. It helps to keep the data in the cache for a longer time after any component uses it.
  })

  // * FRESH DATA: The data is fresh (updated) and can be used immediately, no need to refetch when the component is mounted or when the window is focused.
  // * STALE DATA: The data is stale (not updated) and needs to be refetched when the component is mounted or when the window is focused.

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        {category.charAt(0).toUpperCase() + category.slice(1)} Posts
      </h2>
      {isLoading && <div className="mb-4 text-blue-500">Loading posts...</div>}
      {isError && <div className="mb-4 text-red-500">Error: {error.message}</div>}
      {posts?.length === 0 && !isError && !isLoading && (
        <div className="mb-4">No posts found for this category.</div>
      )}

      {posts && posts.length > 0 && (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-3 rounded">
              <h3 className="font-semibold">{post.title}</h3>
              <p>{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FetchWithReactQuery
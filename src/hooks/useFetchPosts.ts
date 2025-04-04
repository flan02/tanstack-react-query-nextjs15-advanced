import { Post } from "@/app/api/posts/data";
import { fetchData } from "@/lib/fetch-utils";
import { useEffect, useState } from "react";


type Props = {
  category: string;
}

const useFetchPosts = ({ category }: Props) => {
  const [posts, setPosts] = useState<Post[]>();
  const [isLoading, setIsLoading] = useState(true); // TODO: 2. Default to true to show loading state initially
  const [error, setError] = useState<string>();

  useEffect(() => {
    // TODO: 1. Solving Race Condition cancelling the previous request
    let ignore = false; // ? false means we are not ignoring the request

    setIsLoading(true);
    // TODO: 3. Reset error state in order to make the error message disappear when we refetch data
    setError(undefined); // ? Reset error state on new request

    async function fetchPosts() {
      try {
        const data = await fetchData<Post[]>(`/api/posts?category=${category}`);
        if (!ignore) {
          setPosts(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Fetch error:", error);
          setError("Failed to fetch posts");
          // TODO: 3. Reset error state in order to make the error message disappear when we refetch data
          setPosts(undefined); // ? Reset posts state on error
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      ignore = true; // * Cleanup function to ignore stale requests
    }
  }, [category])

  return { posts, isLoading, error };
}

export default useFetchPosts
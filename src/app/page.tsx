import { NavigationCard } from "@/components/fundamentals/navigation-card";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div className="w-[100ch] mx-auto h-max space-y-8">
      <div className="flex justify-center space-x-4 items-center h-[calc(80vh-24rem)]">
        <Image src='/tanstack-logo.png' alt="logo" width={300} height={300} />
        <article className="flex flex-col space-y-8">
          <h1 className="text-8xl font-bold">TANSTACK</h1>
          <h2 className="uppercase text-foreground text-sm">High-quality open-source software for web developers</h2>
          <div className="flex space-x-2">
            <Link href="https://tanstack.com/" target="_blank" className="bg-black text-white hover:bg-black/80 rounded-md px-4 py-2">docs</Link>
            <Link href="https://usehooks-ts.com/introduction" target="_blank" className="bg-black text-white hover:bg-black/80 rounded-md px-4 py-2">use hooks ts</Link>
          </div>
        </article>
      </div>
      <h3 className="my-4 font-bold uppercase ml-4">Fundamentals</h3>
      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NavigationCard
          title="Problems with useEffect"
          description="See why traditional data fetching with useEffect is problematic and how to fix common issues."
          href="/problems-use-effect"
        />

        <NavigationCard
          title="Basic React Query"
          description="Learn how React Query simplifies data fetching with automatic state management and caching."
          href="/fundamentals"
        />

        <NavigationCard
          title="Debounced Search with React Query"
          description="Learn how to implement a debounced search feature with React Query to optimize data fetching."
          href="/search-query"
        />

        <NavigationCard
          title="Infinite Queries"
          description="Explore how to implement infinite scrolling and pagination with useInfiniteQuery."
          href="/infinite-query"
        />

        <NavigationCard
          title="Mutations with React Query"
          description="Learn how to create, update, and delete data using useMutation with proper error handling."
          href="/infinite-query"
        />

        <NavigationCard
          title="Optimistic Updates"
          description="Improve user experience by updating the UI optimistically before server confirmation."
          href="/infinite-query"
        />
      </section>
      <section>
        <h3 className="mb-2 font-bold uppercase">Benefits</h3>
        <ul className="pl-4 list-disc">
          <li className="">Caching</li>
          <li className="">Prevent race conditions</li>
          <li className="">Revalidation</li>
          <li className="">Optimistic updates</li>
          <li className="">Infinite loading</li>
          <li className="">Retries</li>
          <li className="">& more...</li>
        </ul>
      </section>
    </div>
  )
}

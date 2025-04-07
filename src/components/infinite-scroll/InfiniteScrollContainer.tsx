import { useInView } from "react-intersection-observer";

interface InfiniteScrollContainerProps {
  children: React.ReactNode;
  onBottomReached: () => void; // load more or something else the user wants to do
  className?: string;
}

export default function InfiniteScrollContainer({ children, onBottomReached, className }: InfiniteScrollContainerProps) {

  const { ref } = useInView({
    rootMargin: "50px",
    onChange(inView) {
      if (inView) {
        onBottomReached()
      }
    }
  })

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  )
}
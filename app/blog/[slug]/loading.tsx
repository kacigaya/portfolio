import { Nav } from "@/components/nav";
import { Skeleton } from "@/components/skeleton";

export default function BlogPostLoading() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="mx-auto max-w-3xl px-6 pt-24 pb-32 md:px-8"
        aria-busy="true"
      >
        <span className="sr-only" role="status">
          loading post
        </span>
        <Skeleton className="h-4 w-56" />
        <header className="mt-6 border-b pb-6">
          <Skeleton className="h-9 w-full max-w-2xl" />
          <Skeleton className="mt-3 h-9 w-2/3" />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-4.5 w-16" />
            <Skeleton className="h-4.5 w-20" />
          </div>
        </header>
        <div className="mt-8 flex flex-col gap-3">
          {[
            "w-full",
            "w-full",
            "w-11/12",
            "w-1/3",
            "w-full",
            "w-full",
            "w-4/5",
          ].map((width, i) => (
            <Skeleton key={i} className={`h-4 ${width}`} />
          ))}
        </div>
      </main>
    </>
  );
}

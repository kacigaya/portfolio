import { Card, CardFooter, CardHeader } from "@/components/card";
import { Nav } from "@/components/nav";
import { Skeleton } from "@/components/skeleton";

export default function BlogIndexLoading() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="mx-auto max-w-3xl px-6 pt-24 pb-32 md:px-8"
        aria-busy="true"
      >
        <span className="sr-only" role="status">
          loading posts
        </span>
        <Skeleton className="h-4 w-24" />
        <Skeleton className="mt-4 h-10 w-72" />
        <Skeleton className="mt-5 h-4 w-full max-w-xl" />
        <ul className="mt-10 flex flex-col gap-3">
          {Array.from({ length: 5 }, (_, i) => (
            <li key={i}>
              <Card>
                <CardHeader className="gap-3 p-4">
                  <Skeleton className="h-5 w-2/3" />
                  <Skeleton className="h-3.5 w-full" />
                  <Skeleton className="h-3.5 w-4/5" />
                </CardHeader>
                <CardFooter className="p-4">
                  <Skeleton className="h-3 w-40" />
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

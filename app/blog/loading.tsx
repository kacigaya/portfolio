import { Nav } from "@/components/nav";
import { Spinner } from "@/components/spinner";

export default function BlogIndexLoading() {
  return (
    <>
      <Nav />
      <main
        id="main"
        className="mx-auto max-w-3xl px-6 pt-24 pb-32 md:px-8"
        aria-busy="true"
      >
        <Spinner
          aria-label="loading posts"
          className="mx-auto size-6 text-muted-foreground"
        />
      </main>
    </>
  );
}

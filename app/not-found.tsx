import Link from "next/link";
import { Button } from "@/components/button";
import { Nav } from "@/components/nav";
import { SkipLink } from "@/components/skip-link";

export default function NotFound() {
  return (
    <>
      <SkipLink />
      <Nav />
      <main id="main" className="mx-auto max-w-3xl px-6 pt-32 md:px-8">
        <h1 className="md-h1 text-2xl md:text-3xl uppercase">
          404: file not found
        </h1>
        <Button
          size="lg"
          variant="outline"
          className="mt-6"
          render={<Link href="/" />}
        >
          <span className="bracketed">back home</span>
        </Button>
      </main>
    </>
  );
}

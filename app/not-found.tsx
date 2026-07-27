import Link from "next/link";
import { Button } from "@/components/button";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 pt-32 md:px-8">
        <p className="text-sm text-muted-foreground">
          <span aria-hidden>$</span> cat requested-page
        </p>
        <h1 className="mt-4 text-4xl font-bold">404: file not found</h1>
        <Button
          size="lg"
          variant="outline"
          className="mt-6"
          render={<Link href="/" />}
        >
          cd ~
        </Button>
      </main>
    </>
  );
}

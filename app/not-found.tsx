import Link from "next/link";
import { Nav } from "@/components/nav";

export default function NotFound() {
  return <><Nav /><main className="mx-auto max-w-3xl px-6 pt-32 md:px-8"><p className="text-sm text-muted">$ cat requested-page</p><h1 className="mt-4 text-4xl font-bold">404: file not found</h1><p className="mt-6"><Link href="/" className="underline underline-offset-4 text-muted hover:text-white">cd ~</Link></p></main></>;
}

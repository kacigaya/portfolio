import { ArrowUpRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/card";
import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/components/collapsible";
import { getProjects } from "@/lib/projects";

export async function Projects() {
  const { pinned, more } = await getProjects();

  return (
    <section id="projects" className="mt-32">
      <h2 className="text-sm text-muted-foreground">
        <span aria-hidden>$</span> ls ~/projects
      </h2>
      <p className="mt-2 text-xs text-muted-foreground tabular-nums">
        selected open-source work · source and live demos where available
      </p>
      <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-3">
        {pinned.map((p) => (
          <li key={p.name}>
            <Card className="h-full" render={<article />}>
              <CardHeader className="p-4">
                <CardTitle>{p.name}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {p.desc}
                </CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto flex-col items-start gap-3 p-4">
                <div className="flex flex-wrap gap-1">
                  {p.stack.map((s) => (
                    <Badge key={s} variant="secondary">
                      {s}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.homepage && (
                    <Button
                      size="sm"
                      variant="outline"
                      render={
                        <a href={p.homepage} target="_blank" rel="noreferrer" />
                      }
                    >
                      live demo
                      <span className="sr-only">(opens in new tab)</span>
                      <ArrowUpRight aria-hidden="true" />
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    render={<a href={p.url} target="_blank" rel="noreferrer" />}
                  >
                    source
                    <span className="sr-only">(opens in new tab)</span>
                    <ArrowUpRight aria-hidden="true" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
      <Collapsible className="mt-6">
        <CollapsibleTrigger
          render={
            <Button variant="outline" size="sm">
              show {more.length} more projects
              <ChevronDown
                aria-hidden="true"
                className="transition-transform in-[[data-panel-open]]:rotate-180"
              />
            </Button>
          }
        />
        <CollapsiblePanel>
          <ul className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
            {more.map((project) => (
              <li key={project.name}>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                >
                  {project.name}
                  <span className="sr-only"> (opens in new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </CollapsiblePanel>
      </Collapsible>
    </section>
  );
}

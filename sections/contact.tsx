import { Mail } from "lucide-react";
import { Button } from "@/components/button";
import { Card, CardPanel } from "@/components/card";
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons";
import { Separator } from "@/components/separator";
import { socials } from "@/lib/socials";

const lines = [
  {
    icon: Mail,
    label: "mail",
    value: socials.email,
    href: `mailto:${socials.email}`,
  },
  {
    icon: GithubIcon,
    label: "git",
    value: socials.githubLabel,
    href: socials.github,
  },
  {
    icon: LinkedinIcon,
    label: "in",
    value: socials.linkedinLabel,
    href: socials.linkedin,
  },
  {
    icon: XIcon,
    label: "x",
    value: socials.xLabel,
    href: socials.x,
  },
];

export function Contact() {
  return (
    <section id="contact" className="mt-16">
      <h2 className="md-h2 text-sm uppercase">contact</h2>
      <Card className="mt-4">
        <CardPanel className="flex flex-col p-2">
          {lines.map(({ icon: Icon, label, value, href }, index) => {
            const external = href.startsWith("http");
            return (
              <div key={label} className="flex flex-col">
                {index > 0 && <Separator className="my-1" />}
                <Button
                  variant="ghost"
                  className="justify-start gap-3"
                  render={
                    <a
                      href={href}
                      {...(external && { target: "_blank", rel: "noreferrer" })}
                    />
                  }
                >
                  <Icon aria-hidden="true" />
                  <span className="text-muted-foreground text-xs uppercase">
                    {label}
                  </span>
                  <span className="underline underline-offset-4 decoration-muted-foreground">
                    {value}
                  </span>
                  {external && (
                    <span className="sr-only">(opens in new tab)</span>
                  )}
                </Button>
              </div>
            );
          })}
        </CardPanel>
      </Card>
    </section>
  );
}

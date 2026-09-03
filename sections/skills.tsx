import { Badge } from "@/components/badge";

// `core` is what gets used regularly; `rest` is real but occasional. The split
// is what makes this section readable. A flat list of fifty tools claims
// nothing. Keep core short.
type Group = { label: string; core: string[]; rest: string[] };

const groups: Group[] = [
  {
    label: "security",
    core: ["burp suite", "wireshark", "nmap"],
    rest: ["metasploit", "snort", "suricata", "hydra", "john"],
  },
  {
    label: "dev",
    core: ["rust", "python", "typescript", "react", "next.js"],
    rest: ["c", "asm", "javascript", "html", "css", "php"],
  },
  {
    label: "cloud / devops",
    core: ["docker", "bash"],
    rest: ["kubernetes", "azure", "aws", "powershell"],
  },
  {
    label: "scraping / automation",
    core: ["playwright", "camoufox", "httpx"],
    rest: ["selenium", "crawlee", "puppeteer", "scrapy", "beautifulsoup"],
  },
  {
    label: "ai / ml",
    core: ["openrouter"],
    rest: ["tensorflow", "pytorch", "scikit-learn", "hugging face"],
  },
  {
    label: "data",
    core: ["postgresql", "mongodb"],
    rest: ["mysql", "firebase", "oracle"],
  },
  {
    label: "os",
    core: ["debian", "arch", "kali"],
    rest: ["macos", "windows", "android", "ios"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="mt-12 border-t pt-12">
      <h2 className="md-h2 text-base uppercase">skills</h2>
      <p className="mt-2 text-xs text-muted-foreground">
        filled: regular use · outlined: occasional use
      </p>
      <dl className="mt-6 flex flex-col gap-5">
        {groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-2">
            <dt className="md-h3 text-sm uppercase">{g.label}</dt>
            <dd className="flex flex-wrap gap-1" translate="no">
              {g.core.map((s) => (
                <Badge key={s} variant="secondary">
                  {s}
                </Badge>
              ))}
              {g.rest.map((s) => (
                <Badge key={s} variant="outline" className="text-muted-foreground">
                  {s}
                </Badge>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

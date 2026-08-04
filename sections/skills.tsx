import { Badge } from "@/components/badge";

type Group = { label: string; items: string[] };

const groups: Group[] = [
  {
    label: "security",
    items: [
      "nmap",
      "metasploit",
      "burp suite",
      "snort",
      "suricata",
      "wireshark",
      "hydra",
      "john",
    ],
  },
  {
    label: "dev",
    items: [
      "rust",
      "python",
      "c",
      "asm",
      "javascript",
      "typescript",
      "react",
      "next.js",
      "html",
      "css",
      "php",
    ],
  },
  {
    label: "cloud / devops",
    items: ["docker", "kubernetes", "azure", "aws", "powershell", "bash"],
  },
  {
    label: "scraping / automation",
    items: [
      "playwright",
      "selenium",
      "crawlee",
      "puppeteer",
      "scrapy",
      "beautifulsoup",
      "camoufox",
      "httpx",
    ],
  },
  {
    label: "ai / ml",
    items: [
      "tensorflow",
      "pytorch",
      "scikit-learn",
      "hugging face",
      "openrouter",
    ],
  },
  {
    label: "data",
    items: ["mysql", "mongodb", "postgresql", "firebase", "oracle"],
  },
  {
    label: "os",
    items: ["debian", "arch", "kali", "macos", "windows", "android", "ios"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="mt-16">
      <h2 className="md-h2 text-sm uppercase">skills</h2>
      <dl className="mt-6 flex flex-col gap-5">
        {groups.map((g) => (
          <div key={g.label} className="flex flex-col gap-2">
            <dt className="md-h3 text-sm uppercase">{g.label}</dt>
            <dd className="flex flex-wrap gap-1">
              {g.items.map((s) => (
                <Badge key={s} variant="outline">
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

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
      "python",
      "c",
      "pascal",
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
    items: ["debian", "arch", "kali", "macos", "windows", "android"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="mt-32">
      <h2 className="text-sm text-muted">
        <span aria-hidden>$</span> cat skills.txt
      </h2>
      <dl className="mt-6 space-y-5">
        {groups.map((g) => (
          <div key={g.label}>
            <dt className="text-sm">
              <span className="text-muted" aria-hidden>
                {">"}
              </span>{" "}
              <span className="text-white">{g.label}</span>
            </dt>
            <dd className="mt-1.5 text-sm leading-relaxed text-muted">
              {g.items.map((s) => `[${s}]`).join(" ")}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

import { Card, CardPanel } from "@/components/card";

const facts = [
  { label: "role", value: "web dev · cybersecurity" },
  {
    label: "degree",
    value: "M. cybersecurity, Efrei Paris Panthéon-Assas Université",
  },
  { label: "location", value: "Paris, FR" },
  { label: "langs", value: "fr · en" },
];

export function About() {
  return (
    <section id="about" className="mt-12 border-t pt-12">
      <h2 className="md-h2 text-base uppercase">about</h2>
      <div className="mt-4 flex max-w-2xl flex-col gap-4 leading-relaxed text-pretty text-muted-foreground">
        <p>
          Cybersecurity-focused developer with a background in network and
          system administration, plus web development.
        </p>
        <p>
          Day job at{" "}
          <span className="text-foreground">Société Générale Assurance</span>: web
          security research against complex web targets, reverse-engineering
          anti-bot and bot-detection systems, and browser fingerprinting.
        </p>
        <p>
          Outside work, I build small CLIs, browser tools, and AI side projects.
          Comfortable across Linux, macOS, and Windows. I usually read source
          before docs.
        </p>
        <Card className="mt-2">
          <CardPanel className="grid grid-cols-1 gap-x-6 gap-y-3 p-4 text-sm sm:grid-cols-2">
            {facts.map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-0.5">
                <span className="text-xs text-muted-foreground uppercase">
                  {label}
                </span>
                <span className="text-foreground">{value}</span>
              </div>
            ))}
          </CardPanel>
        </Card>
      </div>
    </section>
  );
}

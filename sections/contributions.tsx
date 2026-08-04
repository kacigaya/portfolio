import { cn } from "@/lib/utils";
import { getContributions } from "@/lib/contributions";

const LEVEL = [
  "bg-black/6 dark:bg-white/8",
  "bg-emerald-300 dark:bg-emerald-900",
  "bg-emerald-400 dark:bg-emerald-700",
  "bg-emerald-500 dark:bg-emerald-500",
  "bg-emerald-600 dark:bg-emerald-300",
];
const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

export async function Contributions() {
  const data = await getContributions();
  if (!data || data.weeks.length === 0) return null;

  return (
    <section id="contributions" className="mt-16">
      <h2 className="md-h2 text-sm uppercase">contributions</h2>
      <p className="mt-2 text-xs text-muted-foreground tabular-nums">
        {data.total} contributions in {data.year} · via github
      </p>
      <div className="mt-6 overflow-x-auto pb-1">
        <div className="flex gap-2 text-[10px] text-muted-foreground">
          <div className="flex flex-col gap-[3px]">
            {/* spacer matching the month-label row height */}
            <div className="mb-1 h-2.5" />
            {WEEKDAYS.map((d, i) => (
              <div key={i} className="h-2.5 leading-none">
                {d}
              </div>
            ))}
          </div>
          <div className="flex flex-col">
            <div className="mb-1 flex h-2.5 gap-[3px]">
              {data.months.map((m, i) => (
                <div key={i} className="w-2.5 whitespace-nowrap">
                  {m}
                </div>
              ))}
            </div>
            <div className="flex gap-[3px]">
              {data.weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <div
                      key={di}
                      title={
                        day ? `${day.count} on ${day.date}` : undefined
                      }
                      className={cn(
                        "size-2.5 rounded-[2px]",
                        day ? LEVEL[day.level] : "bg-transparent",
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted-foreground">
        <a
          href="https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/managing-contribution-settings-on-your-profile/viewing-contributions-on-your-profile"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          Learn how we count contributions
          <span className="sr-only"> (opens in new tab)</span>
        </a>
        <div className="flex items-center gap-[3px]">
          <span className="mr-1">Less</span>
          {LEVEL.map((c, i) => (
            <div key={i} className={cn("size-2.5 rounded-[2px]", c)} />
          ))}
          <span className="ml-1">More</span>
        </div>
      </div>
    </section>
  );
}

import { Fragment } from "react";
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

  // one fluid grid: a label gutter column, then one 1fr column per week, so the
  // whole calendar scales to the container width instead of scrolling.
  const template = `auto repeat(${data.weeks.length}, minmax(0, 1fr))`;

  return (
    <section id="contributions" className="mt-16">
      <h2 className="md-h2 text-sm uppercase">contributions</h2>
      <p className="mt-2 text-xs text-muted-foreground tabular-nums">
        {data.total} contributions in {data.year} · via github
      </p>
      <div
        className="mt-6 grid gap-[2px] overflow-hidden text-[10px] text-muted-foreground"
        style={{ gridTemplateColumns: template }}
      >
        <div />
        {data.months.map((m, i) => (
          <div key={i} className="mb-1 whitespace-nowrap leading-none">
            {m}
          </div>
        ))}
        {WEEKDAYS.map((label, row) => (
          <Fragment key={row}>
            <div className="flex items-center pr-1 leading-none">{label}</div>
            {data.weeks.map((week, wi) => {
              const day = week[row];
              return (
                <div
                  key={wi}
                  title={day ? `${day.count} on ${day.date}` : undefined}
                  className={cn(
                    "aspect-square rounded-[2px]",
                    day ? LEVEL[day.level] : "bg-transparent",
                  )}
                />
              );
            })}
          </Fragment>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-end gap-2 text-[10px] text-muted-foreground">
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

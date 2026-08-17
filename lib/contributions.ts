import { REVALIDATE } from "@/lib/site";
import { GITHUB_LOGIN } from "@/lib/socials";
import { utcDate } from "@/lib/utils";

export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type Calendar = {
  weeks: (ContributionDay | null)[][];
  months: (string | null)[];
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// the API returns every day of the calendar year, so the rest of the year
// renders as empty columns. Cut at today the way GitHub does.
export function upToToday(
  days: ContributionDay[],
  today: string,
): ContributionDay[] {
  return days.filter((d) => d.date <= today);
}

// pad to whole GitHub-style weeks (Sunday-first columns), then tag the column
// where each month first appears so labels line up over the grid.
export function toCalendar(days: ContributionDay[]): Calendar {
  if (days.length === 0) return { weeks: [], months: [] };

  const lead = utcDate(days[0].date).getUTCDay();
  const cells: (ContributionDay | null)[] = [...Array(lead).fill(null), ...days];
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks: (ContributionDay | null)[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const months: (string | null)[] = weeks.map(() => null);
  let last = -1;
  weeks.forEach((week, wi) => {
    const day = week.find(Boolean);
    if (!day) return;
    const month = utcDate(day.date).getUTCMonth();
    if (month !== last) {
      months[wi] = MONTHS[month];
      last = month;
    }
  });

  return { weeks, months };
}

export async function getContributions(): Promise<
  (Calendar & { total: number; year: number }) | null
> {
  const now = new Date();
  const year = now.getUTCFullYear();
  const today = now.toISOString().slice(0, 10);
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${GITHUB_LOGIN}?y=${year}`,
      { next: { revalidate: REVALIDATE } },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      total?: Record<string, number>;
      contributions?: ContributionDay[];
    };
    return {
      year,
      total: json.total?.[year] ?? 0,
      ...toCalendar(upToToday(json.contributions ?? [], today)),
    };
  } catch {
    return null;
  }
}

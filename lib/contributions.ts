export type ContributionDay = {
  date: string;
  count: number;
  level: number;
};

export type Calendar = {
  weeks: (ContributionDay | null)[][];
  months: (string | null)[];
};

const LOGIN = "kacigaya";
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

function utcDate(iso: string): Date {
  return new Date(`${iso}T00:00:00Z`);
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
  (Calendar & { total: number }) | null
> {
  try {
    const res = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${LOGIN}?y=last`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return null;
    const json = (await res.json()) as {
      total?: { lastYear?: number };
      contributions?: ContributionDay[];
    };
    return {
      total: json.total?.lastYear ?? 0,
      ...toCalendar(json.contributions ?? []),
    };
  } catch {
    return null;
  }
}

import { expect, test } from "bun:test";
import { toCalendar, type ContributionDay } from "./contributions";

function days(start: string, n: number): ContributionDay[] {
  const out: ContributionDay[] = [];
  const d = new Date(`${start}T00:00:00Z`);
  for (let i = 0; i < n; i++) {
    out.push({ date: d.toISOString().slice(0, 10), count: 0, level: 0 });
    d.setUTCDate(d.getUTCDate() + 1);
  }
  return out;
}

test("empty input yields empty calendar", () => {
  expect(toCalendar([])).toEqual({ weeks: [], months: [] });
});

test("pads leading blanks to the first day's weekday", () => {
  // 2025-01-01 is a Wednesday (UTC day 3)
  const cal = toCalendar(days("2025-01-01", 14));
  expect(cal.weeks[0].slice(0, 3)).toEqual([null, null, null]);
  expect(cal.weeks[0][3]?.date).toBe("2025-01-01");
});

test("every column is a full 7-day week", () => {
  const cal = toCalendar(days("2025-01-01", 14));
  expect(cal.weeks.every((w) => w.length === 7)).toBe(true);
});

test("labels the first column of each new month once", () => {
  const cal = toCalendar(days("2025-01-01", 60));
  const labels = cal.months.filter(Boolean);
  expect(labels).toEqual(["Jan", "Feb"]);
});

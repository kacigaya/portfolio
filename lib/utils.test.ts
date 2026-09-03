import { describe, expect, test } from "bun:test";
import { formatDate, utcDate } from "@/lib/utils";

describe("formatDate", () => {
  test("renders a bare ISO day in UTC", () => {
    expect(formatDate("2025-08-24")).toBe("Aug 24, 2025");
  });

  // A local-time parse would render the day before anywhere west of UTC, and
  // the server and the browser would disagree on it.
  test("does not shift the day across zones", () => {
    expect(formatDate("2025-01-01")).toBe("Jan 1, 2025");
    expect(utcDate("2025-01-01").getUTCDate()).toBe(1);
  });
});

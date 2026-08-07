export const SITE_URL = "https://gayakaci.duckdns.org";

// Daily: the GitHub-backed sections (projects, contributions) are refreshed by
// Next's own ISR on the long-running server, no external build trigger needed.
// Must match `export const revalidate` in app/page.tsx, which Next requires to
// be a literal.
export const REVALIDATE = 86400;

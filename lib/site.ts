export const SITE_URL = "https://gayakaci.netlify.app";

// Daily: the GitHub-backed sections (projects, contributions) are refreshed by
// the scheduled Netlify build hook in .github/workflows/refresh-projects.yml.
// Must match `export const revalidate` in app/page.tsx, which Next requires to
// be a literal.
export const REVALIDATE = 86400;

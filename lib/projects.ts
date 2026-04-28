type Project = {
  name: string;
  desc: string;
  url: string;
  homepage?: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "ghostpwn",
    desc: "Autonomous pentest agent. Interactive TUI with multi-provider LLM backends.",
    url: "https://github.com/GhostPWN/ghostpwn",
    stack: ["rust", "tui", "llm", "security"],
  },
  {
    name: "pdfcmprs",
    desc: "Compress, merge, and split your PDFs directly in the browser. No server upload, fully offline",
    url: "https://github.com/kacigaya/pdfcmprs",
    stack: ["typescript", "next.js"],
  },
  {
    name: "lightchat",
    desc: "Minimalist AI chat. 17 LLM providers via Vercel AI SDK, keys stay in the browser.",
    url: "https://github.com/kacigaya/lightchat",
    homepage: "https://lightchat-beta.vercel.app",
    stack: ["typescript", "next.js", "ai-sdk"],
  },
  {
    name: "binje",
    desc: "Movie and TV discovery app. Next.js front-end on top of the TMDB API.",
    url: "https://github.com/kacigaya/binje",
    homepage: "https://binje.vercel.app",
    stack: ["typescript", "next.js", "tmdb"],
  },
  {
    name: "predicty-foot",
    desc: "Live bookmaker odds plus AI football predictions for top European leagues.",
    url: "https://github.com/kacigaya/predicty-foot",
    homepage: "https://predicty-foot.vercel.app",
    stack: ["typescript", "next.js", "ai"],
  },
  {
    name: "bangs",
    desc: "Lightning-fast search shortcut service inspired by DuckDuckGo !bangs.",
    url: "https://github.com/kacigaya/bangs",
    homepage: "https://bangs-beta.vercel.app",
    stack: ["typescript", "next.js"],
  },
  {
    name: "dns-switcher",
    desc: "Lightweight macOS menu-bar app for instant DNS profile switching.",
    url: "https://github.com/kacigaya/dns-switcher",
    stack: ["swift", "macos"],
  },
  {
    name: "spotblock",
    desc: "Cross-platform bash script that blocks Spotify ads via the system hosts file.",
    url: "https://github.com/kacigaya/spotblock",
    stack: ["bash", "macos", "windows"],
  },
  {
    name: "clean-tweetx",
    desc: "Minimal Chrome extension that hides distracting and promotional UI on X.",
    url: "https://github.com/kacigaya/clean-tweetx",
    stack: ["javascript", "chrome-ext"],
  },
  {
    name: "youtube-playlist-purger",
    desc: "Browser console script to bulk-remove every video from a YouTube playlist.",
    url: "https://github.com/kacigaya/youtube-playlist-purger",
    stack: ["javascript", "snippet"],
  },
];

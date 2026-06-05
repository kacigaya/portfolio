type Project = {
  name: string;
  desc: string;
  url: string;
  homepage?: string;
  stack: string[];
};

export const projects: Project[] = [
  {
    name: "webskrap",
    desc: "Python web-scraping framework built on Playwright.",
    url: "https://github.com/kacigaya/webskrap",
    homepage: "https://kacigaya.github.io/webskrap/",
    stack: ["python", "playwright", "scraping"],
  },
  {
    name: "deepseek-pi-oauth",
    desc: "DeepSeek web-login/OAuth bridge installer for Pi from pi.dev.",
    url: "https://github.com/kacigaya/deepseek-pi-oauth",
    stack: ["bash", "oauth", "pi.dev"],
  },
  {
    name: "minimax-pi-oauth",
    desc: "MiniMax OAuth bridge installer for Pi from pi.dev.",
    url: "https://github.com/kacigaya/minimax-pi-oauth",
    stack: ["bash", "oauth", "pi.dev"],
  },
  {
    name: "teensy-reverse-shell",
    desc: "BadUSB POC. Teensy 3.2 deploys a fileless PowerShell reverse shell on Windows via HID injection.",
    url: "https://github.com/kacigaya/teensy-reverse-shell",
    stack: ["c++", "powershell", "badusb", "security"],
  },
  {
    name: "ghostpwn",
    desc: "Autonomous pentest agent with an interactive TUI and multi-provider LLM backends.",
    url: "https://github.com/GhostPWN/ghostpwn",
    stack: ["rust", "tui", "llm", "security"],
  },
  {
    name: "pdfcmprs",
    desc: "Compress, merge, and split PDFs in the browser. No server upload, fully offline.",
    url: "https://github.com/kacigaya/pdfcmprs",
    stack: ["typescript", "next.js"],
  },
  {
    name: "lightchat",
    desc: "Small AI chat app with 17 LLM providers through Vercel AI SDK. Keys stay in the browser.",
    url: "https://github.com/kacigaya/lightchat",
    homepage: "https://lightchat-beta.vercel.app",
    stack: ["typescript", "next.js", "ai-sdk"],
  },
  {
    name: "binje",
    desc: "Movie and TV discovery app with a Next.js front end on top of the TMDB API.",
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
    desc: "Lightweight macOS menu-bar app for DNS profile switching.",
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

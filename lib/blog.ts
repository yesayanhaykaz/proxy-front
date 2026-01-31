// lib/blog.ts
export type BlogCategory = "Integration" | "Advanced" | "Use Case";
export type BlogBadge = "Popular" | "Advanced" | "Use Case";

export type ContentBlock =
  | { type: "heading"; id: string; text: string }
  | { type: "subheading"; id: string; text: string }
  | { type: "paragraph"; text: string }
  | { type: "code"; lang: "bash" | "python" | "js" | "text"; code: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string; icon?: string };

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishDateISO: string; // ISO date string
  readTime: string;       // "5 min read"
  category: BlogCategory;
  tags: string[];
  author: { name: string };
  badge?: BlogBadge;
  icon?: string;
  coverImage?: string;    // OPTIONAL (good for cards + OG)
  content: ContentBlock[];
};

const placeholderContent = (desc: string): ContentBlock[] => [
  { type: "heading", id: "overview", text: "Overview" },
  { type: "paragraph", text: desc },
  { type: "heading", id: "setup", text: "Setup" },
  { type: "paragraph", text: "Replace host/port/username/password with your Proxiesseller credentials." },
  { type: "code", lang: "text", code: "PROXY_HOST=...\nPROXY_PORT=...\nPROXY_USER=...\nPROXY_PASS=..." },
  { type: "heading", id: "troubleshooting", text: "Troubleshooting" },
  { type: "list", items: ["Check credentials", "Check protocol (HTTP vs SOCKS5)", "Add retries/backoff"] },
];


export const POSTS: BlogPost[] = [
{
  slug: "proxy-rotation-strategies",
  title: "Proxy Rotation Strategies — Sticky vs Rotating Sessions (Best Practices)",
  description:
    "Learn sticky sessions, rotation intervals, pool sizing, and safe retry patterns to reduce bans and improve success rate.",
  publishDateISO: "2026-01-20",
  readTime: "9 min read",
  category: "Advanced",
  tags: ["rotation", "sticky", "sessions", "anti-ban", "retry"],
  author: { name: "Technical Team" },
  badge: "Advanced",
  icon: "bi bi-arrow-repeat",
  content: articleTemplate({
    intro:
      "Rotation strategy is the difference between a stable scraper and constant bans. This guide explains sticky vs rotating pools, when to switch, and how to pick the correct rotation interval.",
    examples: [
      {
        title: "Recommended strategy by use case",
        desc: "Use sticky sessions for logins / carts. Use rotation for broad scraping.",
        lang: "text",
        code: `Logins / sessions: Sticky (same IP 5–30 min)
Price monitoring: Rotating (new IP every 1–10 requests)
Search pages: Rotating (new IP per request)
Account management: Sticky + slow actions`,
      },
      {
        title: "Rotation interval rule of thumb",
        lang: "text",
        code: `If you see bans quickly → rotate more often
If you see captcha after 20–50 requests → rotate every 5–10 requests
If site tracks sessions → sticky for 10–30 minutes`,
      },
    ],
    troubleshooting: [
      "If your IP gets blocked: reduce concurrency and rotate more often",
      "If captcha increases: slow down + use sticky sessions for session-heavy flows",
      "If latency spikes: reduce pool size to higher quality IPs or use closer regions",
    ],
    proTip:
      "Rotation alone is not enough. Combine rotation + retries with backoff + realistic headers and stable request rate.",
  }),
},
{
  slug: "authentication-methods",
  title: "Proxy Authentication Methods — Username/Password vs IP Whitelisting",
  description:
    "Compare proxy auth types, when to use each, and how to secure access for teams and automation.",
  publishDateISO: "2026-01-22",
  readTime: "7 min read",
  category: "Advanced",
  tags: ["auth", "ip-whitelist", "security", "credentials"],
  author: { name: "Technical Team" },
  badge: "Advanced",
  icon: "bi bi-shield-lock",
  content: articleTemplate({
    intro:
      "Proxy authentication impacts security and integration speed. This guide explains user/pass vs IP whitelisting and best practices for production.",
    examples: [
      {
        title: "Username/password format",
        lang: "bash",
        code: `curl -x http://USER:PASS@HOST:PORT https://api.ipify.org`,
      },
      {
        title: "IP whitelist concept",
        desc: "No password required — proxy server allows only approved IPs.",
        lang: "text",
        code: `Best for servers with static IP
Hard for laptops / dynamic home internet / mobile networks`,
      },
    ],
    troubleshooting: [
      "If you get 407/401: wrong credentials or wrong format",
      "If IP whitelist doesn't work: your server IP changed (cloud NAT, dynamic IP, etc.)",
      "If leaks happen: rotate credentials and limit access scope per team/app",
    ],
    proTip:
      "For teams: create separate credentials per project. If one leaks, you revoke one key instead of rotating everything.",
  }),
},
{
  slug: "price-monitoring-use-case",
  title: "Use Case: Price Monitoring with Proxies (Amazon, eBay, Retail Sites)",
  description:
    "A real workflow for stable price monitoring: rotation, retries, concurrency limits, and data freshness planning.",
  publishDateISO: "2026-01-25",
  readTime: "8 min read",
  category: "Use Case",
  tags: ["price-monitoring", "retail", "scraping", "rotation"],
  author: { name: "Technical Team" },
  badge: "Use Case",
  icon: "bi bi-tags",
  content: articleTemplate({
    intro:
      "Price monitoring needs stability more than speed. This guide shows a safe architecture using rotation + retries + throttling to avoid bans and keep data fresh.",
    examples: [
      {
        title: "Recommended defaults",
        lang: "text",
        code: `Concurrency: 5–20 per domain
Rotate: every 5–20 requests
Retry: 2–4 with exponential backoff
User-agent: realistic list
Cache: short TTL (5–30 minutes)`,
      },
      {
        title: "Simple retry logic idea",
        lang: "text",
        code: `Retry only on:
- 429
- 403 (sometimes)
- timeouts
Use backoff: 1s → 3s → 7s`,
      },
    ],
    troubleshooting: [
      "If you see 403 quickly: rotate more often and reduce concurrency",
      "If 429: you are too fast; add delays and caching",
      "If HTML changes: use robust selectors and fallback extraction",
    ],
    proTip:
      "Do not scrape the same SKU every 10 seconds. Cache results and schedule re-checks intelligently.",
  }),
},
{
  slug: "multi-accounting-use-case",
  title: "Use Case: Multi-Account Automation Safely (Sessions, Profiles, Proxies)",
  description:
    "Avoid bans in multi-accounting: assign stable IPs per account, isolate browser profiles, and use safe schedules.",
  publishDateISO: "2026-01-28",
  readTime: "10 min read",
  category: "Use Case",
  tags: ["multi-account", "automation", "profiles", "sticky"],
  author: { name: "Technical Team" },
  badge: "Use Case",
  icon: "bi bi-people",
  content: articleTemplate({
    intro:
      "Multi-accounting fails when IPs, sessions, and profiles mix. This guide shows clean isolation patterns: one proxy per account or sticky pool per account + separated browser profiles.",
    examples: [
      {
        title: "Account isolation checklist",
        lang: "text",
        code: `Separate browser profile per account
Separate cookie jar
Stable IP per account (sticky)
Avoid simultaneous logins from same IP to many accounts
Human-like schedules`,
      },
      {
        title: "Sticky session recommendation",
        lang: "text",
        code: `Keep same IP for 30–120 minutes per account, then rotate
Never rotate IP mid-session during login flows`,
      },
    ],
    troubleshooting: [
      "If sessions keep logging out: you are rotating too often",
      "If accounts get flagged: profile leakage; separate profiles and reduce automation speed",
      "If captchas increase: add delays, avoid repeated patterns, reduce concurrency",
    ],
    proTip:
      "The best proxy setup is useless if your browser fingerprint is identical across accounts. Combine proxies + profile isolation.",
  }),
},

  {
    slug: "python-requests",
    title: "Python with Requests - Complete Proxy Integration Guide",
    description:
      "Use Proxiesseller proxies with Python requests for scraping and API calls. HTTP + SOCKS5 examples.",
    publishDateISO: "2026-01-15",
    readTime: "5 min read",
    category: "Integration",
    tags: ["python", "requests", "http", "socks5"],
    author: { name: "Technical Team" },
    badge: "Popular",
    icon: "bi bi-filetype-py",
    content: articleTemplate({
      intro:
        "This guide shows how to connect through Proxiesseller proxies using Python requests. You’ll learn HTTP and SOCKS5 formats, authentication, and safe retry patterns.",
      install: { text: "Install dependencies:", lang: "bash", code: "pip install requests pysocks" },
      examples: [
        {
          title: "HTTP proxy (user/pass)",
          desc: "Works for most HTTP(S) scraping tasks.",
          lang: "python",
          code: `import requests

proxies = {
  "http": "http://USER:PASS@HOST:PORT",
  "https": "http://USER:PASS@HOST:PORT"
}

r = requests.get("https://api.ipify.org", proxies=proxies, timeout=15)
print(r.text)`,
        },
        {
          title: "SOCKS5 proxy",
          desc: "Use socks5h to proxy DNS too (recommended).",
          lang: "python",
          code: `import requests

proxies = {
  "http": "socks5h://USER:PASS@HOST:PORT",
  "https": "socks5h://USER:PASS@HOST:PORT"
}

r = requests.get("https://api.ipify.org", proxies=proxies, timeout=15)
print(r.text)`,
        },
      ],
      troubleshooting: [
        "If SOCKS5 fails: make sure you installed `pysocks` and used `socks5h://`",
        "If you get 407/401: verify username/password and proxy port",
        "If you get bans: reduce concurrency, rotate IPs, add backoff + retry",
      ],
      proTip:
        "For scraping, combine retries + randomized headers + reasonable delays. Proxies alone won’t fix aggressive request rates.",
    }),
  },

  {
    slug: "scrapy-integration",
    title: "Scrapy Integration - Rotating Proxies (Middleware Setup)",
    description:
      "Configure Scrapy to use rotating proxies and handle bans/timeouts with middleware and retries.",
    publishDateISO: "2026-01-12",
    readTime: "8 min read",
    category: "Integration",
    tags: ["scrapy", "rotation", "middleware"],
    author: { name: "Technical Team" },
    badge: "Popular",
    icon: "bi bi-bug",
    content: articleTemplate({
      intro:
        "Scrapy scales fast, so proxy + retry config matters. This guide shows a clean middleware approach and safe defaults for rotating Proxiesseller proxies.",
      install: { text: "Install Scrapy:", lang: "bash", code: "pip install scrapy" },
      examples: [
        {
          title: "settings.py (recommended defaults)",
          lang: "python",
          code: `DOWNLOADER_MIDDLEWARES = {
  "scrapy.downloadermiddlewares.retry.RetryMiddleware": 90,
}

RETRY_ENABLED = True
RETRY_TIMES = 3
DOWNLOAD_TIMEOUT = 25
CONCURRENT_REQUESTS = 16`,
        },
        {
          title: "Use a single proxy (quick test)",
          lang: "python",
          code: `# in your spider:
def start_requests(self):
  yield scrapy.Request(
    url="https://api.ipify.org",
    meta={"proxy": "http://USER:PASS@HOST:PORT"},
    callback=self.parse
  )`,
        },
        {
          title: "Rotate proxies (list)",
          desc: "Pick a proxy per request (simple rotation).",
          lang: "python",
          code: `import random

PROXIES = [
  "http://USER:PASS@HOST1:PORT",
  "http://USER:PASS@HOST2:PORT",
]

def process_request(request, spider):
  request.meta["proxy"] = random.choice(PROXIES)`,
        },
      ],
      troubleshooting: [
        "If requests hang: increase DOWNLOAD_TIMEOUT and reduce concurrency",
        "If some sites block: enable cookies, use realistic headers, slow down",
        "If proxy auth fails: verify proxy URL format in meta['proxy']",
      ],
      proTip:
        "For best success rate, use sticky sessions per domain (same IP for a short time), then rotate.",
    }),
  },

  {
    slug: "selenium-webdriver",
    title: "Selenium WebDriver Proxy Setup (Chrome) + Authentication",
    description:
      "Run Selenium through proxies with stable Chrome profiles, auth patterns, and anti-block tips.",
    publishDateISO: "2026-01-10",
    readTime: "7 min read",
    category: "Integration",
    tags: ["selenium", "chrome", "auth"],
    author: { name: "Technical Team" },
    badge: "Popular",
    icon: "bi bi-browser-chrome",
    content: articleTemplate({
      intro:
        "Selenium needs clean profiles and correct proxy flags. This guide shows a working setup pattern and common gotchas for proxy authentication.",
      install: { text: "Install Selenium:", lang: "bash", code: "pip install selenium" },
      examples: [
        {
          title: "Chrome proxy flag (basic)",
          lang: "python",
          code: `from selenium import webdriver
from selenium.webdriver.chrome.options import Options

opts = Options()
opts.add_argument("--proxy-server=http://HOST:PORT")

driver = webdriver.Chrome(options=opts)
driver.get("https://api.ipify.org")
print(driver.page_source)
driver.quit()`,
        },
        {
          title: "Authenticated proxies",
          desc: "Chrome does not support user/pass in proxy URL via flag alone. Use an extension approach for auth.",
          lang: "text",
          code: `Recommended: generate a small Chrome extension that sets proxy + handles auth.
(We can generate this extension per your proxy format.)`,
        },
      ],
      troubleshooting: [
        "If IP doesn’t change: ensure proxy-server is set and Chrome is not using system proxy",
        "If auth fails: use extension-based auth (best practice for Chrome)",
        "If site blocks: use realistic viewport, user-agent, and slower actions",
      ],
      proTip:
        "Use a separate Chrome profile per account/task. Reusing the same profile across many targets increases ban risk.",
    }),
  },

  {
    slug: "puppeteer-playwright",
    title: "Puppeteer & Playwright Proxies (Node.js) — Reliable Setup",
    description:
      "Use proxies with Playwright and Puppeteer for JS-heavy sites, including auth patterns.",
    publishDateISO: "2026-01-08",
    readTime: "6 min read",
    category: "Integration",
    tags: ["node", "playwright", "puppeteer"],
    author: { name: "Technical Team" },
    icon: "bi bi-code-square",
    content: articleTemplate({
      intro:
        "Playwright and Puppeteer support proxies cleanly. This guide shows proxy configuration and authentication patterns that work in production.",
      install: { text: "Install Playwright:", lang: "bash", code: "npm i playwright" },
      examples: [
        {
          title: "Playwright proxy + auth",
          lang: "js",
          code: `import { chromium } from "playwright";

const browser = await chromium.launch({
  proxy: { server: "http://HOST:PORT", username: "USER", password: "PASS" },
});

const page = await browser.newPage();
await page.goto("https://api.ipify.org");
console.log(await page.textContent("body"));
await browser.close();`,
        },
        {
          title: "Puppeteer proxy flag",
          lang: "js",
          code: `import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  args: ["--proxy-server=http://HOST:PORT"],
});

const page = await browser.newPage();
// if auth is needed:
await page.authenticate({ username: "USER", password: "PASS" });

await page.goto("https://api.ipify.org");
console.log(await page.evaluate(() => document.body.innerText));
await browser.close();`,
        },
      ],
      troubleshooting: [
        "If pages load slow: reduce concurrency and enable request blocking for images/fonts",
        "If auth fails: confirm you used page.authenticate (Puppeteer) or proxy credentials (Playwright)",
        "If blocked: rotate IPs and reduce repeated navigation patterns",
      ],
      proTip:
        "Block images/fonts when scraping. You’ll save bandwidth and reduce detection noise.",
    }),
  },

  {
    slug: "curl-command-line",
    title: "cURL Proxy Guide — HTTP & SOCKS5 Examples",
    description:
      "Quick proxy commands for cURL: authenticated HTTP proxy and SOCKS5 usage.",
    publishDateISO: "2026-01-05",
    readTime: "4 min read",
    category: "Integration",
    tags: ["curl", "cli", "socks5", "http"],
    author: { name: "Technical Team" },
    icon: "bi bi-terminal",
    content: articleTemplate({
      intro:
        "Use cURL to quickly test proxies, verify IP changes, and debug authentication issues.",
      examples: [
        {
          title: "HTTP proxy with auth",
          lang: "bash",
          code: `curl -x http://USER:PASS@HOST:PORT https://api.ipify.org`,
        },
        {
          title: "SOCKS5 proxy (proxy DNS too)",
          lang: "bash",
          code: `curl --proxy socks5h://USER:PASS@HOST:PORT https://api.ipify.org`,
        },
      ],
      troubleshooting: [
        "If you see SSL errors: try updating curl or add --tlsv1.2 (temporary)",
        "If 407: credentials are wrong or auth is required",
        "If connection refused: wrong port or proxy not reachable",
      ],
      proTip:
        "Always test your proxy with api.ipify.org before integrating into an app.",
    }),
  },

  {
    slug: "node-axios",
    title: "Node.js + Axios Proxy Setup (HTTP + SOCKS)",
    description:
      "Use Proxiesseller proxies in Node.js Axios with agents and safe defaults.",
    publishDateISO: "2026-01-03",
    readTime: "5 min read",
    category: "Integration",
    tags: ["node", "axios", "http-agent"],
    author: { name: "Technical Team" },
    icon: "bi bi-node-plus",
    content: articleTemplate({
      intro:
        "Axios needs proper agent configuration for proxies. This guide shows stable patterns for HTTP proxies.",
      install: { text: "Install Axios:", lang: "bash", code: "npm i axios" },
      examples: [
        {
          title: "Axios with HTTP proxy",
          lang: "js",
          code: `import axios from "axios";

const client = axios.create({
  proxy: {
    protocol: "http",
    host: "HOST",
    port: Number("PORT"),
    auth: { username: "USER", password: "PASS" },
  },
  timeout: 15000,
});

const r = await client.get("https://api.ipify.org");
console.log(r.data);`,
        },
      ],
      troubleshooting: [
        "If proxy is ignored: ensure you didn't set HTTP(S)_PROXY env vars conflicting",
        "If TLS errors: use https endpoint and correct proxy protocol",
        "If blocked: rotate IPs and reduce request bursts",
      ],
      proTip:
        "For large-scale scraping, prefer a queue + concurrency limit instead of firing thousands of requests instantly.",
    }),
  },
];



export function getPostBySlug(slug: string) {
  return POSTS.find((p) => p.slug === slug) || null;
}

function articleTemplate(args: {
  intro: string;
  install?: { text: string; code: string; lang: "bash" | "text" };
  examples: { title: string; desc?: string; code: string; lang: "python" | "js" | "bash" | "text" }[];
  troubleshooting: string[];
  proTip?: string;
}): ContentBlock[] {
  return [
    { type: "heading", id: "overview", text: "Overview" },
    { type: "paragraph", text: args.intro },

    ...(args.install
      ? ([
          { type: "heading", id: "installation", text: "Installation & Setup" },
          { type: "paragraph", text: args.install.text },
          { type: "code", lang: args.install.lang, code: args.install.code },
        ] satisfies ContentBlock[])
      : ([] as ContentBlock[])),

    { type: "heading", id: "examples", text: "Examples" },

    ...args.examples.flatMap((ex, i): ContentBlock[] => {
      const id = `example-${i + 1}`;
      return [
        { type: "subheading", id, text: ex.title },
        ...(ex.desc ? ([{ type: "paragraph", text: ex.desc }] as ContentBlock[]) : []),
        { type: "code", lang: ex.lang, code: ex.code },
      ];
    }),

    { type: "heading", id: "troubleshooting", text: "Troubleshooting" },
    { type: "list", items: args.troubleshooting },

    ...(args.proTip
      ? ([
          {
            type: "callout",
            title: "Pro Tip",
            text: args.proTip,
            icon: "bi bi-lightbulb",
          },
        ] satisfies ContentBlock[])
      : ([] as ContentBlock[])),
  ];
}


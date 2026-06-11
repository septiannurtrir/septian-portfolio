import Link from "next/link";
import Image from "next/image";
import { boboboxData, sideProjectsData } from "@/lib/data";
import NavBar from "./components/NavBar";
import MarqueeRow from "./components/MarqueeRow";
import { getHomepageContent, getToolsContent } from "@/lib/notion";

type NotionRow = {
  name: string;
  section: string;
  content: string;
  subtitle: string;
  label: string;
  imageUrl: string;
};

type NotionTool = {
  name: string;
  category: string;
  iconSlug: string;
  iconUrl: string;
};

const fallbackMetrics = [
  { value: "15% → 61.5%", label: "Email open rate" },
  { value: "+56.8%", label: "App revamp CTR" },
  { value: "31%+", label: "QRIS adoption" },
  { value: "84.5%", label: "NPS score" },
  { value: "+700k", label: "Website visits" },
  { value: "~Rp500M/mo", label: "Revenue visibility" },
];

const toolGroups = [
  {
    category: "Analytics & CRM",
    tools: [
      "Mixpanel",
      "CleverTap",
      "AppsFlyer",
      "Singular",
      "GA4",
      "Amplitude",
      "Netcore",
      "Metabase",
      "Looker Studio",
    ],
  },
  { category: "Automation", tools: ["N8N", "Lovable", "Replit"] },
  { category: "AI", tools: ["Claude", "Cursor"] },
  {
    category: "Product",
    tools: ["Figma", "ClickUp", "Monday", "Directus", "Strapi", "Talon.One"],
  },
];

function groupToolsForMarquee(
  groups: { category: string; tools: NotionTool[] }[]
): [NotionTool[], NotionTool[], NotionTool[]] {
  const row1: NotionTool[] = [];
  const row2: NotionTool[] = [];
  const row3: NotionTool[] = [];
  for (const group of groups) {
    const cat = group.category.toLowerCase();
    if (cat.includes("analytics") || cat.includes("crm")) {
      row1.push(...group.tools);
    } else if (cat.includes("ai") || cat.includes("automation")) {
      row2.push(...group.tools);
    } else {
      row3.push(...group.tools);
    }
  }
  return [row1, row2, row3];
}

export default async function Home() {
  const content = (await getHomepageContent()) as NotionRow[];

  const hero = content.find((r) => r.section === "Hero");
  const about = content.find((r) => r.section === "About");
  const notionMetrics = content.filter((r) => r.section === "Metrics");
  const cta = content.find((r) => r.section === "CTA");

  const displayMetrics =
    notionMetrics.length > 0
      ? [...notionMetrics]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((r) => ({ value: r.content, label: r.subtitle }))
      : fallbackMetrics;

  const ctaHeading = cta?.content || "Let's build something that grows.";
  const ctaWords = ctaHeading.trim().split(" ");
  const ctaAccentWord = ctaWords.at(-1);
  const ctaLeadText = ctaWords.slice(0, -1).join(" ");

  const notionTools = (await getToolsContent()) as NotionTool[];

  const notionToolGroups =
    notionTools.length > 0
      ? Object.entries(
          notionTools.reduce<Record<string, NotionTool[]>>((acc, tool) => {
            const cat = tool.category || "Other";
            (acc[cat] ??= []).push(tool);
            return acc;
          }, {})
        ).map(([category, tools]) => ({ category, tools }))
      : toolGroups.map((g) => ({
          category: g.category,
          tools: g.tools.map((name) => ({
            name,
            category: g.category,
            iconSlug: "",
            iconUrl: "",
          })),
        }));

  const marqueeRows = groupToolsForMarquee(notionToolGroups);

  return (
    <div className="min-h-screen bg-page text-ink">
      {/* ── Nav ── */}
      <NavBar>
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-lg font-semibold text-ink hover:text-accent transition-colors duration-200"
          >
            Septian
          </Link>
          <div className="hidden sm:flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.14em] text-dim">
            <a href="#about" className="hover:text-ink transition-colors duration-200">About</a>
            <a href="#work" className="hover:text-ink transition-colors duration-200">Work</a>
            <a href="#contact" className="hover:text-ink transition-colors duration-200">Contact</a>
          </div>
        </div>
      </NavBar>

      {/* ── Hero ── */}
      <section className="min-h-screen flex items-center px-6">
        <div className="mx-auto max-w-5xl w-full pt-28 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-[55fr_45fr] gap-10 lg:gap-16 items-center">
            <div className="min-w-0">
              <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-7">
                {hero?.label || "Growth PM · Bali, Indonesia"}
              </p>
              <h1
                className="font-semibold tracking-[-0.01em] leading-[1.1] mb-6 text-ink"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
              >
                {hero?.content || (
                  <>
                    I help products grow —<br />
                    and I use AI to do it faster.
                  </>
                )}
              </h1>
              <p className="text-dim text-base max-w-lg leading-relaxed mb-8">
                {hero?.subtitle ||
                  "Growth PM with 3+ years driving retention, engagement, and revenue at a hospitality tech startup in Indonesia. I connect user behavior to the right intervention, ship faster with AI tools, and own the data behind every decision."}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contact"
                  className="px-6 py-3 bg-[var(--accent)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity duration-200"
                >
                  Let&apos;s talk
                </a>
                <a
                  href="#work"
                  className="px-6 py-3 border border-edge text-ink text-sm font-medium hover:border-[var(--accent)] hover:text-accent transition-colors duration-200"
                >
                  See my work ↓
                </a>
              </div>
            </div>
            <div className="relative w-full max-w-[360px] mx-auto lg:mx-0 aspect-[3/4] bg-[#f0ebe3] border border-[#e8e2d9] overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Septian"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="px-6 py-12 border-t border-edge">
        <div className="mx-auto max-w-5xl">
          <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-6">
            About
          </p>
          <div className="max-w-2xl space-y-5">
            <p className="text-dim text-base leading-relaxed">
              {about?.content ||
                "My work lives at the intersection of product, data, and marketing. At Bobobox, I shipped features across the full AARRR funnel — from email systems that went from 15% to 61.5% open rate, to payment integrations that now handle 31% of all transactions, to a full MMP migration that restored Rp500M/month in attributed revenue visibility."}
            </p>
            <p className="text-dim text-base leading-relaxed">
              {about?.subtitle ||
                "I don’t just use AI as a buzzword. I build with it — Cursor, Claude, Lovable, N8N — to move faster and test smarter."}
            </p>
            <p className="text-ink text-base font-medium">
              {about?.label || "Open to senior Growth PM roles and consulting opportunities."}
            </p>
          </div>
        </div>
      </section>

      {/* ── Impact ── */}
      <section className="px-6 py-10 bg-sheet border-y border-edge">
        <div className="mx-auto max-w-5xl">
          <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-8">
            Impact
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-8">
            {displayMetrics.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-semibold text-ink leading-none mb-2">
                  {stat.value}
                </div>
                <div className="text-dim text-xs uppercase tracking-[0.14em] font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Work ── */}
      <section id="work" className="work-section px-6 py-12 border-b border-edge">
        <div className="mx-auto max-w-5xl">
          <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-6">
            Work
          </p>
          <div className="mb-5">
            <Link
              href="/work/bobobox"
              className="group inline-flex items-baseline gap-2"
            >
              <span className="text-2xl font-normal text-ink group-hover:text-accent transition-colors duration-200">
                {boboboxData.name}
              </span>
              <span className="text-dim text-base group-hover:text-accent transition-colors duration-200">↗</span>
            </Link>
            <p className="text-dim text-sm mt-1 tracking-wide">
              May 2022 – Present · Product Manager → PM Consultant
            </p>
          </div>

          <div className="divide-y divide-edge">
            {boboboxData.projects.map((p) => (
              <Link
                key={p.slug}
                href={`/work/bobobox#${p.slug}`}
                className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 hover:bg-sheet transition-colors duration-200 -mx-4 px-4"
              >
                <span className="text-[13px] font-normal uppercase tracking-[0.16em] text-accent sm:w-32 shrink-0 pt-1">
                  {p.tag}
                </span>
                <div className="flex-1">
                  <span className="text-xl font-normal text-ink group-hover:text-accent transition-colors duration-200 leading-snug block">
                    {p.title}
                  </span>
                  <p className="text-dim text-sm mt-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 pt-5 border-t border-edge">
            <Link
              href="/work/bobobox"
              className="text-sm text-dim hover:text-accent transition-colors duration-200 tracking-wide"
            >
              All projects →
            </Link>
          </div>
        </div>
      </section>

      {/* ── Side Projects ── */}
      <section className="side-projects-section px-6 py-12 border-b border-edge">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/side-projects"
            className="group inline-flex items-center gap-1.5 text-accent text-[11px] font-medium tracking-[0.22em] uppercase mb-6 hover:opacity-75 transition-opacity duration-200"
          >
            Side Projects
            <span className="opacity-60 group-hover:opacity-100 transition-opacity duration-200">→</span>
          </Link>

          <div className="divide-y divide-edge">
            {sideProjectsData.map((p) => (
              <Link
                key={p.title}
                href="/side-projects"
                className="group flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 py-5 hover:bg-sheet transition-colors duration-200 -mx-4 px-4"
              >
                <span className="text-[13px] font-normal uppercase tracking-[0.16em] text-accent sm:w-32 shrink-0 pt-1">
                  {p.tag}
                </span>
                <div className="flex-1">
                  <span className="text-xl font-normal text-ink group-hover:text-accent transition-colors duration-200 leading-snug block">
                    {p.title}
                  </span>
                  <p className="text-dim text-sm mt-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="experience-section px-6 py-12 border-b border-edge">
        <div className="mx-auto max-w-5xl">
          <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-6">
            Experience
          </p>
          <div className="space-y-0 max-w-lg divide-y divide-edge">
            {[
              {
                period: "Nov 2025 – Present",
                role: "PM Consultant",
                company: "Bobobox · Part-time Remote",
              },
              {
                period: "May 2022 – Nov 2025",
                role: "Product Manager",
                company: "Bobobox · Full-time",
              },
            ].map((job) => (
              <div
                key={job.role + job.period}
                className="flex flex-col sm:flex-row sm:gap-12 gap-1 py-5"
              >
                <div className="text-dim text-sm sm:w-44 shrink-0 tabular-nums">
                  {job.period}
                </div>
                <div>
                  <div className="text-ink">{job.role}</div>
                  <div className="text-dim text-sm mt-0.5">{job.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tools ── */}
      <section className="px-6 py-12 border-b border-edge bg-sheet">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-8">
            TOOLS
          </p>
          <div className="space-y-6">
            {marqueeRows[0].length > 0 && (
              <MarqueeRow
                tools={marqueeRows[0]}
                direction="left"
                label="Analytics & CRM"
              />
            )}
            {marqueeRows[1].length > 0 && (
              <MarqueeRow
                tools={marqueeRows[1]}
                direction="right"
                label="AI & Automation"
              />
            )}
            {marqueeRows[2].length > 0 && (
              <MarqueeRow
                tools={marqueeRows[2]}
                direction="left"
                label="Product & CMS"
              />
            )}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="contact" className="px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-semibold tracking-[-0.01em] leading-[1.05] mb-4 text-ink max-w-3xl">
            {ctaLeadText}{" "}
            <span className="text-accent">{ctaAccentWord}</span>
          </h2>
          <p className="text-dim text-lg max-w-md leading-relaxed mb-8">
            {cta?.subtitle ||
              "Open to senior Growth PM roles (remote) and consulting. If you’re working on retention, engagement, or revenue — let’s talk."}
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://www.linkedin.com/in/septian-adi-nugroho"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-[var(--bg)] text-sm font-medium hover:opacity-90 transition-opacity duration-200"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:rodabesi07@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 border border-edge text-ink text-sm font-medium hover:border-[var(--accent)] hover:text-accent transition-colors duration-200"
            >
              rodabesi07@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 border-t border-edge">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/"
            className="font-display text-base font-semibold text-ink hover:text-accent transition-colors duration-200"
          >
            Septian
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="https://linkedin.com/in/septian-adi-nugroho"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-dim hover:text-accent transition-colors duration-200"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:rodabesi07@gmail.com"
              className="text-sm text-dim hover:text-accent transition-colors duration-200"
            >
              rodabesi07@gmail.com
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-5xl mt-4">
          <p className="text-[11px] text-dim tracking-wide">
            © 2026 Septian · Growth PM · Bali, Indonesia
          </p>
        </div>
      </footer>
    </div>
  );
}

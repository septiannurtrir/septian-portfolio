import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { boboboxData } from "@/lib/data";
import ImageCarousel from "./ImageCarousel";
import NavBar from "@/app/components/NavBar";
import {
  getBoboboxContent,
  getBoboboxProjects,
  getBoboboxImages,
} from "@/lib/notion";

export const metadata: Metadata = {
  title: `${boboboxData.name} — Septian`,
  description: boboboxData.hero.subtitle,
};

type BoboboxRow = {
  name: string;
  section: string;
  content: string;
  subtitle: string;
  order: number;
};

type BoboboxProject = {
  name: string;
  tag: string;
  description: string;
  problem: string;
  approach: string;
  solution: string;
  outcomes: string;
  order: number;
};

type BoboboxImage = {
  name: string;
  project: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  order: number;
};

type Slide = { src: string | null; title?: string; subtitle?: string };

type DisplayProject = {
  key: string;
  tag: string;
  title: string;
  description: string;
  problem: string;
  approach: string;
  solution: string;
  outcomes: string;
  slides: Slide[];
};

function TopAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group/top border-b border-edge last:border-0">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between py-6 select-none">
        <span className="font-display text-lg font-normal text-ink pr-4 leading-snug">
          {title}
        </span>
        <span className="text-dim text-lg leading-none w-5 text-center shrink-0">
          <span className="group-open/top:hidden">+</span>
          <span className="hidden group-open/top:inline">−</span>
        </span>
      </summary>
      <div className="pb-7 text-dim text-sm leading-relaxed">{children}</div>
    </details>
  );
}

function SubAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group/sub border-b border-edge last:border-0">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between py-4 select-none">
        <span className="text-ink text-sm pr-4 leading-snug">{title}</span>
        <span className="text-dim text-base leading-none w-4 text-center shrink-0">
          <span className="group-open/sub:hidden">+</span>
          <span className="hidden group-open/sub:inline">−</span>
        </span>
      </summary>
      <div className="pb-5 text-dim text-sm leading-relaxed">{children}</div>
    </details>
  );
}

function Accordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-edge last:border-0">
      <summary className="cursor-pointer list-none [&::-webkit-details-marker]:hidden flex items-center justify-between px-6 py-5 select-none">
        <span className="text-ink text-sm leading-snug pr-4">
          {title}
        </span>
        <span className="text-dim text-lg leading-none w-5 text-center shrink-0">
          <span className="group-open:hidden">+</span>
          <span className="hidden group-open:inline">−</span>
        </span>
      </summary>
      <div className="px-6 pb-6 text-dim text-sm leading-relaxed">
        {children}
      </div>
    </details>
  );
}

function AccordionGroup({ children }: { children: React.ReactNode }) {
  return (
    <div className="border border-edge">
      {children}
    </div>
  );
}


export default async function BoboboxPage() {
  const [rawContent, rawProjects, rawImages] = await Promise.all([
    getBoboboxContent(),
    getBoboboxProjects(),
    getBoboboxImages(),
  ]);

  const content = rawContent as BoboboxRow[];
  const notionProjects = rawProjects as BoboboxProject[];
  const notionImages = rawImages as BoboboxImage[];

  // Group images by project name
  const imagesByProject: Record<string, Slide[]> = {};
  for (const img of notionImages) {
    (imagesByProject[img.project] ??= []).push({
      src: img.imageUrl || null,
      title: img.title,
      subtitle: img.subtitle,
    });
  }

  // Hero
  const heroRow = content.find((r) => r.section === "Hero");
  const heroTitle = heroRow?.name || boboboxData.hero.title;
  const heroSubtitle = heroRow?.subtitle || '';

  // About
  const aboutRow = content.find((r) => r.section === "About");
  const aboutText = aboutRow?.content || boboboxData.about;

  // Role
  const roleRows = content.filter((r) => r.section === "Role");
  const roleItems =
    roleRows.length > 0
      ? roleRows.map((r) => ({ title: r.name, content: r.content }))
      : boboboxData.responsibilities;

  // Experience
  const experienceRows = content.filter((r) => r.section === "Experience");
  const experienceItems =
    experienceRows.length > 0
      ? experienceRows.map((r) => ({ title: r.name, content: r.content }))
      : boboboxData.experience;

  // Impact
  const impactRows = content.filter((r) => r.section === "Impact");
  const impactItems =
    impactRows.length > 0
      ? impactRows.map((r) => ({ title: r.name, content: r.content }))
      : boboboxData.impact;

  // Projects
  const displayProjects: DisplayProject[] =
    notionProjects.length > 0
      ? notionProjects.map((p) => ({
          key: p.name,
          tag: p.tag,
          title: p.name,
          description: p.description,
          problem: p.problem,
          approach: p.approach,
          solution: p.solution,
          outcomes: p.outcomes,
          slides: imagesByProject[p.name] ?? [],
        }))
      : boboboxData.projects.map((p) => ({
          key: p.slug,
          tag: p.tag,
          title: p.title,
          description: p.description,
          problem: p.problem,
          approach: p.approach,
          solution: p.solution,
          outcomes: p.outcomes,
          slides: p.images.map((img) => ({
            src: img.src,
            title: img.title,
            subtitle: img.caption,
          })),
        }));

  return (
    <div className="min-h-screen bg-page text-ink">
      {/* ── Nav ── */}
      <NavBar>
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="text-sm text-dim hover:text-accent transition-colors duration-200"
          >
            ← Septian Rachmadi
          </Link>
          <span className="text-sm text-dim">{boboboxData.name}</span>
        </div>
      </NavBar>

      {/* ── Hero ── */}
      <section className="pt-32 pb-12 px-6">
        <div className="mx-auto max-w-5xl">
          <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-6">
            {boboboxData.name}
          </p>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.01em] leading-[1.08] mb-6 max-w-3xl text-ink">
            {heroTitle}
          </h1>
          {heroSubtitle && (
            <p className="text-dim text-lg md:text-xl leading-relaxed max-w-2xl mb-10">
              {heroSubtitle}
            </p>
          )}
          <div className="relative w-full aspect-video">
            <Image src="/images/bobobox-hero.jpg" alt="Bobobox" fill className="object-cover object-center" />
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section className="px-6 py-12 border-t border-edge">
        <div className="mx-auto max-w-3xl">
          <p className="font-display text-xl text-dim leading-relaxed text-center">
            {aboutText}
          </p>
        </div>
      </section>

      {/* ── Role / Experience / Impact ── */}
      <section className="border-t border-edge">
        <div className="mx-auto max-w-5xl px-6">
          <TopAccordion title="Role &amp; Responsibilities">
            <div className="pl-4 border-l border-edge">
              {roleItems.map((item) => (
                <SubAccordion key={item.title} title={item.title}>
                  {item.content}
                </SubAccordion>
              ))}
            </div>
          </TopAccordion>

          <TopAccordion title="Experience">
            <div className="pl-4 border-l border-edge">
              {experienceItems.map((item) => (
                <SubAccordion key={item.title} title={item.title}>
                  {item.content}
                </SubAccordion>
              ))}
            </div>
          </TopAccordion>

          <TopAccordion title="Impact">
            <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: "12px" }}>
              {impactItems.map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: "#f0ebe3",
                    border: "0.5px solid #e8e2d9",
                    borderRadius: "8px",
                    padding: "16px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "10px",
                      fontWeight: 500,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      color: "#8B1A1A",
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {item.title}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {item.content.split("\n").filter(Boolean).map((metric, i) => (
                      <p key={i} style={{ fontSize: "13px", color: "#6b5f58", margin: 0 }}>
                        {metric}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TopAccordion>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section className="px-6 py-16 border-t border-edge">
        <div className="mx-auto max-w-5xl">
          <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-12">
            Featured Projects
          </p>

          <div className="space-y-20">
            {displayProjects.map((project, index) => {
              const isEven = index % 2 === 1;
              return (
                <article
                  key={project.key}
                  id={project.key}
                  className="scroll-mt-24"
                >
                  <p className="text-dim text-[11px] font-medium tracking-[0.22em] uppercase mb-3">
                    {project.tag}
                  </p>
                  <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-semibold tracking-[-0.01em] mb-10 text-ink">
                    {project.title}
                  </h2>

                  <div
                    className={`flex flex-col md:flex-row gap-10 items-start ${
                      isEven ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <div className="w-full md:w-1/2">
                      <ImageCarousel images={project.slides} />
                    </div>
                    <div className="w-full md:w-1/2 md:pt-1">
                      <p className="text-dim text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10">
                    <AccordionGroup>
                      <Accordion title="Problem">{project.problem}</Accordion>
                      <Accordion title="Approach">{project.approach}</Accordion>
                      <Accordion title="Solution">{project.solution}</Accordion>
                      <Accordion title="Outcomes">{project.outcomes}</Accordion>
                    </AccordionGroup>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 border-t border-edge mt-10">
        <div className="mx-auto max-w-5xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <Link
            href="/"
            className="font-display text-base font-semibold text-ink hover:text-accent transition-colors duration-200"
          >
            Septian Rachmadi
          </Link>
          <div className="flex items-center gap-6">
            <a
              href="https://www.linkedin.com/in/septian-nur-tri-r-696b23150"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-dim hover:text-accent transition-colors duration-200"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:septiannurtrir@gmail.com"
              className="text-sm text-dim hover:text-accent transition-colors duration-200"
            >
              septiannurtrir@gmail.com
            </a>
          </div>
        </div>
        <div className="mx-auto max-w-5xl mt-4">
          <p className="text-[11px] text-dim tracking-wide">© 2026 SNTR</p>
        </div>
      </footer>
    </div>
  );
}

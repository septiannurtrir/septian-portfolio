import Link from "next/link";
import type { Metadata } from "next";
import { sideProjectsData } from "@/lib/data";
import ImageCarousel from "@/app/work/bobobox/ImageCarousel";
import NavBar from "@/app/components/NavBar";
import { getSideProjects, getSideProjectImages } from "@/lib/notion";

export const metadata: Metadata = {
  title: "Side Projects — Septian",
  description:
    "Personal experiments in automation, AI tooling, and product design.",
};

type SideProject = {
  title: string;
  tag?: string;
  subtitle?: string;
  description: string;
  images: { src: string | null; title?: string; subtitle?: string }[];
};

type NotionSideProject = {
  name: string;
  tag: string;
  subtitle: string;
  description: string;
  order: number;
};

type NotionSideProjectImage = {
  name: string;
  project: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  order: number;
};

export default async function SideProjectsPage() {
  const [rawProjects, rawImages] = await Promise.all([
    getSideProjects(),
    getSideProjectImages(),
  ]);

  const notionProjects = rawProjects as NotionSideProject[];
  const notionImages = rawImages as NotionSideProjectImage[];

  const imagesByProject: Record<string, SideProject["images"]> = {};
  for (const img of notionImages) {
    (imagesByProject[img.project] ??= []).push({
      src: img.imageUrl || null,
      title: img.title,
      subtitle: img.subtitle,
    });
  }

  const projects: SideProject[] =
    notionProjects.length > 0
      ? notionProjects.map((p) => ({
          title: p.name,
          tag: p.tag,
          subtitle: p.subtitle,
          description: p.description,
          images: imagesByProject[p.name] ?? [],
        }))
      : (sideProjectsData as SideProject[]);

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
          <span className="text-sm text-dim">Side Projects</span>
        </div>
      </NavBar>

      {/* ── Page Hero ── */}
      <section className="pt-32 pb-16 px-6 border-b border-edge">
        <div className="mx-auto max-w-5xl">
          <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-6">
            Side Projects
          </p>
          <h1 className="text-[clamp(2rem,5vw,4rem)] font-semibold tracking-[-0.01em] leading-[1.08] mb-5 text-ink">
            Things I build outside work
          </h1>
          <p className="text-dim text-lg max-w-2xl leading-relaxed">
            Personal experiments in automation, AI tooling, and product design.
            Built the same way I build at work — fast, data-informed, and with
            AI in the loop.
          </p>
        </div>
      </section>

      {/* ── Projects ── */}
      <div className="px-6">
        <div className="mx-auto max-w-5xl divide-y divide-edge">
          {projects.map((project, projectIndex) => {
            const isReversed = projectIndex % 2 === 1;
            return (
              <article key={project.title} className="py-16">
                <div
                  className={`flex flex-col md:flex-row gap-10 md:gap-14 items-start${
                    isReversed ? " md:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image / Carousel — 55% */}
                  <div className="w-full md:w-[55%] shrink-0">
                    <ImageCarousel images={project.images} />
                  </div>

                  {/* Text — 45% */}
                  <div className="w-full md:flex-1 md:pt-1">
                    {project.tag && (
                      <p className="text-accent text-[11px] font-medium uppercase tracking-[0.22em] mb-4">
                        {project.tag}
                      </p>
                    )}
                    <h2 className="font-display text-[clamp(1.5rem,3.5vw,2.5rem)] font-semibold tracking-[-0.01em] leading-[1.1] mb-3 text-ink">
                      {project.title}
                    </h2>
                    {project.subtitle && (
                      <p className="text-accent text-base leading-snug mb-4">
                        {project.subtitle}
                      </p>
                    )}
                    <p className="text-dim text-base leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="px-6 py-8 border-t border-edge">
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

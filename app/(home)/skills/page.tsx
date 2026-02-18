import type { Metadata } from "next";
import Link from "next/link";
import { SkillsGrid } from "@/components/skills-grid";
import { skills, categoryMeta, GITHUB_REPO } from "@/lib/skills-data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { InstallBlock } from "./install-block";

export const metadata: Metadata = {
  title: "Community Skills",
  description:
    "Browse 35+ community-built skills that extend Claude Code with specialized knowledge for Rust, frontend frameworks, 3D shaders, and more.",
};

const totalRefs = skills.reduce((acc, s) => acc + s.references, 0);

export default function SkillsPage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col items-center overflow-hidden px-4 py-10 sm:px-6 sm:py-16">
      {/* Hero */}
      <div className="mb-10 w-full max-w-2xl text-center sm:mb-16">
        <p className="mb-3 font-mono text-sm tracking-widest text-primary uppercase">
          Open Source
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Community Skills
        </h1>
        <p className="mb-6 text-base text-fd-muted-foreground sm:text-lg">
          Extend Claude Code with specialized knowledge — curated skills for
          Rust, frontend frameworks, 3D shaders, and more.
        </p>

        {/* Stats */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-sm text-muted-foreground sm:gap-x-6">
          <span>
            <span className="text-foreground font-semibold">
              {skills.length}
            </span>{" "}
            skills
          </span>
          <span className="text-border">|</span>
          <span>
            <span className="text-foreground font-semibold">{totalRefs}</span>{" "}
            references
          </span>
          <span className="text-border">|</span>
          <span>
            <span className="text-foreground font-semibold">{Object.keys(categoryMeta).length}</span> categories
          </span>
        </div>

        {/* Install hint */}
        <InstallBlock command={`npx skills add ${GITHUB_REPO}`} />

        <Button
          size="lg"
          render={
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
            />
          }
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="size-4"
            aria-hidden="true"
          >
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
          </svg>
          View on GitHub
        </Button>
      </div>

      {/* Section divider */}
      <div className="w-full max-w-5xl">
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Skills Grid */}
      <div className="mt-10 w-full max-w-5xl sm:mt-16">
        <SkillsGrid />
      </div>

      {/* Footer CTA */}
      <div className="mt-10 w-full max-w-5xl sm:mt-16">
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
        <div className="mx-auto max-w-xl py-10 text-center sm:py-16">
          <h2 className="mb-3 text-xl font-semibold">Build your own skill</h2>
          <p className="mb-6 text-sm text-muted-foreground sm:text-base">
            Skills are open source and community-driven. Create a skill to share
            specialized knowledge with Claude Code users everywhere.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              className="w-full sm:w-auto"
              render={<Link href="/docs/skills/create-skill" />}
            >
              Create a Skill
            </Button>
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              render={
                <a
                  href={GITHUB_REPO}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
              </svg>
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}

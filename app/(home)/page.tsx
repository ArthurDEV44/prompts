import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const GITHUB_URL = 'https://github.com/ArthurDEV44/claude-craft';

const categories = [
  {
    title: 'PRD & Planning',
    description: 'Generate and review Product Requirements Documents',
    href: '/docs/prd-planning/ux-redesign-prd',
    items: [
      'UX Redesign PRD',
      'Design Exploration PRD',
      'GitHub Issue PRD',
      'Review PRD',
      'Implement PRD',
    ],
  },
  {
    title: 'Code Quality',
    description: 'Optimize, refactor, audit, and debug your code',
    href: '/docs/code-quality/optimize-code',
    items: ['Optimize Code', 'Refactor Code', 'Security Audit', 'Debug Error'],
  },
  {
    title: 'Design',
    description: 'Review and improve component design with professional inspiration',
    href: '/docs/design/design-review-component',
    items: ['Design Review Component'],
  },
  {
    title: 'DevOps & Migration',
    description: 'Build, deploy, rename, and migrate your stack',
    href: '/docs/devops/pull-build-deploy',
    items: ['Pull Build Deploy', 'Rename Codebase', 'Migrate Stack'],
  },
  {
    title: 'Skills',
    description: 'Create and update Claude Code skills',
    href: '/docs/skills/create-skill',
    items: ['Create Skill', 'Update Skill'],
  },
  {
    title: 'Community Skills',
    description: 'Browse 35+ ready-to-install skills for Rust, frontend, 3D, and more',
    href: '/skills',
    items: ['Rust Ecosystem', 'Frontend Frameworks', '3D & Shaders', 'Dev Tools'],
  },
];

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.97 4.78a.75.75 0 0 1 1.06-1.06l4 4a.75.75 0 0 1 0 1.06l-4 4a.75.75 0 0 1-1.06-1.06l2.47-2.47H2.75A.75.75 0 0 1 2 8Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col items-center overflow-x-hidden">
      {/* Hero */}
      <section className="relative flex w-full flex-col items-center px-4 pb-16 pt-16 text-center sm:px-6 sm:pt-24">
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[500px] overflow-hidden">
          <div className="absolute left-1/2 top-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.07] blur-[100px]" />
        </div>

        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-sm font-medium tracking-widest text-primary/80 uppercase">
            Prompt Templates for Claude Code
          </p>
          <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Claude Craft
          </h1>
          <p className="mb-6 text-lg text-fd-muted-foreground">
            Ship faster with ready-made prompts — PRD generation, code review,
            design audits, security scans, and more. Copy, paste, done.
          </p>

          {/* Stats */}
          <div className="mb-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 font-mono text-sm text-muted-foreground sm:gap-x-6">
            <span>
              <span className="font-semibold text-foreground">15</span> prompts
            </span>
            <span className="text-border">|</span>
            <span>
              <span className="font-semibold text-foreground">5</span>{' '}
              categories
            </span>
            <span className="text-border">|</span>
            <span>
              <span className="font-semibold text-foreground">FR/EN</span>{' '}
              bilingual
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button size="lg" className="w-full sm:w-auto" render={<Link href="/docs" />}>
              Browse Prompts
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto"
              render={
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
            >
              <GitHubIcon className="size-4" />
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full max-w-5xl px-4 sm:px-6">
        <Separator className="bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>

      {/* Section heading */}
      <div className="mt-10 max-w-2xl px-4 text-center sm:mt-16 sm:px-6">
        <h2 className="mb-2 text-2xl font-semibold">Explore by Category</h2>
        <p className="text-fd-muted-foreground">
          Pick a workflow to get started, or browse all prompts in the docs.
        </p>
      </div>

      {/* Card grid */}
      <div className="mt-8 grid w-full max-w-5xl gap-4 px-4 sm:mt-10 sm:gap-6 sm:px-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Link
            key={cat.title}
            href={cat.href}
            className="group rounded-2xl outline-none motion-safe:animate-fade-up focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <Card className="h-full transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{cat.title}</CardTitle>
                <CardDescription>{cat.description}</CardDescription>
              </CardHeader>
              <CardPanel>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {cat.items.map((item) => (
                    <li key={item} className="before:mr-2 before:content-['·']">
                      {item}
                    </li>
                  ))}
                </ul>
              </CardPanel>
              <div className="flex items-center px-6 pb-5 pt-2">
                <span className="inline-flex items-center gap-1 text-sm font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  Explore
                  <ArrowRightIcon className="size-3.5" />
                </span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-16 w-full border-t px-4 py-8 sm:mt-20 sm:px-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            Built by Arthur Strivex
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://strivex.fr/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              strivex.fr
            </a>
            <a
              href="https://github.com/ArthurDEV44"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <GitHubIcon className="size-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/arthur-jean-strivex/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 16 16"
                fill="currentColor"
                className="size-4"
                aria-hidden="true"
              >
                <path d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14ZM4.67 5.715a1.037 1.037 0 0 1-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032Zm.889 6.51h-1.78V6.498h1.78v5.727ZM13.11 2H2.885A.88.88 0 0 0 2 2.866v10.268a.88.88 0 0 0 .885.866h10.226a.882.882 0 0 0 .889-.866V2.865A.88.88 0 0 0 13.111 2Z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

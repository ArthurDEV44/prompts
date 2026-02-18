import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardPanel,
  CardTitle,
} from '@/components/ui/card';

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
    description: 'Review and improve component design with inspiration',
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
];

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-16 text-center">
      <div className="max-w-2xl">
        <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Claude Code Prompts
        </h1>
        <p className="mb-8 text-lg text-fd-muted-foreground">
          Bilingual (FR/EN) copy-paste prompt templates for Claude Code,
          leveraging skills, MCP servers, and agent swarms.
        </p>
        <Button size="lg" render={<Link href="/docs" />}>
          Browse Prompts
        </Button>
      </div>

      <div className="mt-16 grid w-full max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <Card
            key={cat.title}
            render={<Link href={cat.href} />}
            className="group text-left transition-colors hover:bg-accent/10"
          >
            <CardHeader>
              <CardTitle>{cat.title}</CardTitle>
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
          </Card>
        ))}
      </div>
    </main>
  );
}

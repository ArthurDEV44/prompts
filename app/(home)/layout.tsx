import { HomeLayout } from 'fumadocs-ui/layouts/home';
import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <HomeLayout
      nav={{
        title: 'Claude Code Prompts',
      }}
      links={[
        {
          text: 'Documentation',
          url: '/docs',
        },
        {
          text: 'GitHub',
          url: 'https://github.com/arthumusic/prompts',
          external: true,
        },
      ]}
    >
      {children}
    </HomeLayout>
  );
}

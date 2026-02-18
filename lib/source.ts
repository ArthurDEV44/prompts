import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';
import type { MDXContent } from 'mdx/types';
import type { TOCItemType } from 'fumadocs-core/toc';
import type { StructuredData } from 'fumadocs-core/mdx-plugins';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

export interface DocsPageData {
  title: string;
  description?: string;
  full?: boolean;
  body: MDXContent;
  toc: TOCItemType[];
  structuredData: StructuredData;
}

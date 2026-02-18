import { docs } from '@/.source';
import { loader } from 'fumadocs-core/source';

const mdxSource = docs.toFumadocsSource();

// Resolve files: fumadocs-mdx returns files as a function, fumadocs-core expects an array
const files = typeof mdxSource.files === 'function'
  ? (mdxSource.files as unknown as () => typeof mdxSource.files)()
  : mdxSource.files;

export const source = loader({
  baseUrl: '/docs',
  source: { files },
});

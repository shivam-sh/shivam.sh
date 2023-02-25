import { getProjectsMetadata } from 'generation/projects';
import matter from 'gray-matter';
import remarkBehead from 'remark-behead';
import remarkGfm from 'remark-gfm';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export default async function Project({ params }) {
  const source = await generatePageSource(params);
  return (
    <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
  );
}

export async function generateStaticParams() {
  const posts = await getProjectsMetadata();

  return posts.map((post) => ({
    project: post.url.split('/').pop(),
  }));
}

async function generatePageSource({ project }) {
  const post = await fetch(
    `${process.env.CDN_URL}/projects/${project}/post.md`
  ).then((res) => res.text());
  const { content } = matter(post);

  const markdown = await unified()
    .use(remarkParse)
    .use(remarkBehead, { minDepth: 3 })
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(content);

  return String(markdown);
}

import { getPostsMetadata } from 'generation/blog-posts';
import matter from 'gray-matter';
import remarkBehead from 'remark-behead';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export default async function Page({ params }) {
  const source = await generatePageSource(params);
  return (
    <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
  );
}

export async function generateStaticParams() {
  const posts = await getPostsMetadata();

  return posts.map((post) => ({
    year: new Date(post.date).getFullYear().toString(),
    blogPost: post.url.split('/').pop(),
  }));
}

async function generatePageSource({ year, blogPost }) {
  const post = await fetch(
    `${process.env.CDN_URL}/blog/${year}/${blogPost}/post.md`
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

import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export async function parseMarkdown(mdString: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(mdString);
}

export async function fetchPosts() {
  return await fetch(`${process.env.CDN_URL}/blog-posts.json`)
    .then((res) => res.json())
    .then((data) => data.posts);
}

export async function fetchProjects() {
  return await fetch(`${process.env.CDN_URL}/projects.json`)
    .then((res) => res.json())
    .then((data) => data.projects);
}

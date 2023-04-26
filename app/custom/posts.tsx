import { load } from 'cheerio';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import { unified } from 'unified';

export async function parseMarkdown(mdString: string) {
  return await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeSlug)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(mdString);
}

export async function parseTOC(htmlString: string) {
  const $ = load(htmlString);
  const headings: { id: string; text: string; depth: number }[] = [];

  $('[id]').each((_, element) => {
    const id = $(element).attr('id') ?? '';
    const text = $(element).text() ?? '';

    if (id !== '' && element.tagName.toLowerCase().startsWith('h')) {
      const depth = element.tagName.charCodeAt(1) - 48;
      headings.push({ id, text, depth });
    }
  });
  return headings;
}

export async function fetchPosts() {
  return await fetch(`${process.env.CDN_URL}/posts.json`, {
    next: { revalidate: 600 },
  })
    .then((res) => res.json())
    .then((data) => data.posts)
    .catch(() => {
      return [];
    });
}

export async function fetchPost(year: number, postName: string) {
  const markdown = await fetch(
    `${process.env.CDN_URL}/posts/${year}/${postName}/post.md`,
    { next: { revalidate: 600 } }
  ).then((res) => res.text());

  return matter(markdown);
}

export async function fetchPostTOC(year: number, postName: string) {
  const markdown = await fetch(
    `${process.env.CDN_URL}/posts/${year}/${postName}/post.md`,
    { next: { revalidate: 600 } }
  ).then((res) => res.text());

  return parseTOC(markdown);
}

export async function fetchProjects() {
  return await fetch(`${process.env.CDN_URL}/projects.json`, {
    next: { revalidate: 600 },
  })
    .then((res) => res.json())
    .then((data) => data.projects)
    .catch(() => {
      return [];
    });
}

export async function fetchProject(projectName: string) {
  const markdown = await fetch(
    `${process.env.CDN_URL}/projects/${projectName}/post.md`,
    {
      next: { revalidate: 600 },
    }
  ).then((res) => res.text());

  return matter(markdown);
}

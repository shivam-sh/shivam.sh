import matter from 'gray-matter';
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

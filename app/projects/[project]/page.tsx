import { fetchProjects, parseMarkdown } from 'generation/posts';
import matter from 'gray-matter';

export default async function Project({ params }) {
  const source = await generatePageSource(params);
  return (
    <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
  );
}

export async function generateStaticParams() {
  const projects = await fetchProjects();

  return projects.map((project) => ({
    project: project.url.split('/').pop(),
  }));
}

async function generatePageSource({ project }) {
  const post = await fetch(
    `${process.env.CDN_URL}/projects/${project}/post.md`
  ).then((res) => res.text());

  const { content } = matter(post);
  const markdown = await parseMarkdown(content);
  return String(markdown);
}

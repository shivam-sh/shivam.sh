import { fetchProject, fetchProjects, parseMarkdown } from 'generation/posts';

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
  const { content } = await fetchProject(project);
  const markdown = await parseMarkdown(content);
  return String(markdown);
}

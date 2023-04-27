import { fetchProject, fetchProjects, parseMarkdown } from 'app/custom/posts';
import { Metadata } from 'next';

export default async function Page({ params }) {
  const source = await generatePageSource(params);
  return (
    <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
  );
}

export async function generateMetadata({ params: { project } }): Promise<Metadata> {
  const { data } = await fetchProject(project);
  const siteURL = process.env.SITE_URL || process.env.VERCEL_URL;

  return {
    title: data.title ?? 'Project not found',
    description:
      data.description ?? 'The project you are looking was not found',
    openGraph: {
      siteName: 'Shivam Sh',
      title: data.title ?? 'Project not found',
      description:
        data.description ?? 'The project you are looking for was not found',
      url: `/projects/${project}`,
      images: [
        {
          url: `${data.image}`,
          alt: data.title ?? 'Project not found',
        },
      ],
    },
  };
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

import { fetchProject, fetchProjects } from 'app/lib/server/ghostData';
import { rehypeHTML } from 'app/lib/server/postProcessing';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PageData = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: PageData) {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (project === '') return notFound();
  const source = String(await rehypeHTML(project.html));

  return <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />;
}

export const revalidate = 60;

export async function generateMetadata({ params }: PageData): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);

  return {
    title: project.title ?? 'Project not found',
    description: project.excerpt ?? 'The project you are looking was not found',
    openGraph: {
      siteName: 'Shivam Sh',
      title: project.title ?? 'Project not found',
      description: project.excerpt ?? 'The project you are looking for was not found',
      url: `/projects/${slug}`,
      images: [
        {
          url: `${project.featureImage}`,
          alt: project.title ?? 'Project not found'
        }
      ]
    }
  };
}

export async function generateStaticParams() {
  const projects = await fetchProjects();

  return projects.map((project) => ({
    project: project.slug
  }));
}

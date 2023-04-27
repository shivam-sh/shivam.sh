import { fetchProject, fetchProjects, rehypeHTML } from 'app/custom/posts';
import { Metadata } from 'next';

export default async function Page({ params }) {
  const post = await fetchProject(params.slug);
  const source = String(await rehypeHTML(post.html));
  return (
    <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
  );
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const project = await fetchProject(slug);

  return {
    title: project.title ?? 'Project not found',
    description:
    project.excerpt ?? 'The project you are looking was not found',
    openGraph: {
      siteName: 'Shivam Sh',
      title: project.title ?? 'Project not found',
      description:
      project.excerpt ?? 'The project you are looking for was not found',
      url: `/projects/${slug}`,
      images: [
        {
          url: `${project.feature_image}`,
          alt: project.title ?? 'Project not found',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const projects = await fetchProjects();

  return projects.map((project) => ({
    project: project.slug,
  }));
}

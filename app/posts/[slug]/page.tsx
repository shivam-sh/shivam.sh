import { EntryDates } from 'app/components/EntryDate';
import { fetchPost, fetchPosts, fetchProject } from 'app/lib/server/ghostData';
import { parseTOC, rehypeHTML } from 'app/lib/server/postProcessing';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 60;
// Slugs missing from generateStaticParams (e.g. Ghost was down at build) render on demand
export const dynamicParams = true;

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return notFound();

  // post is shared with generateMetadata through cache(), so don't mutate it
  let html = post.html;
  if (post.inline && post.title != '(Untitled)') {
    html = `<h1 id="${post.title}">${post.title}</h1>` + html;
  }

  const source = String(await rehypeHTML(html));
  let toc = await parseTOC(source);
  const project = post.projectSlug ? await fetchProject(post.projectSlug) : null;

  return (
    <>
      <div className="toc">
        {toc.map((entry) => {
          return (
            <Link
              href={`/posts/${slug}/#${entry.id}`}
              replace={true}
              className="tocLink"
              key={entry.id}
            >
              <p>{entry.text}</p>
            </Link>
          );
        })}
      </div>
      <div className="postMeta">
        <p className="caption">
          <EntryDates publishedAt={post.publishedAt} updatedAt={post.updatedAt} />
        </p>
        {project ? (
          <p className="caption">
            Part of <Link href={`/projects/${post.projectSlug}`}>{project.title}</Link>
          </p>
        ) : null}
      </div>
      <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
    </>
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);

  return {
    title: post?.title ?? 'Post not found',
    description: post?.excerpt ?? 'The post you are looking was not found',
    openGraph: {
      siteName: 'Shivam Sh',
      title: post?.title ?? 'Post not found',
      description: post?.excerpt ?? 'The post you are looking for was not found',
      url: `/posts/${slug}`,
      images: [
        {
          url: `${post?.featureImage}`,
          alt: post?.title ?? 'Post not found'
        }
      ]
    }
  };
}

export async function generateStaticParams() {
  try {
    const posts = await fetchPosts();
    return posts.map((post) => ({
      slug: post.slug
    }));
  } catch (error) {
    // Don't fail the deploy if Ghost is down; posts render on demand (dynamicParams) instead
    console.warn(`[posts] Ghost unreachable, skipping static params: ${error?.message ?? error}`);
    return [];
  }
}

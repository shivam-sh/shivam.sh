import { fetchPost, fetchPosts } from 'app/lib/server/ghostData';
import { parseTOC, rehypeHTML } from 'app/lib/server/postProcessing';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function Page({ params }) {
  const post = await fetchPost(params.slug);
  if (post === '') return notFound();

  if (post.inline && post.title != '(Untitled)') {
    post.html = `<h1 id="${post.title}">${post.title}</h1>` + post.html;
  }

  const source = String(await rehypeHTML(post.html));
  let toc = await parseTOC(source);

  return (
    <>
      <div className="toc">
        {toc.map((entry) => {
          return (
            <Link
              href={`/posts/${params.slug}/#${entry.id}`}
              replace={true}
              className="tocLink"
              key={entry.id}
            >
              <p>{entry.text}</p>
            </Link>
          );
        })}
      </div>
      <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
    </>
  );
}

export async function generateMetadata({ params: { slug } }): Promise<Metadata> {
  const post = await fetchPost(slug);

  return {
    title: post.title ?? 'Post not found',
    description: post.excerpt ?? 'The post you are looking was not found',
    openGraph: {
      siteName: 'Shivam Sh',
      title: post.title ?? 'Post not found',
      description: post.excerpt ?? 'The post you are looking for was not found',
      url: `/posts/${slug}`,
      images: [
        {
          url: `${post.featureImage}`,
          alt: post.title ?? 'Post not found'
        }
      ]
    }
  };
}

export async function generateStaticParams() {
  const posts = await fetchPosts();

  return posts.map((post) => ({
    slug: post.slug
  }));
}

import { fetchWithID } from 'app/lib/server/ghostData';
import { parseTOC, rehypeHTML } from 'app/lib/server/postProcessing';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 1;

type PageData = {
  params: Promise<{
    id: string
  }>
}

export default async function Page({ params }: PageData) {
const { id } = await params;
  const post = await fetchWithID(id);
  if (post === '') return notFound();

  if (post.inline && post.title != '(Untitled)') {
    post.html = `<h1 id="${post.title}">${post.title}</h1>` + post.html;
  }

  const source = String(await rehypeHTML(post.html));
  const toc = await parseTOC(source);

  return (
    <>
      <div className="toc">
        {toc.map((entry) => {
          return (
            <Link
              href={`posts/${id}/#${entry.id}`}
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

export async function generateMetadata({ params }: PageData): Promise<Metadata> {
  const { id } = await params;
  const post = await fetchWithID(id);

  return {
    title: post.title ?? 'Post not found',
    description: post.excerpt ?? 'The post you are looking was not found',
    openGraph: {
      siteName: 'Shivam Sh',
      title: post.title ?? 'Post not found',
      description: post.excerpt ?? 'The post you are looking for was not found',
      url: `/posts/${id}`,
      images: [
        {
          url: `${post.featureImage}`,
          alt: post.title ?? 'Post not found'
        }
      ]
    }
  };
}

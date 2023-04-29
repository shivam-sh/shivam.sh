import { fetchWithID, parseTOC, rehypeHTML } from 'app/custom/posts';
import Link from 'next/link';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const revalidate = 1;

export default async function Page({ params }) {
  const post = await fetchWithID(params.id);
  if (post === '') return notFound();

  if (
    post.tags.some((tag) => tag.name === '#inline') &&
    post.title != '(Untitled)'
  ) {
    post.html = `<h1 id="${post.title}">${post.title}</h1>` + post.html;
  }

  const source = String(await rehypeHTML(post.html));
  const toc = (await parseTOC(source)).filter((entry) => entry.depth <= 2);

  return (
    <>
      <div className="toc">
        {toc.map((entry) => {
          return (
            <Link
              href={`posts/${params.id}/#${entry.id}`}
              replace={true}
              className="tocLink"
              key={entry.id}
            >
              <p>{entry.text}</p>
            </Link>
          );
        })}
      </div>
      <div
        className="postContent"
        dangerouslySetInnerHTML={{ __html: source }}
      />
    </>
  );
}

export async function generateMetadata({ params: { id } }): Promise<Metadata> {
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
          url: `${post.feature_image}`,
          alt: post.title ?? 'Post not found',
        },
      ],
    },
  };
}

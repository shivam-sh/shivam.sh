import {
  fetchPost,
  fetchPosts,
  parseMarkdown,
  parseTOC,
} from 'app/custom/posts';
import Link from 'next/link';
import { Metadata } from 'next';

export default async function Page({ params }) {
  const source = await generatePageSource(params);
  const toc = (await parseTOC(source)).filter((entry) => entry.depth <= 2);

  return (
    <>
      <div className="toc">
        {toc.map((entry) => {
          return (
            <Link
              href={`${params.year}/${params.post}/#${entry.id}`}
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

export async function generateMetadata({
  params: { year, post },
}): Promise<Metadata> {
  const { data } = await fetchPost(year, post);
  const siteURL = process.env.SITE_URL || process.env.VERCEL_URL;

  return {
    title: data.title ?? 'Post not found',
    description: data.description ?? 'The post you are looking was not found',
    openGraph: {
      siteName: 'Shivam Sh',
      title: data.title ?? 'Post not found',
      description:
        data.description ?? 'The post you are looking for was not found',
      url: `/${year}/${post}`,
      images: [
        {
          url: `${data.image}`,
          alt: data.title ?? 'Post not found',
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await fetchPosts();

  return posts.map((post) => ({
    year: new Date(post.date).getFullYear().toString(),
    post: post.path.split('/').pop(),
  }));
}

async function generatePageSource({ year, post }) {
  const { content } = await fetchPost(year, post);
  const markdown = await parseMarkdown(content);
  return String(markdown);
}

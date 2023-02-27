import { fetchPost, fetchPosts, parseMarkdown } from 'generation/posts';
import { Metadata } from 'next';

export default async function Page({ params }) {
  const source = await generatePageSource(params);
  return (
    <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
  );
}

export async function generateMetadata({ params: { year, post } }): Promise<Metadata> {
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

import { fetchPost, fetchPosts, parseMarkdown } from 'generation/posts';
import matter from 'gray-matter';

export default async function Page({ params }) {
  const source = await generatePageSource(params);
  return (
    <div className="postContent" dangerouslySetInnerHTML={{ __html: source }} />
  );
}

export async function generateStaticParams() {
  const posts = await fetchPosts();

  return posts.map((post) => ({
    year: new Date(post.date).getFullYear().toString(),
    blogPost: post.path.split('/').pop(),
  }));
}

async function generatePageSource({ year, blogPost }) {
  const post = await fetchPost(year, blogPost);
  const { content } = matter(post);
  const markdown = await parseMarkdown(content);
  return String(markdown);
}

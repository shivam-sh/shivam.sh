import { fetchPost } from 'generation/posts';

export default async function Head({ params: { year, blogPost } }) {
  const { data } = await fetchPost(year, blogPost);
  const siteURL = process.env.SITE_URL || process.env.VERCEL_URL;

  return (
    <>
      <title>{data.title}</title>
      <meta property="og:url" content={`${siteURL}/${year}/${blogPost}`} />
      <meta property="og:image" content={`${data.image}`} />
      <meta property="og:site_name" content="Shivam Sh" />
      <meta property="og:title" content={data.title ?? 'Blog post not found'} />
      <meta
        property="og:description"
        content={
          data.description ?? 'The blog post you are looking for does not exist'
        }
      />
      <meta name="description" content={data.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}

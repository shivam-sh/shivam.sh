import matter from 'gray-matter';

export default async function Head({ params }) {
  const frontMatter = await generateFrontMatter(params);
  const siteURL = process.env.SITE_URL || process.env.VERCEL_URL;
  return (
    <>
      <title>{frontMatter.title}</title>
      <meta property="og:url" content={`${siteURL}${frontMatter.url}`} />
      <meta property="og:image" content={`${frontMatter.image}`} />
      <meta property="og:site_name" content="Shivam Sh" />
      <meta property="og:title" content={frontMatter.title} />
      <meta property="og:description" content={frontMatter.description} />
      <meta name="description" content={frontMatter.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}

async function generateFrontMatter({ project }) {
  const postContent = await fetch(
    `${process.env.CDN_URL}/projects/${project}/post.md`,
    { next: { revalidate: 3600 } }
  ).then((res) => res.text());

  const { data } = matter(postContent);
  return data;
}

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export default async function Head({ params }) {
  const frontMatter = await generateFrontMatter(params);
  const siteURL = process.env.SITE_URL || process.env.VERCEL_URL;
  return (
    <>
      <title>{frontMatter.title}</title>
      <meta
        property="og:url"
        content={`https://${siteURL}/${params.year}/${params.blogPost}`}
      />
      <meta
        property="og:image"
        content={`https://${siteURL}/${frontMatter.imagePath}`}
      />
      <meta property="og:site_name" content="Shivam Sh" />
      <meta property="og:title" content={frontMatter.title} />
      <meta property="og:description" content={frontMatter.description} />
      <meta name="description" content={frontMatter.description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}

async function generateFrontMatter({ year, blogPost }) {
  const fileContent = fs.readFileSync(
    join('ssg', 'blog', `${year}`, `${blogPost}.md`)
  );

  const { data } = matter(fileContent);
  return data;
}

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export default async function Head({ params }) {
  const frontMatter = await generateFrontMatter(params);

  return (
    <>
      <title>{frontMatter.title}</title>
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

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

export default async function Head({ params }) {
  const frontMatter = await generatePageSource(params);
  return (
    <>
      <title>{frontMatter.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
}

async function generatePageSource({ project }) {
  const fileContent = fs.readFileSync(
    join('ssg', 'projects', `${project}-auto.md`)
  );
  const { data } = matter(fileContent);
  return data;
}

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const Head = async ({ params }) => {
  const frontMatter = await generateFrontMatter(params);

  return (
    <>
      <title>{frontMatter.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};
export default Head;

const generateFrontMatter = async ({ year, blogPost }) => {
  const fileContent = fs.readFileSync(
    join('ssg', 'blog', `${year}`, `${blogPost}.md`)
  );

  const { data } = matter(fileContent);
  return data;
};

import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';

const Head = async ({ params }) => {
  const frontMatter = await generatePageSource(params);

  return (
    <>
      <title>{frontMatter.title}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};
export default Head;

const generatePageSource = async ({ project }) => {
  const fileContent = fs.readFileSync(
    join('ssg', 'projects', `${project}-auto.md`)
  );
  const { data } = matter(fileContent);

  return data;
};

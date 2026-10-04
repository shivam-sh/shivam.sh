import fs from 'fs';
import { join } from 'path';
import styles from 'styles/BlogPost.module.scss';

export default async function Error() {

  return (
    <div
      className={styles.postContent}
      style={{ color: 'red' }}
    />
  );
}

export async function generateStaticParams() {
  const postsDir = join('ssg', 'blog');
  const years = fs.readdirSync(postsDir);
  const posts = [];

  years.forEach((year) => {
    const files = fs.readdirSync(join(postsDir, year));
    posts.push(
      ...files.map((file) => ({
        name: file.replace('.md', ''),
        year: year,
      }))
    );
  });

  return posts.map((file) => ({
    year: file.year,
    blogPost: file.name,
  }));
}

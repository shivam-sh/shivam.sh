import { format } from 'date-fns';
import fs from 'fs';
import { join } from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import styles from '../../styles/Blog.module.scss';
import generateRssFeed from 'feed/rss';

const Blog = async () => {
  const metadata = await getPostMetadata();

  return (
    <div className={styles.posts}>
      <h3>Blog</h3>

      {metadata.map((data) => {
        const date = new Date(data.date);

        return (
          <Link href={data.url} key={data.title} legacyBehavior>
            <div className={styles.post}>
              <h5 className={styles.title}>
                <span className="accent">//&nbsp;&nbsp;</span>
                {data.title}
              </h5>
              <q className={styles.description}>{data.description}</q>
              <caption className={`${styles.info} footnote`}>
                [{format(date, 'dd-MM-yyyy')}]
              </caption>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Blog;

const getPostMetadata = async () => {
  const postsDir = join('ssg', 'blog');
  const years = fs
    .readdirSync(postsDir)
    .filter((file) => fs.statSync(join(postsDir, file)).isDirectory());
  const postFiles = [];

  years.forEach((year) => {
    const files = fs.readdirSync(join(postsDir, year));
    postFiles.push(...files.map((file) => join(postsDir, year, file)));
  });

  const metadata = [];

  postFiles.forEach((file) => {
    const contents = fs.readFileSync(join(file).toString());
    const { data } = matter(contents);

    if (data.showInTimeline) {
      metadata.push({
        ...data,
        url: file.replace(/ssg\/blog/, '').replace(/\.md$/, ''),
      });
    }
  });

  generateRssFeed(metadata);

  return metadata;
};

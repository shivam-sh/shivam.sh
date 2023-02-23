import { format } from 'date-fns';
import Link from 'next/link';
import styles from 'styles/Blog.module.scss';
import generateRssFeed from 'generation/rss';
import { getPostsMetadata } from 'generation/blog-posts';

export default async function Blog() {
  const metadata = await getPostsMetadata();
  generateRssFeed(metadata.filter((post) => post.showInRSSFeed === true));

  return (
    <div className={styles.posts}>
      <span className={styles.inline}>
        <h3>Blog</h3>
        <p className={`caption ${styles.rssLink}`}>
          <Link href="/rss.xml">RSS</Link>
        </p>
      </span>

      {metadata.map((data) => {
        const date = new Date(data.date);

        return (
          <Link href={data.url} key={data.title}>
            <div className={styles.post}>
              <h5 className={styles.title}>
                <span className="accent">//&nbsp;&nbsp;</span>
                {data.title}
              </h5>
              <q className={styles.description}>{data.description}</q>
              <p className={`${styles.info} footnote`}>
                [{format(date, 'dd-MM-yyyy')}]
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

import { format } from 'date-fns';
import Link from 'next/link';
import styles from 'styles/Blog.module.scss';
import generateRssFeed from 'feed/rss';

export const dynamic = 'auto';

export default async function Blog() {
  const metadata = await getPostMetadata();
  return (
    <div className={styles.posts}>
      <h3>Blog</h3>

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

async function getPostMetadata() {
  const postData = await fetch(`${process.env.CDN_URL}/blog-posts.json`, {
    next: { revalidate: 3600 },
  })
    .then((res) => res.json())
    .then((data) => data.posts);

  generateRssFeed(postData.filter((post) => post.showInRSSFeed === true));

  return postData;
}

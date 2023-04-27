import { fetchPosts } from 'app/custom/posts';
import { format } from 'date-fns';
import Link from 'next/link';
import styles from 'styles/Posts.module.scss';

export const metadata = {
  title: 'Posts • Shivam Sh',
  description: 'Some posts about topics that are on my mind',
  openGraph: {
    siteName: 'Shivam Sh',
    title: 'Posts • Shivam Sh',
    description: 'Some posts about topics that are on my mind',
    url: process.env.SITE_URL ?? process.env.VERCEL_URL,
  },
};

export default async function Page() {
  const posts = await fetchPosts();
  return (
    <div className={styles.posts}>
      <span className={styles.inline}>
        <h3>Posts</h3>
        <p className={`caption ${styles.rssLink}`}>
          <Link href="/rss">RSS</Link>
        </p>
      </span>

      {posts.map((post) => {
        const date = new Date(post.published_at);
        return (
          <Link href={post.url} key={post.title}>
            <div className={styles.post}>
              <h5 className={styles.title}>
                <span className="accent">//&nbsp;</span>
                {post.title}
              </h5>
              <q className={styles.description}>{post.excerpt}</q>
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

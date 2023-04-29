import { fetchPosts, rehypeHTML } from 'app/custom/postData';
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

export const revalidate = 60;

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
        if (post.canonical_url != null) post.url = post.canonical_url;
        if (post.tags.some((tag) => tag.name === '#inline'))
          return InlinePost(post);
        return LinkPost(post);
      })}
    </div>
  );
}

function LinkPost(post) {
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
}

async function InlinePost(post) {
  const date = new Date(post.published_at);
  const source = String(await rehypeHTML(post.html));

  return (
    <div className={styles.inlinePost}>
      {post.title != '(Untitled)' ? (
        <Link href={post.url} key={post.title}>
          <h3 className={styles.title}>{post.title}</h3>
        </Link>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: source }} />
      <p className={`${styles.info} footnote`}>
        [{format(date, 'dd-MM-yyyy')}]
      </p>
    </div>
  );
}

import { fetchPosts } from 'app/lib/server/ghostData';
import { rehypeHTML } from 'app/lib/server/postProcessing';
import Link from 'next/link';
import styles from './Posts.module.scss';

export const metadata = {
  title: 'Posts • Spectre',
  description: 'Some posts about topics that are on my mind',
  openGraph: {
    siteName: 'Spectre',
    title: 'Posts • Spectre',
    description: 'Some posts about topics that are on my mind',
    url: process.env.SITE_URL ?? process.env.VERCEL_URL
  }
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
        return Post(post);
      })}
    </div>
  );
}

async function Post(post) {
  if (post.inline) {
    return (
      <div className={styles.inlinePost}>
        <PostTitle post={post} inline={post.inline} />
        <PostDescription post={post} inline={post.inline} />
        <PostInfo post={post} />
      </div>
    );
  }

  return (
    <Link href={post.url} key={post.title}>
      <div className={post.inline ? styles.inlinePost : styles.post}>
        <PostTitle post={post} inline={post.inline} />
        <PostDescription post={post} inline={post.inline} />
        <PostInfo post={post} />
      </div>
    </Link>
  );
}

function PostTitle({ post, inline }) {
  if (inline) {
    return (
      <>
        {post.title != '(Untitled)' ? (
          <h4 className={styles.title}>
            <Link href={post.url}>{post.title}</Link>
          </h4>
        ) : null}
      </>
    );
  }

  return (
    <h5 className={styles.title}>
      <span className="accent">{'// '}</span>
      {post.title}
    </h5>
  );
}

async function PostDescription({ post, inline }) {
  const source = String(await rehypeHTML(post.html));
  if (inline) {
    return <div dangerouslySetInnerHTML={{ __html: source }} />;
  }

  return <q className={styles.description}>{post.excerpt}</q>;
}

function PostInfo({ post }) {
  return (
    <div className={`${styles.info} footnote`}>
      <p>[{post.date}]</p>

      {post.externalLink ? <p>External Link</p> : null}
    </div>
  );
}

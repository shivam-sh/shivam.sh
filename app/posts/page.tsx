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
        return Post(post);
      })}
    </div>
  );
}

async function Post(post) {
  const inline = post.tags.some((tag) => tag.name === '#inline');
  const href = post.canonical_url != null 
    ? post.canonical_url 
    : post.url;

  return (
    <Link href={href} key={post.title}>
      <div className={inline ? styles.inlinePost : styles.post}>
        <PostTitle post={post} inline={inline} />
        <PostDescription post={post} inline={inline} />
        <PostInfo post={post} inline={inline} />
      </div>
    </Link>
  );
}

function PostTitle({ post, inline }) {
  if (inline) {
    return (
    <>
      {post.title != '(Untitled)' 
        ? (
          <Link href={post.canonical_url} key={post.title}>
            <h4 className={styles.title}>{post.title}</h4>
          </Link>)
        : null}
    </>
    );
  }

  return (
    <h5 className={styles.title}>
      <span className="accent">//&nbsp;</span>
      {post.title}
    </h5>
  );
}

async function PostDescription({post, inline}) {
  const source = String(await rehypeHTML(post.html));
  if (inline) {
    return (
      <div dangerouslySetInnerHTML={{ __html: source }} />
    );
  }

  return (
    <q className={styles.description}>{post.excerpt}</q>
  );
}

function PostInfo({post, inline}) {
  const date = new Date(post.published_at);

  return (
    <div className={`${styles.info} footnote`}>
      <p>[{format(date, 'dd-MM-yyyy')}]</p>

      {
        post.canonical_url != null
          ? (<p>External Link</p>)
          : null
      }
    </div>
  );
}


import Head from 'next/head';
import Header from '../header';

import styles from '../../styles/layouts/blogPost.module.scss';

const BlogPost = ({ meta, content }) => (
  <>
    <Head>
      <title>{meta.title}</title>
    </Head>

    <Header />

    <div className={styles.blogPost}>{content}</div>
  </>
);
export default BlogPost;

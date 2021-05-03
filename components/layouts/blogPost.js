import Head from 'next/head';
import Header from '../header';

import styles from '../../styles/layouts/blogPost.module.scss';

const BlogPost = (props) => {
  const { meta } = props;

  return (
    <>
      <Head>
        <title>{meta.title}</title>
      </Head>

      <Header />

      <div className={styles.blogPost}>{props.children}</div>
    </>
  );
};
export default BlogPost;

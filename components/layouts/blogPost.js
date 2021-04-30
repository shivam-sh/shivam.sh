import Head from 'next/head';
import Header from '../header';

import styles from '../../styles/layouts/blogPost.module.scss';

const BlogPost = ({ meta, content, htmlString }) => (
  <>
    <Head>
      <title>{meta.title}</title>
    </Head>

    <Header />

		<div className={styles.blogPost} dangerouslySetInnerHTML={{ __html: htmlString }} >{content}</div>
  </>
);

export default BlogPost;

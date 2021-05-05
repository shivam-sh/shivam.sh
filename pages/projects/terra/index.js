import BlogPost from '../../../components/layouts/blogPost';
import MDXParse from './../../../components/mdxParse'

import dynamic from 'next/dynamic';
import hydrate from 'next-mdx-remote/hydrate';
import sketch from './sketch';
const P5Wrapper = dynamic(import('react-p5-wrapper'), {
  ssr: false,
});

const Terra = ({source, frontMatter}) => {
  const data = JSON.parse(frontMatter);
  const content = hydrate(source);

  return (
  <BlogPost meta={data}>
    <h1>Terra</h1>
    <P5Wrapper sketch={sketch}/>
    {content}
  </BlogPost>
)};
export default Terra;

export const getStaticProps = async () => {
  return { props: await MDXParse('pages/projects/terra/content.mdx') };
};
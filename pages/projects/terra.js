import BlogPost from '../../components/layouts/blogPost';
import MDXParse from '../../components/mdxParse'

import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote';
import sketch from '../../ssg/projects/terra/sketch';
const P5Wrapper = dynamic(import('react-p5-wrapper'), {
  ssr: false,
});

const Terra = ({source, frontMatter}) => {
  const data = JSON.parse(frontMatter);

  return (
  <BlogPost meta={data}>
    <h1>Terra</h1>
    <P5Wrapper sketch={sketch}/>
    <MDXRemote {...source} />
  </BlogPost>
)};
export default Terra;

export const getStaticProps = async () => {
  return { props: await MDXParse('ssg/projects/terra/content.mdx') };
};
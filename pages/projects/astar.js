import BlogPost from '../../components/layouts/blogPost';
import MDXParse from '../../components/mdxParse'

import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote';
import sketch from '../../ssg/projects/astar/sketch';
const P5Wrapper = dynamic(import('react-p5-wrapper'), {
  ssr: false,
});

const AStar = ({source, frontMatter}) => {
  const data = JSON.parse(frontMatter);

  return (
  <BlogPost meta={data}>
      <h1>A*</h1>
      <P5Wrapper sketch={sketch} fullscreen={false}/>
    <MDXRemote {...source} />
  </BlogPost>
)};
export default AStar;

export const getStaticProps = async () => {
  return { props: await MDXParse('ssg/projects/astar/content.mdx') };
};
import BlogPost from '../../components/layouts/blogPost';
import MDXParse from '../../components/mdxParse';

import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote';
import sketch from '../../ssg/projects/orbit/sketch';

const ReactP5Wrapper = dynamic(() => import('react-p5-wrapper')
    .then(mod => mod.ReactP5Wrapper), {
    ssr: false
})

const Orbit = ({ source, frontMatter }) => {
  let data = {};
  if (frontMatter != undefined) {
    data = JSON.parse(frontMatter);
  }

  return (
  <BlogPost meta={data}>
      <h1>Orbit</h1>
      <ReactP5Wrapper sketch={sketch}/>
      <MDXRemote {...source} />
  </BlogPost>
)};
export default Orbit;

export const getStaticProps = async () => {
  return { props: await MDXParse('ssg/projects/orbit/content.mdx') };
};
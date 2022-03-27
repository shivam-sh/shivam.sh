import BlogPost from '../../components/layouts/blogPost';
import MDXParse from '../../components/mdxParse'

import dynamic from 'next/dynamic';
import { MDXRemote } from 'next-mdx-remote';
import sketch from '../../ssg/projects/terra/sketch';
const ReactP5Wrapper = dynamic(() => import('react-p5-wrapper')
    .then(mod => mod.ReactP5Wrapper), {
    ssr: false
})

const Terra = ({source, frontMatter}) => {
  let data = {};
  if (frontMatter != undefined) {
    data = JSON.parse(frontMatter);
  }

  return (
  <BlogPost meta={data}>
    <h1>Terra</h1>
    <ReactP5Wrapper sketch={sketch}/>
    <MDXRemote {...source} />
  </BlogPost>
)};
export default Terra;

export const getStaticProps = async () => {
  return { props: await MDXParse('ssg/projects/terra/content.mdx') };
};
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import Navbar, { NavbarLink } from 'components/Navbar';
import styles from '../../styles/Blog.module.scss'

const Blog = ({ }) => { 
  return (
    <div className={'container'}>
      <Navbar currentPage={NavbarLink.Blog} />

      <div className={'content'}></div>
    </div>
  );
}

export default Blog;

// export const getStaticPaths: GetStaticPaths = async () => {
//   // ...
// }

// export const getStaticProps: GetStaticProps = async (context) => {
//   // ...
// }
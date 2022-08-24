import Navbar, { NavbarLink } from 'components/Navbar';
import styles from '../../styles/Projects.module.scss'

const Projects = ({ }) => { 
  return (
    <div className={'container'}>
      <Navbar currentPage={NavbarLink.Projects} />

      <div className={'content'}></div>
    </div>
  );
}

export default Projects;

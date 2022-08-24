import Link from 'next/link'
import Logo from './Logo';
import styles from '../styles/components/Navbar.module.scss';

export enum NavbarLink {
    Home = '/',
    Blog = '/blog',
    Projects = '/projects',
    About = '/about',
    None = ''
}

export interface NavbarProps {
    currentPage: NavbarLink;
}

const Navbar = ({ currentPage }: NavbarProps) => {
    return (
        <div className={styles.navbar}>
            <Link href='/'>
                <a>
                    <Logo />
                </a>
            </Link>

            <div className={styles.links}>
                <Link href={NavbarLink.Home}>
                    <a className={currentPage === NavbarLink.Home ? styles.selected : ''}>
                        <h6><span>❯ </span>home</h6>
                    </a>
                </Link>
                <Link href='/blog'>
                    <a className={currentPage === NavbarLink.Blog ? styles.selected : ''}>
                        <h6><span>❯ </span>blog</h6>
                    </a>
                </Link>
                <Link href='/projects'>
                    <a className={currentPage === NavbarLink.Projects ? styles.selected : ''}>
                        <h6><span>❯ </span>projects</h6>
                    </a>
                </Link>
                <Link href='/about'>
                    <a className={currentPage === NavbarLink.About ? styles.selected : ''}>
                        <h6><span>❯ </span>about</h6>
                    </a>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
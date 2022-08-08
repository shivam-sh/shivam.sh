import styles from "../styles/components/Navbar.module.scss";
import Logo from './Logo';

const Navbar = ({ }) => {
    return (
        <div className={styles.navbar}>
            <a href="/">
                <Logo/>
            </a>

            <div className={styles.links}>
                <a href="/projects"><h6>projects</h6></a>
                <a href="/blog"><h6>blog</h6></a>
                <a href="/about"><h6>about</h6></a>
            </div>
        </div>
    );
}

export default Navbar;
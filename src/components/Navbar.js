
import Link from 'next/link';
import styles from './Navbar.module.css';



const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Content Summarizer</Link>
      </div>
      <div className={styles.links}>
        <Link href="/login" className={styles.link}>Login</Link>
        <Link href="/signup" className={styles.link}>Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;


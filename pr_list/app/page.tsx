import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <h1 className={styles.main}>
    Go to <Link  href="/list" className={styles.listlink} > List </Link>
    </h1>
  )
}

import { Link } from 'react-router-dom';

import styles from './AdminMenu.module.css'


export const AdminMenu = () => {
  return (
    <div className={styles.adminHeader}>
      <Link to="/users" className={styles.adminBtn}>Users</Link>
      <Link to="/orders" className={styles.adminBtn}>Orders</Link>
      <Link to="/bands" className={styles.adminBtn}>Bands</Link>
      <Link to="/genres" className={styles.adminBtn}>Genres</Link>
      <Link to="/labels" className={styles.adminBtn}>Labels</Link>
      <Link to="/albums" className={styles.adminBtn}>Albums</Link>
    </div>
  )
}

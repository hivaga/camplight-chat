import styles from './header.module.scss';
import Link from 'next/link';

/* eslint-disable-next-line */
export interface HeaderProps {
}

export function Header(props: HeaderProps) {
  return (
    <div className={styles.container}>
      <Link href={'/'}>Home</Link>
      <Link href={'/user'}>User</Link>
      <Link href={'/chat'}>Chats</Link>
    </div>
  );
}

export default Header;

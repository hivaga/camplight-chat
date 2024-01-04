"use client";
import styles from './header.module.scss';
import Link from 'next/link';
import { usePathname} from 'next/navigation'

/* eslint-disable-next-line */
export interface HeaderProps {
}

export function MenuItem({label, href}: { label: string, href: string}) {
  const pathname = usePathname()
  const isSelected = pathname === href;

  return (
    <Link href={href} className={`${styles.link} ${isSelected ? styles.selected : ''}`}>{label}</Link>
  );
}

export function Header(props: HeaderProps) {
  return (
    <div className={styles.container}>
      <MenuItem label={'Home'} href={'/'}/>
      <MenuItem label={'User'} href={'/user'}/>
      <MenuItem label={'Chat'} href={'/chat'}/>
      <MenuItem label={'tRPC Chat'} href={'/trpc/chat'}/>
    </div>
  );
}

export default Header;

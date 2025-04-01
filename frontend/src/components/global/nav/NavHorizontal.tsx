'use client';

import React from 'react';
import Link from 'next/link';
import styles from './NavHorizontal.module.css';
import { usePathname } from 'next/navigation';

export default function NavHorizontal() {
  const pathname = usePathname();

  const leftMenuItems = [
    { name: 'STYLE', path: '/style' },
    { name: 'NEWS', path: '/news' },
    { name: 'FICTION', path: '/fiction' },
  ];

  const rightMenuItems = [
    { name: 'REVIEW', path: '/review' },
    { name: 'CULTURE', path: '/culture' },
  ];

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.leftMenu}>
          {leftMenuItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={`${styles.menuItem} ${pathname === item.path ? styles.active : ''}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <Link href="/" className={styles.logoLink}>
          <div className={styles.logo}>
            Attatched
          </div>
        </Link>

        <div className={styles.rightSection}>
          <div className={styles.rightMenu}>
            {rightMenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`${styles.menuItem} ${pathname === item.path ? styles.active : ''}`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className={styles.searchContainer}>
            <Link href="/search" className={styles.searchButton}>
              <span>SEARCH</span>
              <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.5 16.5M16.5 16.5C18.1569 14.8431 19 12.5858 19 10C19 4.47715 14.5228 0 9 0C3.47715 0 -1 4.47715 -1 10C-1 15.5228 3.47715 20 9 20C11.5858 20 13.8431 19.1569 15.5 17.5L16.5 16.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 
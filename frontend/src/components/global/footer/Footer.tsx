'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Left - Logo */}
        <div className={styles.logoSection}>
          <Link href="/?entry=false" className={styles.logoLink}>
            <span className={styles.copyright}>©</span> Attatched
          </Link>
        </div>

        {/* Center - Footer Links */}
        <div className={styles.linksSection}>
          <Link href="/privacy-policy" className={styles.footerLink}>
            PRIVACY POLICY
          </Link>
          <Link href="/careers" className={styles.footerLink}>
            CAREERS
          </Link>
          <Link href="/newsletter" className={styles.footerLink}>
            NEWSLETTER
          </Link>
          <Link href="/socials" className={styles.footerLink}>
            SOCIALS
          </Link>
        </div>

        {/* Right - Search */}
        <div className={styles.searchSection}>
          <div className={styles.searchBox}>
            <input type="text" placeholder="SEARCH" className={styles.searchInput} />
          </div>
          <button className={styles.searchButton}>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={styles.searchIcon}
            >
              <path 
                d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" 
                fill="currentColor" 
              />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 
'use client';

import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

export type FooterTheme = 'default' | 'style' | 'news' | 'fiction' | 'review' | 'culture';

interface FooterProps {
  theme?: FooterTheme;
}

const themePaths = {
  default: {
    about: '/footersvgs/style/about 2.svg',
    shop: '/footersvgs/style/shop 2.svg',
    logo: '/footersvgs/style/AttachedLogoMain 2.svg',
    privacy: '/footersvgs/style/PRIVACY PPOLICY 2.svg'
  },
  news: {
    about: '/footersvgs/style/about 2.svg',
    shop: '/footersvgs/style/shop 2.svg',
    logo: '/footersvgs/style/AttachedLogoMain 2.svg',
    privacy: '/footersvgs/style/PRIVACY PPOLICY 2.svg'
  },
  style: {
    about: '/footersvgs/news/about 2.svg',
    shop: '/footersvgs/news/shop 2.svg',
    logo: '/footersvgs/news/AttachedLogoMain 2.svg',
    privacy: '/footersvgs/news/PRIVACY PPOLICY 2.svg'
  },
  fiction: {
    about: '/footersvgs/fiction/about 6.svg',
    shop: '/footersvgs/fiction/shop 6.svg',
    logo: '/footersvgs/fiction/AttachedLogoMain 6.svg',
    privacy: '/footersvgs/fiction/PRIVACY PPOLICY 6.svg'
  },
  review: {
    about: '/footersvgs/review/about 4.svg',
    shop: '/footersvgs/review/shop 4.svg',
    logo: '/footersvgs/review/AttachedLogoMain 4.svg',
    privacy: '/footersvgs/review/PRIVACY PPOLICY 4.svg'
  },
  culture: {
    about: '/footersvgs/culture/about 8.svg',
    shop: '/footersvgs/culture/shop 8.svg',
    logo: '/footersvgs/culture/AttachedLogoMain 8.svg',
    privacy: '/footersvgs/culture/PRIVACY PPOLICY 8.svg'
  }
};

export const Footer: React.FC<FooterProps> = ({ theme = 'default' }) => {
  const paths = themePaths[theme] || themePaths.default;
  
  return (
    <footer className={`${styles.footer} ${styles[theme]}`}>
      <div className={styles.container}>
        <nav className={styles.navigation}>
          <Link href="/about" className={styles.navButton}>
            <img
              src={paths.about}
              alt="About"
              width={70}
              height={30}
              className={styles.svgObject}
              style={{ imageRendering: 'crisp-edges' }}
            />
          </Link>
          <Link href="/shop" className={styles.navButton}>
            <img
              src={paths.shop}
              alt="Shop"
              width={70}
              height={30}
              className={styles.svgObject}
              style={{ imageRendering: 'crisp-edges' }}
            />
          </Link>
        </nav>
        
        <div className={styles.logo}>
          <img 
            src={paths.logo}
            alt="Attached Magazine"
            width={110}
            height={48}
            className={styles.svgObject}
            style={{ imageRendering: 'crisp-edges' }}
          />
        </div>
        
        <Link href="/privacy" className={styles.privacyButton}>
          <img
            src={paths.privacy}
            alt="Privacy Policy"
            width={70}
            height={30}
            className={styles.svgObject}
            style={{ imageRendering: 'crisp-edges' }}
          />
        </Link>
      </div>
      <div className={styles.copyright}>
        ©2025 Attached Magazine. All Rights Reserved
      </div>
    </footer>
  );
}; 
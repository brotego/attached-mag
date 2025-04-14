'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from './Navigation.module.css';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.mobile-menu') && !target.closest('.menu-button')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Link href="/" className={styles.logoLink}>
            <Image 
              src="/attatchedlogoblack.svg" 
              alt="Attatched Magazine Logo" 
              width={150} 
              height={40} 
              className={styles.logo}
              priority
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.desktopNav}>
          <Link href="/" className={styles.navLink}>
            Home
          </Link>
          <Link href="/about" className={styles.navLink}>
            About
          </Link>
          <Link href="/shop" className={styles.navLink}>
            Shop
          </Link>
          <Link href="/contact" className={styles.navLink}>
            Contact
          </Link>
          <button className={styles.subscribeButton}>
            Subscribe
          </button>
        </div>

        {/* Search */}
        <div className={styles.searchContainer}>
          <input type="text" placeholder="SEARCH" className={styles.searchInput} />
          <button className={styles.searchButton}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`${styles.menuButton} menu-button`}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <span className={styles.menuIcon}>
            {!isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </span>
        </button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`${styles.mobileMenu} mobile-menu`}>
            <div className={styles.mobileNav}>
              <Link href="/" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link href="/about" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link href="/shop" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link href="/contact" className={styles.mobileLink} onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
              <button className={styles.mobileSubscribeButton} onClick={() => setIsMenuOpen(false)}>
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 
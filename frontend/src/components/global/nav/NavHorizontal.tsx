'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './NavHorizontal.module.css';
import { usePathname } from 'next/navigation';

export default function NavHorizontal() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const leftMenuItems = [
    { name: 'STYLE', path: '/category/style', tag: 'style.svg' },
    { name: 'NEWS', path: '/category/news', tag: 'news.svg' },
    { name: 'FICTION', path: '/category/fiction', tag: 'fiction.svg' },
  ];

  const rightMenuItems = [
    { name: 'REVIEW', path: '/category/review', tag: 'review.svg' },
    { name: 'CULTURE', path: '/category/culture', tag: 'culture.svg' },
  ];

  const allMenuItems = [...leftMenuItems, ...rightMenuItems];

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
              <Image
                src={`/images/tags/${item.tag}`}
                alt={item.name}
                width={60}
                height={30}
                className={styles.tagImage}
              />
            </Link>
          ))}
        </div>

        <Link href="/" className={styles.logoLink}>
          <img
            src="/attatchedlogoblack.svg"
            alt="Attatched"
            className={styles.logoImage}
          />
        </Link>

        <div className={styles.rightSection}>
          <div className={styles.rightMenu}>
            {rightMenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`${styles.menuItem} ${pathname === item.path ? styles.active : ''}`}
              >
                <Image
                  src={`/images/tags/${item.tag}`}
                  alt={item.name}
                  width={60}
                  height={30}
                  className={styles.tagImage}
                />
              </Link>
            ))}
            <Link href="/search" className={styles.menuItem}>
              <img
                src="/images/tags/search.svg"
                alt="Search"
                width={60}
                height={30}
                className={styles.tagImage}
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
          </div>
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
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`${styles.mobileMenu} mobile-menu`} ref={menuRef}>
          <div className={styles.mobileNav}>
            {allMenuItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`${styles.mobileMenuItem} ${pathname === item.path ? styles.active : ''}`}
              >
                <Image
                  src={`/images/tags/${item.tag}`}
                  alt={item.name}
                  width={80}
                  height={100}
                  className={styles.mobileTagImage}
                />
              </Link>
            ))}
            <Link href="/search" className={styles.mobileMenuItem}>
              <img
                src="/images/tags/search.svg"
                alt="Search"
                width={80}
                height={100}
                className={styles.mobileTagImage}
                style={{ imageRendering: 'crisp-edges' }}
              />
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 
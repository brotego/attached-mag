'use client';

import Image from 'next/image';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <div className={styles.heroContainer}>
      {/* Hero Image */}
      <div className={styles.imageWrapper}>
        <Image
          src="/Rectangle 715.jpg"
          alt="Fashion portrait in dramatic lighting"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 className={styles.title}>
          Attached Magazine
        </h1>
        <p className={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, commodo consequat. Excepteur sint occaecat cupidatat non proident.Lorem ipsum dolor sit amet, consectetur adipiscing elit, commodo consequat. Excepteur sint occaecat cupidatat non proident.
        </p>
      </div>
    </div>
  );
} 
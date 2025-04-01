'use client';

import Image from 'next/image';
import styles from './Hero.module.css';
import { getStrapiMedia } from '../../../lib/media';

interface HeroData {
  id: number;
  title: string;
  description: string;
  backgroundImage: {
    id: number;
    name: string;
    url: string;
    width: number;
    height: number;
  };
}

interface HeroProps {
  data: HeroData | null;
}

export default function Hero({ data }: HeroProps) {
  if (!data) {
    return null;
  }

  const { title, description, backgroundImage } = data;
  const imageUrl = getStrapiMedia(backgroundImage?.url);

  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`Hero image for ${title}`}
          fill
          priority
          className={styles.backgroundImage}
        />
      )}
      <div className={styles.content}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
} 
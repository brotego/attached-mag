'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './Hero.module.css';
import { getStrapiMedia } from '../../../lib/media';

interface HeroProps {
  data: {
    id: number;
    featured_article: {
      id: number;
      title: string;
      description: string;
      slug: string;
      cover: {
        id: number;
        url: string;
      };
      category?: {
        id: number;
        name: string;
      };
    };
  } | null;
}

export default function Hero({ data }: HeroProps) {
  console.log('Hero Data:', JSON.stringify(data, null, 2));

  // If no data or no featured article, show a placeholder
  if (!data?.featured_article) {
    console.log('No featured article data found');
    return (
      <section className={styles.hero}>
        <div className={styles.imageWrapper}>
          <Image
            src="/Rectangle 715.jpg"
            alt="Welcome to Attached Magazine"
            fill
            priority
            className={styles.backgroundImage}
          />
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h1 className={styles.title}>Welcome to Attached Magazine</h1>
            <p className={styles.description}>Please set up a featured article in the Strapi admin panel.</p>
          </div>
        </div>
      </section>
    );
  }

  const article = data.featured_article;
  console.log('Article Data:', JSON.stringify(article, null, 2));
  
  // Get the image URL from the cover data
  let imageUrl = '/Rectangle 715.jpg'; // default fallback
  if (article.cover?.url) {
    const strapiUrl = getStrapiMedia(article.cover.url);
    if (strapiUrl) {
      imageUrl = strapiUrl;
    }
  }
  
  // Get the category name for styling
  const categoryName = article.category?.name?.toLowerCase() || '';
  console.log('Category Name:', categoryName);
  
  console.log('Final Image URL:', imageUrl);

  return (
    <section className={`${styles.hero} ${categoryName ? styles[categoryName] : ''}`}>
      <Link href={`/article/${article.slug}`} className={styles.heroLink}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className={styles.backgroundImage}
          />
          <div className={styles.overlay} />
          <div className={styles.content}>
            <h1 className={styles.title}>{article.title}</h1>
            <p className={styles.description}>{article.description}</p>
          </div>
        </div>
      </Link>
    </section>
  );
} 
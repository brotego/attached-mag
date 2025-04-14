'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedArticles.module.css';
import { getStrapiMedia } from '../../../lib/media';
import MustRead from '../MustRead';
import { useEffect, useState } from 'react';

interface Author {
  id: number;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  cover: {
    url: string;
    width: number;
    height: number;
  } | null;
  author: Author | null;
  category: Category | null;
  featured: boolean;
  featured_set: string;
}

interface FeaturedArticlesProps {
  articles: Article[];
}

interface MustReadData {
  id: number;
  Title: string;
  Description: any[];
  Image: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
        width: number;
        height: number;
      }
    }
  } | null;
  ButtonText: string;
  Buttonurl: string;
  author?: {
    id: number;
    name: string;
  };
}

const CategoryTag = ({ name }: { name: string }) => {
  const categoryName = name.toLowerCase();
  const tagImage = `/images/tags/${categoryName}.png`;

  return (
    <div className={styles.tag}>
      <Image
        src={tagImage}
        alt={name}
        width={80}
        height={80}
        className={styles.tagImage}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  const [mustReadData, setMustReadData] = useState<MustReadData | null>(null);
  
  // Filter articles to only include those with featured: true
  const filteredArticles = articles.filter(article => article.featured);

  // Split filtered articles based on featured_set
  const firstSectionArticles = filteredArticles.filter(article => article.featured_set === 'first');
  const secondSectionArticles = filteredArticles.filter(article => article.featured_set === 'second');

  useEffect(() => {
    const fetchMustRead = async () => {
      try {
        const response = await fetch('/api/must-read');
        const data = await response.json();
        setMustReadData(data);
      } catch (error) {
        console.error('Error fetching must read data:', error);
      }
    };

    if (secondSectionArticles.length > 0) {
      fetchMustRead();
    }
  }, [secondSectionArticles.length]);

  const renderArticles = (articles: Article[]) => (
    <div className={styles.grid}>
      {articles.map((article) => (
        <article 
          key={article.id} 
          className={`${styles.article} ${article.category ? styles[article.category.name.toLowerCase()] : ''}`}
        >
          <Link 
            href={`/article/${article.slug}`}
            className={styles.articleLink}
          >
            <div className={styles.imageWrapper}>
              {article.category && <CategoryTag name={article.category.name} />}
              {article.cover && (
                <Image
                  src={getStrapiMedia(article.cover.url) || ''}
                  alt={article.title}
                  width={800}
                  height={533}
                  priority={article.id === 1}
                />
              )}
            </div>
            <div className={styles.content}>
              <h2 className={styles.title}>{article.title}</h2>
              {article.author && (
                <p className={styles.author}>BY {article.author.name}</p>
              )}
              <p className={styles.description}>{article.description}</p>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );

  return (
    <section className={styles.container}>
      {firstSectionArticles.length > 0 && renderArticles(firstSectionArticles)}
      {secondSectionArticles.length > 0 && mustReadData && (
        <div className={styles.secondSection}>
          <MustRead data={mustReadData} />
          {renderArticles(secondSectionArticles)}
        </div>
      )}
    </section>
  );
} 
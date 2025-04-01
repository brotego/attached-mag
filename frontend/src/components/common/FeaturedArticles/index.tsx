'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './FeaturedArticles.module.css';
import { getStrapiMedia } from '../../../lib/media';

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
  };
  author: Author | null;
  category: Category;
}

interface FeaturedArticlesProps {
  articles: Article[];
}

const CategoryTag = ({ name }: { name: string }) => {
  const categoryName = name.toLowerCase();
  const tagImage = `/images/tags/${categoryName}.png`;

  return (
    <div className={styles.tag}>
      <Image
        src={tagImage}
        alt={name}
        width={0}
        height={0}
        sizes="200px"
        className={styles.tagImage}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
};

export default function FeaturedArticles({ articles }: FeaturedArticlesProps) {
  return (
    <section className={styles.container}>
      <div className={styles.grid}>
        {articles.map((article) => (
          <article 
            key={article.id} 
            className={`${styles.article} ${styles[article.category.name.toLowerCase()]}`}
          >
            <Link 
              href={`/article/${article.slug}`}
              className={styles.articleLink}
            >
              <div className={styles.imageWrapper}>
                <CategoryTag name={article.category.name} />
                <Image
                  src={getStrapiMedia(article.cover.url) || ''}
                  alt={article.title}
                  width={800}
                  height={533}
                  priority={article.id === 1}
                />
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
    </section>
  );
} 
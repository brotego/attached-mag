import Image from 'next/image';
import Link from 'next/link';
import styles from './ArticleCard.module.css';

interface Article {
  id: number;
  title: string;
  description: string;
  slug: string;
  cover?: {
    url: string;
    width: number;
    height: number;
  };
  author?: {
    name: string;
  };
  category?: {
    name: string;
  };
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Link href={`/article/${article.slug}`} className={styles.card}>
      {article.cover && (
        <div className={styles.imageContainer}>
          <Image
            src={article.cover.url}
            alt={article.title}
            width={article.cover.width}
            height={article.cover.height}
            className={styles.image}
          />
        </div>
      )}
      <div className={styles.content}>
        <h2 className={styles.title}>{article.title}</h2>
        <p className={styles.description}>{article.description}</p>
        <div className={styles.meta}>
          {article.author && <span className={styles.author}>{article.author.name}</span>}
          {article.category && <span className={styles.category}>{article.category.name}</span>}
        </div>
      </div>
    </Link>
  );
} 
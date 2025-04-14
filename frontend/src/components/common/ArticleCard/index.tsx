import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/media';
import styles from './ArticleCard.module.css';
import CategoryTag from '@/components/common/CategoryTag';

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
  author: {
    id: number;
    name: string;
  } | null;
  category: {
    id: number;
    name: string;
    svg_path: string;
  } | null;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const imageUrl = article.cover?.url ? 
    getStrapiMedia(article.cover.url) || '/placeholder.jpg' : 
    '/placeholder.jpg';

  return (
    <article className={`${styles.article} ${article.category ? styles[article.category.name.toLowerCase()] : ''}`}>
      <Link href={`/article/${article.slug}`} className={styles.articleLink}>
        <div className={styles.imageWrapper}>
          {article.category && <CategoryTag category={article.category} className={styles.tag} />}
          <Image
            src={imageUrl}
            alt={article.title}
            width={800}
            height={533}
            className={styles.image}
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
  );
} 
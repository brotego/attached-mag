import { getArticlesByCategory } from '@/lib/api';
import ArticleCard from '@/components/common/ArticleCard';
import { Footer } from '@/components/common/Footer/Footer';
import styles from './Category.module.css';

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

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const slug = params.slug;
  console.log('Category slug:', slug);
  const articles = await getArticlesByCategory(slug);
  console.log('Articles fetched:', JSON.stringify(articles, null, 2));

  if (!articles || articles.length === 0) {
    console.log('No articles found for category:', slug);
    return (
      <main className={styles.empty}>
        <h1>No articles found in this category</h1>
        <p>Check back later for new content!</p>
        <Footer theme={slug as any} />
      </main>
    );
  }

  const categoryName = articles[0]?.category?.name || slug;

  return (
    <main className={`${styles.main} ${styles[slug]}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{categoryName.toUpperCase()}</h1>
        </header>
        <div className={styles.grid}>
          {articles.map((article: Article) => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </div>
      </div>
      <Footer theme={slug as any} />
    </main>
  );
} 
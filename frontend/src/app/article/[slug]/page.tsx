import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import Image from 'next/image';
import styles from './Article.module.css';
import CategoryTag from '@/components/common/CategoryTag';
import { notFound } from 'next/navigation';

async function getArticle(slug: string) {
  try {
    const path = '/articles';
    const urlParamsObject = {
      filters: { 
        slug: {
          $eq: slug
        }
      },
      populate: {
        cover: { fields: ['url', 'width', 'height'] },
        author: { fields: ['name'] },
        category: { fields: ['name'] },
        blocks: {
          populate: '*'
        }
      }
    };
    
    const response = await fetchAPI(path, urlParamsObject);
    
    if (!response.data?.[0]) {
      throw new Error('Article not found');
    }
    
    return response.data[0];
  } catch (error) {
    console.error('Error fetching article:', error);
    throw error;
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiMedia(article.cover?.url);
  const category = article.category?.name?.toLowerCase() || '';

  const renderBlock = (block: any) => {
    switch (block.__component) {
      case 'shared.rich-text':
        return (
          <div className={`${styles.content} ${styles[category]}`}>
            {block.body}
          </div>
        );
      case 'shared.quote':
        return (
          <div className={styles.quoteContainer}>
            <blockquote className={`${styles.quote} ${styles[category]}`}>
              {block.body}
              {block.title && (
                <cite className={styles.quoteAuthor}>{block.title}</cite>
              )}
            </blockquote>
          </div>
        );
      case 'shared.media':
        if (block.file?.url) {
          const mediaUrl = getStrapiMedia(block.file.url);
          if (typeof mediaUrl === 'string') {
            return (
              <div className={styles.mediaContainer}>
                <Image
                  src={mediaUrl}
                  alt=""
                  width={1200}
                  height={800}
                  className={styles.mediaImage}
                />
              </div>
            );
          }
        }
        return null;
      default:
        return null;
    }
  };

  if (!imageUrl || typeof imageUrl !== 'string') {
    notFound();
  }

  const articleContent = (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={`${styles.title} ${styles[category]}`}>{article.title}</h1>
        <div className={styles.author}>BY {article.author?.name || 'Unknown'}</div>
      </header>
      <div className={styles.heroContainer}>
        <CategoryTag category={article.category} className={styles.tag} />
        <Image
          src={imageUrl}
          alt={article.title}
          fill
          className={styles.heroImage}
          priority
        />
      </div>
      <div className={styles.content}>
        {article.blocks?.map((block: any, index: number) => (
          <div key={index}>
            {renderBlock(block)}
          </div>
        ))}
      </div>
    </article>
  );

  return (
    <div className={`${styles.articleWrapper} ${styles[category]}`}>
      {articleContent}
    </div>
  );
} 
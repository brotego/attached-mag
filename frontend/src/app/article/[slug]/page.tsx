import { fetchAPI } from '@/lib/api';
import { getStrapiMedia } from '@/lib/media';
import Image from 'next/image';
import styles from './Article.module.css';
import CategoryTag from '@/components/common/CategoryTag';
import { Footer } from '@/components/common/Footer/Footer';
import { notFound } from 'next/navigation';

interface ArticleBlock {
  __component: string;
  body?: string;
  title?: string;
  file?: {
    url: string;
  };
}

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
        category: { populate: '*' },
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

interface PageProps {
  params: { slug: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticle(params.slug);
  
  if (!article) {
    notFound();
  }

  const imageUrl = getStrapiMedia(article.cover?.url);
  const category = article.category?.name?.toLowerCase() || '';
  console.log('Category:', article.category, 'Category name:', category);

  const renderBlock = (block: ArticleBlock) => {
    switch (block.__component) {
      case 'shared.rich-text':
        return (
          <div className={`${styles.content} ${styles[category]}`}>
            {block.body?.split('\n\n').map((paragraph, index) => (
              paragraph.trim() && (
                <div 
                  key={index}
                  className={styles.paragraph}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              )
            ))}
          </div>
        );
      case 'shared.quote':
        return (
          <div className={`${styles.quoteContainer} ${styles[category]}`}>
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
    <article className={`${styles.article} ${styles[category]}`}>
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
      <header className={styles.header}>
        <h1 className={`${styles.title} ${styles[category]}`}>{article.title}</h1>
        <div className={styles.date}>
          {article.Date ? new Date(article.Date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }) : 'Date not available'}
        </div>
        <div className={styles.author}>BY {article.author?.name || 'Unknown'}</div>
      </header>
      <div className={styles.content}>
        {article.blocks?.map((block: ArticleBlock, index: number) => (
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
      <Footer theme={category as any} />
    </div>
  );
} 
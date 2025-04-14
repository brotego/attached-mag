"use client";

import React, { useState } from 'react';
import { fetchAPI } from '../../lib/api';
import styles from './SearchPage.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { getStrapiMedia } from '@/lib/media';
import CategoryTag from '@/components/common/CategoryTag';

type Article = {
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
};

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const filters = {
        $or: [
          { title: { $containsi: query } },
          { description: { $containsi: query } },
          { author: { name: { $containsi: query } } }
        ]
      };
      console.log('Search filters:', filters);

      const response = await fetchAPI('/articles', {
        filters,
        populate: ['cover', 'author', 'category']
      });
      
      console.log('API Response:', response);
      
      if (response.data) {
        setArticles(response.data);
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setError('Failed to fetch search results. Please try again.');
      setArticles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search articles..."
          className={styles.input}
        />
        <button
          onClick={handleSearch}
          disabled={isLoading}
          className={styles.button}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && (
        <div className={styles.error}>
          {error}
        </div>
      )}

      {articles.length > 0 ? (
        <div className={styles.grid}>
          {articles.map((article) => (
            <article 
              key={article.id} 
              className={`${styles.article} ${article.category ? styles[article.category.name.toLowerCase()] : ''}`}
            >
              <Link href={`/article/${article.slug}`}>
                <div className={styles.imageWrapper}>
                  {article.category && <CategoryTag category={article.category} />}
                  {article.cover && (
                    <Image
                      src={getStrapiMedia(article.cover.url) || ''}
                      alt={article.title}
                      width={800}
                      height={533}
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
      ) : !isLoading && query && (
        <div className={styles.noResults}>
          No articles found matching your search.
        </div>
      )}
    </div>
  );
}
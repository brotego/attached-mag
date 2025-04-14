'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './MustRead.module.css';
import { getStrapiMedia } from '../../../lib/media';

interface Block {
  type: string;
  children: {
    type: string;
    text: string;
  }[];
}

interface MustReadData {
  id: number;
  Title: string;
  Description: Block[];
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

interface MustReadProps {
  data: MustReadData | null;
}

function renderBlocks(blocks: Block[]) {
  return blocks.map((block, index) => {
    if (block.type === 'paragraph') {
      return (
        <p key={index} className={styles.paragraph}>
          {block.children.map((child, childIndex) => (
            <span key={childIndex}>{child.text}</span>
          ))}
        </p>
      );
    }
    return null;
  });
}

export default function MustRead({ data }: MustReadProps) {
  if (!data) {
    return null;
  }

  const imageUrl = data.Image?.data ? 
    getStrapiMedia(data.Image.data.attributes.url) : '';

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.grid}>
          {imageUrl && (
            <div className={styles.imageColumn}>
              <div className={styles.imageWrapper}>
                <Image
                  src={imageUrl}
                  alt={data.Title}
                  fill
                  priority
                  className={styles.image}
                />
              </div>
            </div>
          )}
          
          <div className={styles.contentColumn}>
            <h2 className={styles.title}>{data.Title}</h2>
            <div className={styles.description}>
              {renderBlocks(data.Description)}
            </div>
            
            {data.ButtonText && data.Buttonurl && (
              <Link 
                href={data.Buttonurl}
                className={styles.button}
              >
                {data.ButtonText}
              </Link>
            )}

            {data.author && (
              <p className={styles.author}>By {data.author.name}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
} 
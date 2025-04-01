'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './MustRead.module.css';
import { getStrapiMedia } from '../../../lib/media';

interface MustReadData {
  id: number;
  Title: string;
  Description: Array<{ type: string; children: Array<{ text: string }> }>;
  ButtonText: string;
  Buttonurl: string;
  Image: {
    id: number;
    name: string;
    url: string;
    width: number;
    height: number;
  };
}

interface MustReadProps {
  data: MustReadData | null;
}

export default function MustRead({ data }: MustReadProps) {
  if (!data) {
    return null; // or return a loading state or placeholder
  }

  const { Title, Description, ButtonText, Buttonurl, Image: ImageData } = data;
  const imageUrl = getStrapiMedia(ImageData?.url);
  const descriptionText = Description?.[0]?.children?.[0]?.text || '';

  return (
    <section className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.imageWrapper}>
          <Image
            src={imageUrl || ''}
            alt={Title}
            width={800}
            height={533}
            priority
          />
        </div>
        <div className={styles.content}>
          <h2 className={styles.title}>{Title}</h2>
          <p className={styles.description}>{descriptionText}</p>
          <Link href={Buttonurl} className={styles.button}>
            {ButtonText}
          </Link>
        </div>
      </div>
    </section>
  );
} 
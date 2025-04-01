import Image from 'next/image';
import styles from './CategoryTag.module.css';

interface CategoryTagProps {
  category: {
    name: string;
  };
  className?: string;
}

export default function CategoryTag({ category, className = '' }: CategoryTagProps) {
  const categoryName = category.name.toLowerCase();
  const tagImage = `/images/tags/${categoryName}.png`;

  return (
    <div className={`${styles.tag} ${styles[categoryName]} ${className}`}>
      <Image
        src={tagImage}
        alt={category.name}
        width={0}
        height={0}
        sizes="100vw"
        className={styles.tagImage}
        style={{ width: '100%', height: 'auto' }}
      />
    </div>
  );
} 
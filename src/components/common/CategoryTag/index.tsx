import React from 'react';

// Define or import CategoryTagProps
interface CategoryTagProps {
  category: {
    name: string;
  } | null;
  className?: string;
}

export default function CategoryTag({ category, className = '' }: CategoryTagProps) {
  if (!category) {
    return null; // Handle null case
  }

  console.log('Category data:', category);

  const categoryName = category.name.toLowerCase();
  const tagImage = `/images/tags/${categoryName}.png`;

  return (
    <div className={className}>
      {/* Render your component */}
    </div>
  );
} 
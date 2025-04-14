'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import type { FooterTheme } from './Footer';

export function FooterContainer() {
  const pathname = usePathname();
  
  // Function to determine the footer theme based on the path
  const getFooterTheme = (): FooterTheme | null => {
    // Show default theme on home, search, about, and privacy pages
    if (pathname === '/' || 
        pathname === '/search' || 
        pathname === '/about' || 
        pathname === '/privacy') {
      return 'default';
    }
    
    // Category-specific themes
    if (pathname.startsWith('/style')) return 'style';
    if (pathname.startsWith('/news')) return 'news';
    if (pathname.startsWith('/fiction')) return 'fiction';
    if (pathname.startsWith('/review')) return 'review';
    if (pathname.startsWith('/culture')) return 'culture';
    
    // No footer for other pages
    return null;
  };

  const theme = getFooterTheme();
  
  if (!theme) {
    return null;
  }

  return <Footer theme={theme} />;
} 
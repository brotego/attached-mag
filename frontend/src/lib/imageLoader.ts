export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // If the src is already an absolute URL, ensure it's HTTPS in production
  if (src.startsWith('http://') || src.startsWith('https://')) {
    if (process.env.NODE_ENV === 'production' && src.startsWith('http://')) {
      return src.replace('http://', 'https://');
    }
    return src;
  }

  // If it's a local image (starts with a slash), return it as is
  if (src.startsWith('/images/')) {
    return src;
  }

  // Otherwise, construct the full URL using the environment variable or fallback
  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://104.131.79.104:1337';
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // In production, ensure we're using HTTPS
  const finalBaseUrl = process.env.NODE_ENV === 'production' 
    ? baseUrl.replace('http://', 'https://')
    : baseUrl;
  
  // Return the full URL with width and quality parameters
  return `${finalBaseUrl}${normalizedSrc}?w=${width}&q=${quality || 75}`;
} 
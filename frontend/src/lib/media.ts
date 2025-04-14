export function getStrapiMedia(url: string | null): string | null {
  console.log('getStrapiMedia input URL:', url);
  
  if (!url) {
    console.log('URL is null, returning null');
    return null;
  }
  
  // If the URL is already absolute, return it as is
  if (url.startsWith('http://') || url.startsWith('https://')) {
    console.log('URL is absolute, returning as is:', url);
    return url;
  }
  
  // If the URL is a placeholder image, return it as is
  if (url.startsWith('/images/')) {
    console.log('URL is a placeholder image, returning as is:', url);
    return url;
  }

  // Return the URL as is since it's already relative
  console.log('Returning relative URL:', url);
  return url;
} 
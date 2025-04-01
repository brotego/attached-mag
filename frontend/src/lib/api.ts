import qs from 'qs';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://localhost:1337';

/**
 * Helper to make GET requests to Strapi API endpoints
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    // Merge default and user options
    const mergedOptions = {
      next: { revalidate: 60 },
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${STRAPI_API_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

    console.log('Fetching from:', requestUrl);

    // Trigger API call
    const response = await fetch(requestUrl, mergedOptions);
    
    if (!response.ok) {
      throw new Error(`API call failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Fetch hero section data from Strapi
 */
export async function getHero() {
  try {
    const path = '/hero';
    const urlParamsObject = {
      populate: '*',
    };
    
    const response = await fetchAPI(path, urlParamsObject);
    console.log('Hero response:', response);
    return response.data || null;
  } catch (error) {
    console.error('Error fetching hero:', error);
    return null;
  }
}

/**
 * Fetch featured articles from Strapi
 */
export async function getFeaturedArticles(set: 'first' | 'second') {
  try {
    const path = '/articles';
    const urlParamsObject = {
      filters: {
        is_featured: {
          $eq: true
        },
        featured_set: {
          $eq: set
        }
      },
      populate: {
        cover: {
          fields: ['url', 'width', 'height']
        },
        author: {
          fields: ['name']
        },
        category: {
          fields: ['name', 'svg_path']
        }
      },
    };
    
    const response = await fetchAPI(path, urlParamsObject);
    console.log(`${set} set articles response:`, response);
    
    // Transform the data to match the expected structure
    const transformedData = response.data.map((article: any) => {
      console.log('Article category:', article.category?.name);
      return {
        id: article.id,
        title: article.title,
        description: article.description,
        slug: article.slug,
        cover: {
          url: article.cover?.url || '',
          width: article.cover?.width || 800,
          height: article.cover?.height || 600
        },
        author: article.author ? {
          id: article.author.id,
          name: article.author.name
        } : null,
        category: {
          id: article.category.id,
          name: article.category.name.toLowerCase(),
          svg_path: article.category.svg_path
        }
      };
    });
    
    return transformedData;
  } catch (error) {
    console.error(`Error fetching ${set} set articles:`, error);
    return [];
  }
}

/**
 * Fetch Must Read section data from Strapi
 */
export async function getMustRead() {
  try {
    const path = '/must-read';
    const urlParamsObject = {
      populate: '*',
    };
    
    const response = await fetchAPI(path, urlParamsObject);
    console.log('Must Read response:', response);
    return response.data || null;
  } catch (error) {
    console.error('Error fetching must read:', error);
    return null;
  }
} 
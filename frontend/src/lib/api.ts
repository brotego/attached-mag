import qs from 'qs';

// Use environment variables with current working values as fallbacks
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://104.131.79.104:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || 'dd9beda9938ecf9f372d8d7dd796cd862452fcffe014b48cd5da12c4cb1b783f60c3a93893e8821419ba22b4b1678be684df6b482c7717626c7a7ef4da04a2d8b7b6f6963c655ca4cfbf52a1a5849d0d2a4ad228923017fb9edb426b01081c7f6c72cbf10a0d5025e7063ac08d51b2d96c1ba9d99ede3d7e5039f1cc14bf44cd';

interface StrapiArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  cover?: {
    url: string;
    width: number;
    height: number;
  };
  author?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
    svg_path: string;
  };
  is_featured?: boolean;
  featured_set?: 'first' | 'second';
}

interface SafeArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  content: string;
  publishedAt: string;
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
    svg_path: string | null;
  } | null;
  featured: boolean;
  featured_set: 'first' | 'second' | null;
}

interface StrapiArticleResponse {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    content: string;
    publishedAt: string;
    is_featured?: boolean;
    featured_set?: 'first' | 'second';
    cover?: {
      data: {
        id: number;
        attributes: {
          url: string;
          width: number;
          height: number;
        };
      };
    };
    author?: {
      data: {
        id: number;
        attributes: {
          name: string;
        };
      };
    };
    category?: {
      data: {
        id: number;
        attributes: {
          name: string;
          svg_path: string | null;
        };
      };
    };
  };
}

/**
 * Helper to make GET requests to Strapi API endpoints
 */
export async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    // Debug environment variables
    console.log('=== API Request Debug Info ===');
    console.log('Path:', path);
    console.log('URL Params:', urlParamsObject);
    console.log('STRAPI_API_URL:', STRAPI_API_URL);
    console.log('API Token exists:', !!STRAPI_API_TOKEN);

    // Check if we have an API token
    if (!STRAPI_API_TOKEN) {
      console.error('STRAPI_API_TOKEN is not set');
      throw new Error('API token is missing');
    }

    // Add cache-busting parameters
    const urlParamsWithCacheBust = {
      ...urlParamsObject,
      _t: Date.now(),
      _v: Math.random().toString(36).substring(2, 15),
      _cb: Math.random().toString(36).substring(2, 15)
    };

    // Merge default options with user options
    const mergedOptions = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${STRAPI_API_TOKEN}`
      },
      ...options,
      cache: 'no-store' as RequestCache,
      next: { revalidate: 0 }
    };

    // Build request URL
    const queryString = qs.stringify(urlParamsWithCacheBust, {
      encodeValuesOnly: true,
    });
    const requestUrl = `${STRAPI_API_URL}/api${path}${queryString ? `?${queryString}` : ''}`;

    // Log request details
    console.log('Making request to:', requestUrl);
    
    // Make the request with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(requestUrl, {
      ...mergedOptions,
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    // Log response details
    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error Response:', errorText);
      
      // Handle specific error cases
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API token.');
      } else if (response.status === 403) {
        throw new Error('Access forbidden. Please check your permissions.');
      } else if (response.status === 404) {
        throw new Error('Resource not found.');
      } else if (response.status === 500) {
        throw new Error('Server error. Please try again later.');
      } else {
        throw new Error(`API call failed: ${response.status} ${response.statusText} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('Response data structure:', {
      hasData: !!data.data,
      dataType: data.data ? (Array.isArray(data.data) ? 'array' : typeof data.data) : 'undefined',
      dataLength: Array.isArray(data.data) ? data.data.length : 'not an array'
    });
    
    return data;
  } catch (error: unknown) {
    console.error('Error in fetchAPI:', error);
    
    // Handle specific error cases
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please check your internet connection and try again.');
    } else if (error instanceof Error && error.name === 'AbortError') {
      throw new Error('Request timed out. Please try again.');
    }
    
    throw error;
  }
}

/**
 * Helper function to return mock data for build environments
 */
function getMockData(path: string) {
  console.log('Generating mock data for path:', path);
  
  if (path === '/hero') {
    return {
      data: {
        id: 1,
        title: 'Welcome to Attached Magazine',
        description: 'Your source for the latest in fashion, culture, and lifestyle.',
        backgroundImage: {
          id: 1,
          name: 'hero-image',
          url: '/Rectangle 715.jpg',
          width: 1920,
          height: 1080
        }
      }
    };
  }
  
  if (path === '/must-read') {
    return {
      data: {
        id: 1,
        title: 'Must Read',
        description: 'Our editors\' picks for the most important stories of the moment.',
        articles: [
          {
            id: 1,
            title: 'The Future of Fashion',
            description: 'Exploring sustainable practices in the fashion industry.',
            slug: 'future-of-fashion',
            cover: {
              url: '/Rectangle 739.jpg',
              width: 800,
              height: 600
            },
            author: {
              id: 1,
              name: 'Jane Doe'
            },
            category: {
              id: 1,
              name: 'Style',
              svg_path: '/style.svg'
            }
          },
          {
            id: 2,
            title: 'Cultural Shifts',
            description: 'How global events are reshaping our cultural landscape.',
            slug: 'cultural-shifts',
            cover: {
              url: '/Rectangle 740.jpg',
              width: 800,
              height: 600
            },
            author: {
              id: 2,
              name: 'John Smith'
            },
            category: {
              id: 2,
              name: 'Culture',
              svg_path: '/culture.svg'
            }
          }
        ]
      }
    };
  }
  
  if (path === '/articles') {
    return {
      data: [
        {
          id: 1,
          title: 'Featured Article 1',
          description: 'This is a featured article that would normally come from Strapi.',
          slug: 'featured-article-1',
          cover: {
            url: '/Rectangle 742.jpg',
            width: 800,
            height: 600
          },
          author: {
            id: 1,
            name: 'Jane Doe'
          },
          category: {
            id: 1,
            name: 'Style',
            svg_path: '/style.svg'
          },
          is_featured: true,
          featured_set: 'first'
        },
        {
          id: 2,
          title: 'Featured Article 2',
          description: 'Another featured article that would normally come from Strapi.',
          slug: 'featured-article-2',
          cover: {
            url: '/Rectangle 744.jpg',
            width: 800,
            height: 600
          },
          author: {
            id: 2,
            name: 'John Smith'
          },
          category: {
            id: 2,
            name: 'Culture',
            svg_path: '/culture.svg'
          },
          is_featured: true,
          featured_set: 'second'
        }
      ]
    };
  }
  
  // Default mock data
  return { data: null };
}

/**
 * Fetch hero section data from Strapi
 */
export async function getHero() {
  try {
    const path = '/hero';
    const urlParamsObject = {
      populate: {
        featured_article: {
          populate: {
            cover: {
              fields: ['url']
            }
          }
        }
      }
    };
    
    console.log('Fetching hero with params:', JSON.stringify(urlParamsObject, null, 2));
    const response = await fetchAPI(path, urlParamsObject);
    console.log('Raw Hero API Response:', JSON.stringify(response, null, 2));
    
    // Check the entire response structure
    if (!response?.data) {
      console.error('No data found in hero response');
      throw new Error('Hero data is missing from the API response');
    }

    // Log the data structure we received
    console.log('Hero data structure:', {
      hasData: !!response.data,
      dataKeys: Object.keys(response.data),
      attributes: response.data.attributes ? Object.keys(response.data.attributes) : 'no attributes',
    });

    // Return the data as is since we're handling the structure in the component
    return response.data;
  } catch (error) {
    console.error('Error fetching hero:', error);
    throw error;
  }
}

/**
 * Fetch featured articles from Strapi
 */
export async function getFeaturedArticles() {
  try {
    console.log('Fetching featured articles...');
    const response = await fetchAPI('/articles', {
      populate: '*',
      filters: {
        is_featured: {
          $eq: true
        }
      },
      sort: ['publishedAt:desc']
    });

    console.log('Raw featured articles response:', JSON.stringify(response, null, 2));

    if (!response.data) {
      console.error('No data in response:', response);
      return [];
    }

    console.log('Number of articles found:', response.data.length);
    
    const transformedArticles = response.data.map((article: any) => {
      console.log('Processing article:', article.id, article.title);
      const safeArticle: SafeArticle = {
        id: article.id,
        title: article.title,
        description: article.description,
        slug: article.slug,
        content: article.content || '',
        publishedAt: article.publishedAt,
        cover: article.cover ? {
          url: article.cover.url,
          width: article.cover.width || 800,
          height: article.cover.height || 600
        } : null,
        author: article.author ? {
          id: article.author.id,
          name: article.author.name
        } : null,
        category: article.category ? {
          id: article.category.id,
          name: article.category.name,
          svg_path: article.category.svg_path
        } : null,
        featured: article.is_featured || false,
        featured_set: article.featured_set || null
      };
      console.log('Transformed article:', safeArticle);
      return safeArticle;
    });

    console.log('Final transformed articles:', JSON.stringify(transformedArticles, null, 2));
    return transformedArticles;
  } catch (error) {
    console.error('Error fetching featured articles:', error);
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
    console.log('Must Read response:', JSON.stringify(response, null, 2));
    
    if (!response?.data) {
      console.error('No must read data found in response');
      throw new Error('Must Read data is missing from the API response');
    }
    
    // Transform the data to ensure it has the expected structure
    const transformedData = {
      id: response.data.id,
      Title: response.data.Title || '',
      Description: response.data.Description || [],
      Image: response.data.Image ? {
        data: {
          id: response.data.Image.id,
          attributes: {
            name: response.data.Image.name,
            url: response.data.Image.url,
            width: response.data.Image.width,
            height: response.data.Image.height
          }
        }
      } : null,
      ButtonText: response.data.ButtonText || '',
      Buttonurl: response.data.Buttonurl || '#',
      author: response.data.author ? {
        id: response.data.author.id,
        name: response.data.author.name
      } : null
    };
    
    console.log('Transformed Must Read data:', JSON.stringify(transformedData, null, 2));
    return transformedData;
  } catch (error) {
    console.error('Error fetching must read:', error);
    throw error;
  }
}

export async function getArticlesByCategory(categorySlug: string) {
  console.log('Fetching articles for category:', categorySlug);
  
  try {
    const path = '/articles';
    const urlParamsObject = {
      filters: {
        category: {
          slug: categorySlug
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
    
    console.log('API request params:', JSON.stringify(urlParamsObject, null, 2));
    const response = await fetchAPI(path, urlParamsObject);
    console.log('Raw API response:', JSON.stringify(response, null, 2));
    
    if (!response.data || !Array.isArray(response.data)) {
      console.log('No articles found for category:', categorySlug);
      return [];
    }

    // Transform the data to match the expected structure
    const transformedData = response.data.map((article: any): SafeArticle | null => {
      console.log('Processing article:', article);

      if (!article) {
        console.log('Skipping null/undefined article');
        return null;
      }

      const safeArticle: SafeArticle = {
        id: article.id || 0,
        title: article.title || '',
        description: article.description || '',
        slug: article.slug || '',
        content: article.content || '',
        publishedAt: article.publishedAt || '',
        cover: null,
        author: null,
        category: null,
        featured: article.is_featured || false,
        featured_set: article.featured_set || null
      };

      if (article.cover) {
        safeArticle.cover = {
          url: article.cover.url,
          width: article.cover.width || 800,
          height: article.cover.height || 600
        };
      }

      if (article.author) {
        safeArticle.author = {
          id: article.author.id || 0,
          name: article.author.name || 'Unknown Author'
        };
      }

      if (article.category) {
        safeArticle.category = {
          id: article.category.id || 0,
          name: article.category.name || '',
          svg_path: article.category.svg_path || ''
        };
      }

      console.log('Transformed article:', safeArticle);
      return safeArticle;
    }).filter((article: SafeArticle | null): article is SafeArticle => article !== null);

    console.log('Final transformed articles:', transformedData);
    return transformedData;
  } catch (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }
}

export async function getAllCategories() {
  console.log('Fetching categories...');
  
  try {
    const path = '/categories';
    const urlParamsObject = {
      populate: '*'
    };
    
    const response = await fetchAPI(path, urlParamsObject);
    console.log('Categories API response:', response);
    
    if (!response.data || !Array.isArray(response.data)) {
      console.log('No categories found in response, using fallback');
      return getFallbackCategories();
    }
    
    const categories = response.data.map((category: any) => ({
      id: category.id,
      name: category.attributes.name,
      slug: category.attributes.slug,
      svg_path: category.attributes.svg_path,
    }));
    
    console.log('Processed categories:', categories);
    return categories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return getFallbackCategories();
  }
}

function getFallbackCategories() {
  return [
    { id: 1, name: 'Style', slug: 'style', svg_path: '/style.svg' },
    { id: 2, name: 'News', slug: 'news', svg_path: '/news.svg' },
    { id: 3, name: 'Fiction', slug: 'fiction', svg_path: '/fiction.svg' },
    { id: 4, name: 'Review', slug: 'review', svg_path: '/review.svg' },
    { id: 5, name: 'Culture', slug: 'culture', svg_path: '/culture.svg' },
  ];
} 
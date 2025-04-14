import { getFeaturedArticles, getMustRead, getHero } from '@/lib/api';
import FeaturedArticles from '@/components/common/FeaturedArticles';
import Hero from '@/components/common/Hero';

export default async function Home() {
  console.log('Starting Home page render...');
  try {
    console.log('Fetching hero data...');
    // Fetch hero data first to debug
    const heroData = await getHero();
    console.log('Hero Data:', heroData);

    console.log('Fetching featured articles and must read data...');
    // Fetch other data
    const [featuredArticles, mustReadData] = await Promise.all([
      getFeaturedArticles(),
      getMustRead()
    ]);

    // Debug logs
    console.log('Featured Articles:', featuredArticles);
    console.log('Must Read Data:', mustReadData);
    console.log('Fetched Featured Articles:', featuredArticles);

    // If no hero data, show error
    if (!heroData) {
      console.error('No hero data found');
      return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
          <div className="max-w-2xl mx-auto p-4 text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Content Loading Error</h1>
            <p className="text-gray-800 mb-4">Unable to load the hero section content.</p>
            <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg text-left">
              <p>Troubleshooting steps:</p>
              <ul className="list-disc list-inside mt-2">
                <li>Check if Strapi is running (http://localhost:1337)</li>
                <li>Verify API token in .env.local file</li>
                <li>Ensure hero content exists in Strapi admin</li>
              </ul>
            </div>
          </div>
        </main>
      );
    }

    console.log('Rendering page with data...');
    return (
      <main>
        <Hero data={heroData} />
        {featuredArticles && featuredArticles.length > 0 && (
          <FeaturedArticles articles={featuredArticles} />
        )}
      </main>
    );
  } catch (error) {
    console.error('Error in Home page:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-2xl mx-auto p-4 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Content Loading Error</h1>
          <p className="text-gray-800 mb-4">We're having trouble connecting to our content service.</p>
          <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg text-left">
            <p>Troubleshooting steps:</p>
            <ul className="list-disc list-inside mt-2">
              <li>Check if Strapi is running (http://localhost:1337)</li>
              <li>Verify API token in .env.local file</li>
              <li>Ensure content exists in Strapi admin</li>
              <li>Try refreshing the page</li>
            </ul>
            <p className="mt-2 text-red-500">Error details: {errorMessage}</p>
          </div>
        </div>
      </main>
    );
  }
}

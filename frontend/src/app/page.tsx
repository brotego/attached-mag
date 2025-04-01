import { getFeaturedArticles, getMustRead, getHero } from '@/lib/api';
import FeaturedArticles from '@/components/common/FeaturedArticles';
import MustRead from '@/components/common/MustRead';
import Hero from '@/components/common/Hero';

export default async function Home() {
  try {
    // Fetch hero data first to debug
    const heroData = await getHero();
    console.log('Hero Data:', heroData);

    // Fetch other data
    const [firstSetArticles, secondSetArticles, mustReadData] = await Promise.all([
      getFeaturedArticles('first'),
      getFeaturedArticles('second'),
      getMustRead()
    ]);

    // Debug logs
    console.log('First Set Articles:', firstSetArticles);
    console.log('Second Set Articles:', secondSetArticles);
    console.log('Must Read Data:', mustReadData);

    // If no hero data, show error
    if (!heroData) {
      return (
        <main className="min-h-screen flex items-center justify-center bg-gray-100">
          <p className="text-xl text-gray-800">Loading content... Please make sure Strapi is running and content is published.</p>
        </main>
      );
    }

    return (
      <main>
        <Hero data={heroData} />
        {firstSetArticles && firstSetArticles.length > 0 && (
          <FeaturedArticles articles={firstSetArticles} />
        )}
        <MustRead data={mustReadData} />
        {secondSetArticles && secondSetArticles.length > 0 && (
          <FeaturedArticles articles={secondSetArticles} />
        )}
      </main>
    );
  } catch (error) {
    console.error('Error fetching data:', error);
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Content</h1>
          <p className="text-gray-800">Please check:</p>
          <ul className="list-disc pl-5 mt-2 text-gray-700">
            <li>Strapi server is running (npm run develop in strapi-attatchedmag folder)</li>
            <li>Content is created and published in Strapi admin (http://localhost:1337/admin)</li>
            <li>Environment variables are set correctly (.env.local file)</li>
          </ul>
        </div>
      </main>
    );
  }
}

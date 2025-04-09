'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      router.push(`/plan/${data.id}`);
    } catch (error) {
      console.error('Error generating plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-bold text-blue-600">
              TravelPlannerAI
            </a>
            <div className="space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600">
                How it works
              </a>
              <a href="#community" className="text-gray-600 hover:text-blue-600">
                Community Plans
              </a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600">
                Pricing
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl font-bold mb-8">
              <span className="gradient-text">Uncover the</span>
              <br />
              AI Travel Plan
            </h1>
            
            <div className="relative mb-12">
              <div className="floating-balloon absolute left-1/2 -translate-x-1/2 -top-24">
                <Image
                  src="/hot-air-balloon.svg"
                  alt="Hot Air Balloon"
                  width={120}
                  height={160}
                  className="w-auto h-auto"
                  priority
                />
              </div>
              <p className="text-xl text-gray-600 mb-4">
                Imagine telling your travel planner,
              </p>
              <p className="text-2xl font-medium text-gray-800 mb-8 italic">
                'Weekend escape to a vibrant city,
                <br />
                with mid-range budget in summer.'
              </p>
              <p className="text-xl text-gray-600">
                Our AI not only understands but crafts a personalized adventure. Discover local secrets, 
                savor culinary delights, and explore iconic landmarks with an itinerary designed just for you.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., Weekend trip to Paris with $1000 budget"
                  className="w-full px-6 py-4 text-lg border-2 border-blue-100 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  required
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="absolute right-2 top-2 bg-blue-600 text-white px-8 py-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 font-medium"
                >
                  {isLoading ? 'Planning...' : 'Try Now - 1 Free Credit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
} 
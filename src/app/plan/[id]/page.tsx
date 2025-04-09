'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Activity {
  time: string;
  activity: string;
  description: string;
  cost: string;
}

interface Day {
  day: number;
  activities: Activity[];
}

interface Accommodation {
  name: string;
  type: string;
  price: string;
  description: string;
}

interface Transportation {
  type: string;
  details: string;
  cost: string;
}

interface Plan {
  destination: string;
  duration: string;
  budget: string;
  summary: string;
  itinerary: Day[];
  accommodation: {
    recommendations: Accommodation[];
  };
  transportation: {
    recommendations: Transportation[];
  };
  tips: string[];
}

export default function PlanPage() {
  const { id } = useParams();
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(`/api/plans/${id}`);
        const data = await response.json();
        setPlan(data.plan);
      } catch (error) {
        console.error('Error fetching plan:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your travel plan...</p>
        </div>
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Plan not found</h1>
          <p className="mt-2 text-gray-600">The requested travel plan could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {plan.destination}
            </h1>
            <div className="flex items-center space-x-4 text-gray-600 mb-6">
              <span>{plan.duration}</span>
              <span>•</span>
              <span>{plan.budget}</span>
            </div>
            <p className="text-lg text-gray-700">{plan.summary}</p>
          </div>

          <div className="space-y-8">
            {plan.itinerary.map((day) => (
              <div key={day.day} className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Day {day.day}
                </h2>
                <div className="space-y-6">
                  {day.activities.map((activity, index) => (
                    <div key={index} className="border-l-4 border-blue-500 pl-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {activity.time} - {activity.activity}
                          </h3>
                          <p className="text-gray-600 mt-2">
                            {activity.description}
                          </p>
                        </div>
                        <span className="text-blue-600 font-medium">
                          {activity.cost}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Accommodation
              </h2>
              <div className="space-y-6">
                {plan.accommodation.recommendations.map((acc, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {acc.name}
                    </h3>
                    <p className="text-gray-600 mt-2">{acc.description}</p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-gray-500">{acc.type}</span>
                      <span className="text-blue-600 font-medium">
                        {acc.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Transportation
              </h2>
              <div className="space-y-6">
                {plan.transportation.recommendations.map((trans, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {trans.type}
                    </h3>
                    <p className="text-gray-600 mt-2">{trans.details}</p>
                    <div className="flex justify-end mt-4">
                      <span className="text-blue-600 font-medium">
                        {trans.cost}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Travel Tips</h2>
            <ul className="space-y-4">
              {plan.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 
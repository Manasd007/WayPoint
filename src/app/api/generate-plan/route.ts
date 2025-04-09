import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { storePlan } from '../plans/[id]/route';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are a professional travel planner. Create a detailed travel plan based on the user's request.
          Format the response as a JSON object with the following structure:
          {
            "destination": "string",
            "duration": "string",
            "budget": "string",
            "summary": "string",
            "itinerary": [
              {
                "day": number,
                "activities": [
                  {
                    "time": "string",
                    "activity": "string",
                    "description": "string",
                    "cost": "string"
                  }
                ]
              }
            ],
            "accommodation": {
              "recommendations": [
                {
                  "name": "string",
                  "type": "string",
                  "price": "string",
                  "description": "string"
                }
              ]
            },
            "transportation": {
              "recommendations": [
                {
                  "type": "string",
                  "details": "string",
                  "cost": "string"
                }
              ]
            },
            "tips": [
              "string"
            ]
          }`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
    });

    const plan = JSON.parse(completion.choices[0].message.content || '{}');
    
    // Generate a unique ID for the plan
    const id = Math.random().toString(36).substring(2, 15);
    
    // Store the plan
    storePlan(id, plan);
    
    return NextResponse.json({ id, plan });
  } catch (error) {
    console.error('Error generating plan:', error);
    return NextResponse.json(
      { error: 'Failed to generate travel plan' },
      { status: 500 }
    );
  }
} 
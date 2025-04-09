import { NextResponse } from 'next/server';

// In a real application, this would be stored in a database
// For now, we'll use a simple in-memory store
const plans = new Map();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const plan = plans.get(params.id);
  
  if (!plan) {
    return NextResponse.json(
      { error: 'Plan not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ plan });
}

// This is a helper function to store plans
// In a real application, this would be handled by the database
export function storePlan(id: string, plan: any) {
  plans.set(id, plan);
} 
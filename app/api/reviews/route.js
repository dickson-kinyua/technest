import { NextResponse } from 'next/server';
import Review from '../../../models/Review';
import { connectDB } from '../../../lib/db';
import User from '../../../models/User';

export async function GET(req) {
  const productId = req.nextUrl.searchParams.get('productId');
  if (!productId) return NextResponse.json([], { status: 200 });

  await connectDB();

  const reviews = await Review.find({ product: productId })
    .sort({ createdAt: -1 })
    .populate('user', 'name');

  return NextResponse.json(reviews);
}

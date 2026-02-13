import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { connectDB } from '@/lib/db';
import Product from '../../../../models/Product';
import User from '../../../../models/User';
import Review from '../../../../models/Review';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId, rating, comment } = await req.json();

    if (!productId || !rating || !comment) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: session?.user?.email });
    if (!user)
      return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const product = await Product.findById(productId);
    if (!product)
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });

    const review = await Review.create({
      product: product._id,
      user: user._id,
      rating,
      comment,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to add review' },
      { status: 500 }
    );
  }
}

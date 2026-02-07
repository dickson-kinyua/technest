import { NextResponse } from 'next/server';
import { connectDB } from '../../../lib/db';
import Cart from '../../../models/Cart';
import { getCurrentUser } from '../../../lib/getCurrentUser';

export async function GET() {
  await connectDB();
  console.log('Connected to database fetching cart');

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }
  console.log('Current user:', user);

  const cart = await Cart.findOne({ user: user._id }).populate('items.product');

  return NextResponse.json({ cart });
}

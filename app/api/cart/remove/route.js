import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Cart from '../../../../models/Cart';
import { getCurrentUser } from '../../../../lib/getCurrentUser';
export async function POST(req) {
  await connectDB();

  const user = getCurrentUser();
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { productId } = await req.json();

  const cart = await Cart.findOne({ user: user.id });
  if (!cart) {
    return NextResponse.json({ cart: null });
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );

  await cart.save();

  return NextResponse.json({ cart });
}

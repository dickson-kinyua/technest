import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Cart from '../../../../models/Cart';
import { getCurrentUser } from '../../../../utils/auth';
// import { getCurrentUser } from '../../../../lib/getCurrentUser';
export async function POST(req) {
  const user = await getCurrentUser();
  await connectDB();

  const { productId } = await req.json();
  const prodId = productId.toString();
  console.log('Incoming ID:', prodId);
  // console.log(productId);

  const cart = await Cart.findOne({ user: user.id });
  if (!cart) {
    return NextResponse.json({ cart: null });
  }

  console.log(
    'Cart items:',
    cart.items.map((i) => i.product.toString())
  );

  cart.items = cart.items.filter((item) => item.product.toString() !== prodId);
  console.log(
    'Cart items:',
    cart.items.map((i) => i.product.toString())
  );
  await cart.save();
  console.log(
    'Cart items:',
    cart.items.map((i) => i.product.toString())
  );

  return NextResponse.json({ cart });
}

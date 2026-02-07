import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/db';
import Cart from '../../../../models/Cart';
import { getCurrentUser } from '../../../../lib/getCurrentUser';

export async function POST(req) {
  await connectDB();

  const user = await getCurrentUser(); // <--- add await
  if (!user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  // console.log(user);

  const { productId, quantity = 1 } = await req.json();
  console.log('productId:', productId, 'quantity:', quantity);

  let cart = await Cart.findOne({ user: user._id }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({
      user: user._id,
      items: [{ product: productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
  }

  return NextResponse.json({ cart });
}

import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Cart from '../../../models/Cart';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await connectDB();

  const cart = await Cart.findOne({ user: session?.user?.id }).populate(
    'items.product'
  );

  if (!cart || cart.items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const lineItems = cart.items.map((item) => ({
    price_data: {
      currency: 'usd',
      product_data: {
        name: item.product.title,
      },
      unit_amount: item.product.price * 100,
    },
    quantity: item.quantity,
  }));

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXTAUTH_URL}/success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
  });

  return NextResponse.json({ url: stripeSession.url });
}

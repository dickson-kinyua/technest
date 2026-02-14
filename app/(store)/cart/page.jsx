import { connectDB } from '@/lib/db';
import Link from 'next/link';
import Image from 'next/image';
import Cart from '../../../models/Cart';
import Product from '../../../models/Product';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import CheckoutButton from '../../../components/CheckOutButton';

export default async function CartPage() {
  // Get session using NextAuth instead of custom getCurrentUser
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect('/login?callbackUrl=/cart');
  }

  await connectDB();

  const cart = await Cart.findOne({ user: session.user.id }).populate(
    'items.product'
  );

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <p className="text-gray-500 text-lg">Your cart is empty</p>
            <Link
              href="/products"
              className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate total
  const total = cart.items.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="hidden md:grid grid-cols-12 gap-4 p-6 bg-gray-50 border-b text-sm font-medium text-gray-700">
                <div className="col-span-5">Product</div>
                <div className="col-span-3 text-center">Quantity</div>
                <div className="col-span-2 text-right">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {cart.items.map((item) => (
                <div
                  key={item._id}
                  className="p-6 border-b last:border-b-0 hover:bg-gray-50 transition duration-150"
                >
                  <div className="flex flex-col md:grid md:grid-cols-12 md:gap-4 items-center">
                    {/* Product Info */}
                    <div className="md:col-span-5 flex items-center space-x-4 mb-4 md:mb-0">
                      <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                        {item.product.images ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.title}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400">Image</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item.product.category || 'Product'}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-3 flex items-center justify-center mb-4 md:mb-0">
                      <div className="flex items-center space-x-2">
                        <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200">
                          <span className="text-lg">-</span>
                        </button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button className="w-8 h-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200">
                          <span className="text-lg">+</span>
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 text-right mb-4 md:mb-0">
                      <p className="font-medium text-gray-900">
                        ${item.product.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 text-right">
                      <p className="font-medium text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button className="mt-2 text-sm text-red-600 hover:text-red-800 transition duration-200">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white shadow rounded-lg p-6 sticky top-8">
              <h2 className="text-lg font-bold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">
                    ${(total * 0.08).toFixed(2)}
                  </span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <CheckoutButton />

              <Link
                href="/products"
                className="block text-center text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

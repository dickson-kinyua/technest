import { FaArrowRight } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { connectDB } from '../../../../lib/db';
import Product from '@/models/Product';
import AddToCartButton from '../../../../components/AddToCartButton';
import Link from 'next/link';
import Details from '../../../../components/Details';
import Reviews from '../../../../components/Reviews';
import ProductTabs from '../../../../components/ProductTabs';

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  await connectDB();

  let product = await Product.findOne({ slug }).lean();

  if (!product) notFound();

  product = JSON.parse(JSON.stringify(product));

  // Tabs
  const tabs = [
    { name: 'Details', component: <Details product={product} /> },
    { name: 'Reviews', component: <Reviews productId={product._id} /> },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* ================= PRODUCT IMAGES ================= */}
        {product.images?.length > 0 && (
          <div className="lg:sticky lg:top-24 self-start">
            {/* Main Image */}
            <div className="relative aspect-square bg-gray-50 rounded-3xl border border-gray-200 overflow-hidden flex items-center justify-center">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={700}
                height={700}
                priority
                className="
              w-full
              h-full
              object-contain
              p-8
              sm:p-12
              hover:scale-105
              transition-transform duration-500
            "
              />

              {/* Image Counter */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-sm text-white text-xs font-medium">
                {product.images.length} Images
              </div>
            </div>

            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3 mt-4">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    className="
                  aspect-square
                  rounded-xl
                  border border-gray-200
                  bg-gray-50
                  overflow-hidden
                  cursor-pointer
                  hover:border-teal-400
                  hover:shadow-md
                  transition-all
                "
                  >
                    <Image
                      src={img}
                      alt={`${product.title} ${idx + 1}`}
                      width={150}
                      height={150}
                      className="
                    w-full
                    h-full
                    object-contain
                    p-2
                  "
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= PRODUCT INFO ================= */}
        <div className="flex flex-col">
          {/* Category */}
          {product.category && (
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-teal-500 mb-3">
              {product.category}
            </p>
          )}

          {/* Product Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
            {product.title}
          </h1>

          {/* Rating / Product Meta */}
          <div className="flex items-center gap-3 mt-4">
            <div className="flex text-yellow-400">★★★★★</div>

            <span className="text-sm text-gray-500">No reviews yet</span>
          </div>

          {/* Price */}
          <div className="mt-6 pb-6 border-b border-gray-200">
            <p className="text-3xl sm:text-4xl font-black text-slate-900">
              USD {product.price.toFixed(2)}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Price includes applicable taxes
            </p>
          </div>

          {/* Stock */}
          <div className="mt-6">
            {product.stock > 0 ? (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-green-700">
                  In stock — {product.stock} available
                </span>
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-sm font-semibold text-red-600">
                  Out of stock
                </span>
              </div>
            )}
          </div>

          {/* Add To Cart */}
          <div className="mt-6">
            <AddToCartButton
              productId={product._id.toString()}
              slug={product.slug}
            />
          </div>

          {/* Continue Shopping */}
          <Link
            href="/products"
            className="
          mt-5
          flex
          items-center
          justify-center
          gap-2
          w-full
          py-3
          rounded-xl
          border
          border-gray-200
          text-gray-600
          font-medium
          hover:border-teal-400
          hover:text-teal-600
          hover:bg-teal-50
          transition-all
        "
          >
            <span>Continue shopping</span>
            <FaArrowRight size={16} />
          </Link>

          {/* Product Benefits */}
          <div className="grid grid-cols-3 gap-3 mt-8">
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
              <div className="text-xl mb-1">🚚</div>
              <p className="text-xs font-semibold text-gray-700">
                Fast Delivery
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
              <div className="text-xl mb-1">🔒</div>
              <p className="text-xs font-semibold text-gray-700">
                Secure Payment
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-center">
              <div className="text-xl mb-1">✓</div>
              <p className="text-xs font-semibold text-gray-700">
                Quality Products
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-10 border-t border-gray-200 pt-6">
            <ProductTabs tabs={tabs} />
          </div>
        </div>
      </div>
    </div>
  );
}

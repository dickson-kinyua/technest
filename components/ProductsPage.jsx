import Image from 'next/image';
import Link from 'next/link';

async function getProducts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
      {products.map((product) => (
        <Link
          href={`/products/${product.slug}`}
          key={product._id}
          className="
        group
        bg-white
        rounded-2xl
        border border-gray-200
        overflow-hidden
        shadow-sm
        hover:shadow-xl
        hover:-translate-y-1
        hover:border-teal-200
        transition-all duration-300
      "
        >
          {/* Product Image */}
          <div className="relative aspect-square bg-gray-50 overflow-hidden">
            <Image
              src={product.images[0]}
              width={300}
              height={300}
              alt={product.title}
              className="
            w-full
            h-full
            object-contain
            p-4
            group-hover:scale-105
            transition-transform duration-500
          "
            />

            {/* Quick View */}
            <div
              className="
            absolute
            bottom-3
            left-1/2
            -translate-x-1/2
            translate-y-10
            group-hover:translate-y-0
            opacity-0
            group-hover:opacity-100
            transition-all duration-300
          "
            >
              <span
                className="
            bg-slate-900
            text-white
            text-xs
            font-semibold
            px-4
            py-2
            rounded-full
            shadow-lg
          "
              >
                View Product
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4">
            {/* Category */}
            {product.category && (
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-500 mb-1">
                {product.category}
              </p>
            )}

            {/* Title */}
            <h2
              className="
            font-semibold
            text-gray-900
            text-sm
            sm:text-base
            truncate
            group-hover:text-teal-600
            transition
          "
            >
              {product.title}
            </h2>

            {/* Price */}
            <div className="flex items-center justify-between mt-3">
              <p className="text-lg font-bold text-slate-900">
                ${product.price}
              </p>

              {/* Arrow */}
              <div
                className="
              w-8
              h-8
              rounded-full
              bg-gray-100
              flex
              items-center
              justify-center
              text-gray-500
              group-hover:bg-teal-500
              group-hover:text-white
              transition-all duration-300
            "
              >
                →
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

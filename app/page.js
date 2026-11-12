import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

import CopyRightSection from '@/components/CopyRightSection';

async function getProducts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL}/api/products`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  return res.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className=" bg-gray-50 w-full grid grid-cols-1 px-2 sm:px-6 lg:px-8">
      <Header />
      {/* <Ads /> */}
      <SearchBar />

      {/* Product grid */}
      {products.length > 0 && (
        <div className="  grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-4 gap-2 mt-2">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`} // ✅ link to product details page
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent"
            >
              {/* Image container */}
              <div className="relative h-32 overflow-hidden bg-gray-100">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="font-medium text-gray-900 text-sm mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold text-gray-900">
                    ${product.price}
                  </p>

                  {/* Optional: Rating placeholder */}
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-sm text-gray-600">5</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
      <CopyRightSection />
    </div>
  );
}

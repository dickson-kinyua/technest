import Header from '@/components/Header';
import Image from 'next/image';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';

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
    <div className=" bg-gray-50 flex flex-col gap-0 px-2 sm:px-6 lg:px-8">
      <Header />

      <div
        className="mb-2 text-center bg-cover bg-center bg-no-repeat relative"
        style={{ backgroundImage: "url('bg2.jpg')" }}
      >
        {/* Optional overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative z-10 py-20 px-4">
          <h1 className="text-4xl font-extrabold text-white my-4">
            Welcome to Technest
          </h1>
          <p className="text-lg text-white">
            Your one-stop shop for all your tech needs
          </p>
        </div>
      </div>
      <SearchBar />

      {/* Product grid */}
      {products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mt-2">
          {products.map((product) => (
            <Link
              key={product._id}
              href={`/products/${product.slug}`} // ✅ link to product details page
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-transparent"
            >
              {/* Image container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
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
                <h2 className="font-medium text-gray-900 text-lg mb-2 line-clamp-2">
                  {product.title}
                </h2>

                <div className="flex items-center justify-between">
                  <p className="text-2xl font-semibold text-gray-900">
                    ${product.price}
                  </p>

                  {/* Optional: Rating placeholder */}
                  <div className="flex items-center gap-1">
                    <span className="text-amber-400">★</span>
                    <span className="text-sm text-gray-600">4.8</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

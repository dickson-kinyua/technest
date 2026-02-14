import Image from 'next/image';
import Link from 'next/link';

async function getProducts(search) {
  const res = await fetch(`/api/products?search=${search || ''}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  return res.json();
}

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams; // unwrap promise
  const search = params?.search || '';
  const products = await getProducts(search);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search header */}
        {search && (
          <div className="mb-6">
            <p className="text-gray-600 text-lg text-center italic">
              Showing results for{' '}
              <span className="relative inline-block">
                <span className="absolute -inset-1 bg-amber-100 rounded-lg blur-sm"></span>
                <strong className="relative text-gray-900 px-3 py-1">
                  &quot;{search}&quot;
                </strong>
              </span>
            </p>
          </div>
        )}

        {/* Empty state */}
        {products.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter to find what you're looking
              for.
            </p>
          </div>
        )}

        {/* Product grid */}
        {products.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
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
    </div>
  );
}

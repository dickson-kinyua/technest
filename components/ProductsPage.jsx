import Image from 'next/image';
import Link from 'next/link';

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch products');

  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 gap-2 mt-10">
      {products.map((product) => (
        <Link
          href={`/products/${product.slug}`}
          key={product._id}
          className=" bg-white p-4 rounded"
        >
          <Image
            src={product.images.map((img) => img)[0]}
            width={300}
            height={300}
            alt={product.title}
          />
          <h2 className="font-bold w-32 truncate">{product.title}</h2>
          <p>${product.price}</p>
        </Link>
      ))}
    </div>
  );
}

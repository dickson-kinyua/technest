import Image from 'next/image';

async function getProducts() {
  const res = await fetch('http://localhost:3000/api/products', {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch products');
  // console.log(res.json());
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="grid grid-cols-2 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="border flex flex-col gap-4 p-4 rounded"
        >
          <Image
            src={product.images.map((img) => img)[0]}
            width={300}
            height={300}
            alt={product.title}
          />
          <h2 className="font-bold">{product.title}</h2>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
}

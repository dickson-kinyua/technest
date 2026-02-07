import { FaArrowLeft } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { connectDB } from '../../../../lib/db';
import Product from '@/models/Product';
import AddToCartButton from '../../../../components/AddToCartButton';
import Link from 'next/link';

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  await connectDB();

  let product = await Product.findOne({ slug: slug }).lean();

  if (!product) {
    notFound();
  }

  // Convert any remaining non-serializable fields
  product = JSON.parse(JSON.stringify(product));

  return (
    <div className="relative w-full mx-auto p-6">
      <Link
        href="/"
        className="ml-2 w-full sticky top-0 flex flex-row gap-1 mb-5 text-blue-600 underline"
      >
        <FaArrowLeft size={20} />
        <p>Back</p>
      </Link>
      <h2 className="block p-2 bg-gray-50 sticky top-0">
        Product details page
      </h2>

      {product.images && product.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-6">
          {product.images.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={product.title}
              className="rounded-lg"
              width={500}
              height={500}
            />
          ))}
        </div>
      )}

      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl font-semibold mt-4 text-red-600">
        USD {product.price}
      </p>
      <p>{product.stock} units available</p>

      <div className="text-gray-600 mt-2 block h-52 border border-gray-300 overflow-y-scroll p-3">
        {product.description}
      </div>

      <AddToCartButton productId={product._id} />
    </div>
  );
}

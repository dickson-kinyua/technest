import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { connectDB } from '../../../../lib/db';
import Product from '@/models/Product';
import AddToCartButton from '../../../../components/AddToCartButton';
import Link from 'next/link';
import Details from '../../../../components/Details';
import Reviews from '../../../../components/Reviews';
import ProductTabs from '../../../../components/ProductTabs'; // 👈 import tabs

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  await connectDB();

  let product = await Product.findOne({ slug }).lean();

  if (!product) {
    notFound();
  }

  product = JSON.parse(JSON.stringify(product));

  // Define tabs and pass product to components
  const tabs = [
    { name: 'Details', component: <Details product={product} /> },
    { name: 'Reviews', component: <Reviews productId={product._id} /> },
  ];

  return (
    <div className="relative w-full mb-14 mx-auto p-6">
      {/* <Link
        href="/"
        className="ml-2 w-full sticky top-0 flex flex-row gap-1 mb-5 text-blue-600 underline"
      >
        <FaArrowLeft size={20} />
        <p>Back</p>
      </Link> */}

      {product.images && product.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4">
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

      <AddToCartButton productId={product._id.toString()} slug={product.slug} />
      <Link
        href="/products"
        className=" w-full flex flex-row items-center gap-1 mt-5 text-blue-600 underline"
      >
        <p>Continue shopping</p>
        <FaArrowRight size={20} />
      </Link>

      {/* Tabs Component */}
      <ProductTabs tabs={tabs} />
    </div>
  );
}

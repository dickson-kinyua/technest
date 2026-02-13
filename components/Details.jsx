export default function Details({ product }) {
  return (
    <div className="text-gray-600 mt-4 border border-gray-300 p-4 rounded">
      {product.description}
    </div>
  );
}

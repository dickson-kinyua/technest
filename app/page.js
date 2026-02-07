import ProductsPage from '@/components/ProductsPage';
// import Footer from '@/components/Footer';
import SearchBarWrapper from '@/components/SearchBarWrapper';

export default function Home() {
  return (
    <div className="flex p-4 text-gray-800 justify-center bg-zinc-50 font-sans dark:bg-black">
      <SearchBarWrapper />
      <ProductsPage />
    </div>
  );
}

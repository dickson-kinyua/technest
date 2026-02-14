import Header from '@/components/Header';

export default function SuccessPage() {
  return (
    <div className=" flex flex-col gap-20 items-center justify-center bg-gray-50">
      <Header />
      <div className="bg-white shadow-lg rounded-lg p-8 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">
          Payment Successful 🎉
        </h1>
        <p className="text-gray-600">Thank you for your purchase!</p>
      </div>
    </div>
  );
}

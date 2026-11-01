export default function Input({ className = '', ...props }) {
  return (
    <input
      {...props}
      className={`w-full px-4 py-2.5 rounded-lg 
           border border-gray-200 
           shadow-sm 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           transition ${className}`}
    />
  );
}

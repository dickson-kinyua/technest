import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

export default function CopyRightSection() {
  return (
    <footer className="bg-gray-100 text-gray-800 px-6 py-10 mt-20 text-[14px]">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-10">
        {/* Branding & Socials */}
        <div className="flex flex-col gap-4 md:w-1/3">
          <p className="text-teal-500 font-bold text-xl">TechNest</p>
          <p className="text-gray-600">
            Your reliable one-stop shop for all your tech needs
          </p>
          <div className="flex flex-row gap-4 text-teal-500">
            <Link href="/" className="hover:text-teal-600 transition">
              <FaInstagram size={22} />
            </Link>
            <Link href="/" className="hover:text-teal-600 transition">
              <FaTwitter size={22} />
            </Link>
            <Link href="/" className="hover:text-teal-600 transition">
              <FaYoutube size={22} />
            </Link>
            <Link href="/" className="hover:text-teal-600 transition">
              <FaFacebook size={22} />
            </Link>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2 md:w-1/4 ">
          <p className="font-semibold mb-2">Quick Links</p>
          <Link href="/" className="hover:text-teal-500 transition">
            Home
          </Link>
          <Link href="/products" className="hover:text-teal-500 transition">
            Products
          </Link>
          <Link href="/cart" className="hover:text-teal-500 transition">
            Cart
          </Link>
          <Link href="/account" className="hover:text-teal-500 transition">
            Account
          </Link>
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-2 md:w-1/4">
          <p className="font-semibold mb-2">Legal</p>
          <Link href="/" className="hover:text-teal-500 transition">
            Privacy Policy
          </Link>
          <Link href="/" className="hover:text-teal-500 transition">
            Terms of Service
          </Link>
          <Link href="/" className="hover:text-teal-500 transition">
            Refund Policy
          </Link>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t border-gray-300 pt-4">
        <p className="text-center text-gray-500 text-sm">
          © 2025 TechNest. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

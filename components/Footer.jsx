'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';

export default function Footer() {
  const pathname = usePathname();

  const links = [
    { name: 'Home', href: '/', icon: <FaHome /> },
    { name: 'Cart', href: '/cart', icon: <FaShoppingCart /> },
    { name: 'Account', href: '/account', icon: <FaUser /> },
  ];

  return (
    <footer className="fixed bottom-0 left-0 w-full bg-white border-t shadow-inner">
      <nav className="flex justify-around py-2">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`flex flex-col items-center text-sm ${
              pathname === link.href
                ? 'text-blue-700 font-bold'
                : 'text-gray-500'
            }`}
          >
            <span className="text-lg">{link.icon}</span>
            {link.name}
          </Link>
        ))}
      </nav>
    </footer>
  );
}

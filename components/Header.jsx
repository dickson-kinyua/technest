'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';

import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaBox,
  FaSignOutAlt,
  FaShoppingBag,
  FaHeart,
  FaFire,
} from 'react-icons/fa';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();

  const links = [
    { name: 'Shop', href: '/products', icon: FaShoppingBag },
    { name: 'Trending', href: '/trending', icon: FaFire },
    { name: 'Favorites', href: '/favorites', icon: FaHeart },
    { name: 'Cart', href: '/cart', icon: FaShoppingBag },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMenus = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleAction = (action) => {
    closeMenus();

    if (action === 'profile') {
      router.push('/account');
    }

    if (action === 'orders') {
      router.push('/orders');
    }

    if (action === 'logout') {
      signOut({ callbackUrl: '/' });
    }
  };

  // Active navigation link
  const isActive = (href) => {
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-19 flex items-center justify-between">
          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenus}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-white text-2xl font-black">T</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-none">
                Tech<span className="text-blue-600">Nest</span>
              </span>

              <span className="text-[9px] tracking-[2.5px] text-slate-400 font-semibold mt-1">
                TECHNOLOGY STORE
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-50 border border-slate-200 rounded-full p-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
                    active
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  <Icon className="text-xs" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* USER SECTION */}
          <div className="flex items-center gap-3">
            {session?.user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-2 rounded-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  {session.user.image ? (
                    <Image
                      src={session.user.image}
                      alt={session.user.name || 'User'}
                      width={34}
                      height={34}
                      className="rounded-full ring-2 ring-blue-100"
                    />
                  ) : (
                    <div className="w-[34px] h-[34px] rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                      <FaUser />
                    </div>
                  )}

                  <span className="hidden sm:block max-w-[100px] truncate text-sm font-semibold text-slate-700">
                    {session.user.name?.split(' ')[0] || 'Account'}
                  </span>

                  <FaChevronDown
                    className={`hidden sm:block text-xs text-slate-400 transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* PROFILE DROPDOWN */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-14 w-56 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="px-4 py-4 border-b border-slate-100">
                      <p className="text-xs text-slate-400">Signed in as</p>

                      <p className="text-sm font-bold text-slate-800 truncate mt-1">
                        {session.user.name}
                      </p>
                    </div>

                    <button
                      onClick={() => handleAction('profile')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      <FaUser />
                      My Profile
                    </button>

                    <button
                      onClick={() => handleAction('orders')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition"
                    >
                      <FaBox />
                      My Orders
                    </button>

                    <button
                      onClick={() => handleAction('logout')}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition border-t border-slate-100"
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="px-5 py-2.5 rounded-full bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-300 transition"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FaTimes size={19} /> : <FaBars size={19} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-md">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {links.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={closeMenus}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
                    active
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  <Icon />
                  {link.name}
                </Link>
              );
            })}

            {/* MOBILE AUTHENTICATION */}
            {!session?.user && (
              <div className="pt-4 mt-3 border-t border-slate-200 flex gap-3">
                <Link
                  href="/login"
                  onClick={closeMenus}
                  className="flex-1 text-center py-3 rounded-lg border border-slate-300 text-slate-700 text-sm font-semibold hover:border-blue-400 hover:text-blue-600 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  onClick={closeMenus}
                  className="flex-1 text-center py-3 rounded-lg bg-blue-600 text-white text-sm font-bold hover:bg-blue-700 transition"
                >
                  Get Started
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

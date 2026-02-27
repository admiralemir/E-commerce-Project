'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    updateWishlistCount();

    const handleWishlistUpdate = () => {
      updateWishlistCount();
    };

    window.addEventListener('storage', handleWishlistUpdate);
    window.addEventListener('wishlistUpdate', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('storage', handleWishlistUpdate);
      window.removeEventListener('wishlistUpdate', handleWishlistUpdate);
    };
  }, []);

  const updateWishlistCount = () => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistCount(JSON.parse(savedWishlist).length);
    } else {
      setWishlistCount(0);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-black">E-SHOP</div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                pathname === '/' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                pathname === '/products' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              Products
            </Link>
            <Link 
              href="/about" 
              className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                pathname === '/about' 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-gray-600 hover:text-black'
              }`}
            >
              About
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Wishlist Button */}
            <Link 
              href="/wishlist" 
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Wishlist"
            >
              <svg 
                className="w-6 h-6 text-gray-700" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Icon */}
            <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
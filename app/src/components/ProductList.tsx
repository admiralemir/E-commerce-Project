'use client'

import { IProduct } from '@/types/product-type';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface FeaturedProductsProps {
  products: IProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const [wishlist, setWishlist] = useState<string[]>([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }

    // Listen untuk perubahan wishlist dari tab/window lain
    const handleStorageChange = () => {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const toggleWishlist = (productSlug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isInWishlist = wishlist.includes(productSlug);
    let newWishlist: string[];

    if (isInWishlist) {
      newWishlist = wishlist.filter(slug => slug !== productSlug);
    } else {
      newWishlist = [...wishlist, productSlug];
    }

    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
    
    // Dispatch event untuk update components lain
    window.dispatchEvent(new Event('wishlistUpdate'));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.slug} className="group relative">
          <Link href={`/products/${product.slug}`}>
            <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100">
              <img
                src={product.thumbnail}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-semibold uppercase">
                {Array.isArray(product.tags) ? product.tags[0] : product.tags}
              </div>
            </div>
          </Link>
          
          <button 
            onClick={(e) => toggleWishlist(product.slug, e)}
            className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-black hover:text-white z-10"
            aria-label={wishlist.includes(product.slug) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <svg 
              className={`w-5 h-5 transition-colors ${
                wishlist.includes(product.slug) 
                  ? 'fill-red-500 text-red-500' 
                  : 'fill-none'
              }`}
              fill={wishlist.includes(product.slug) ? 'currentColor' : 'none'}
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
          </button>
          
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:underline">
              {product.name}
            </h3>
            <p className="text-xs text-gray-600 mb-2 line-clamp-1">
              {product.excerpt}
            </p>
            <p className="font-bold text-lg">{formatPrice(product.price)}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}
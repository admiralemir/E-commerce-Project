'use client'

import { IProduct } from '@/types/product-type';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlistProducts();

    // Listen untuk perubahan wishlist
    const handleWishlistUpdate = () => {
      fetchWishlistProducts();
    };

    window.addEventListener('storage', handleWishlistUpdate);
    window.addEventListener('wishlistUpdate', handleWishlistUpdate);
    
    return () => {
      window.removeEventListener('storage', handleWishlistUpdate);
      window.removeEventListener('wishlistUpdate', handleWishlistUpdate);
    };
  }, []);

  async function fetchWishlistProducts() {
    const savedWishlist = localStorage.getItem('wishlist');
    if (!savedWishlist) {
      setLoading(false);
      return;
    }

    const wishlistSlugs: string[] = JSON.parse(savedWishlist);
    
    if (wishlistSlugs.length === 0) {
      setWishlistProducts([]);
      setLoading(false);
      return;
    }

    try {
      // FIX: Gunakan relative URL untuk client-side fetch
      const resp = await fetch('/api/products', {
        cache: 'no-store'
      });
      
      if (resp.ok) {
        const allProducts: IProduct[] = await resp.json();
        const filtered = allProducts.filter(p => wishlistSlugs.includes(p.slug));
        setWishlistProducts(filtered);
      }
    } catch (error) {
      console.error('Error fetching wishlist products:', error);
    } finally {
      setLoading(false);
    }
  }

  const removeFromWishlist = (slug: string) => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistSlugs: string[] = JSON.parse(savedWishlist);
      const newWishlist = wishlistSlugs.filter(s => s !== slug);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setWishlistProducts(prev => prev.filter(p => p.slug !== slug));
      
      // Dispatch event untuk update components lain
      window.dispatchEvent(new Event('wishlistUpdate'));
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-black mx-auto mb-4"></div>
          <div className="text-xl">Loading wishlist...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My Wishlist</h1>
            <p className="text-gray-600 mt-1">
              {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item' : 'items'}
            </p>
          </div>
          <Link
            href="/products"
            className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="text-gray-300 text-8xl mb-6">♡</div>
            <h2 className="text-2xl font-semibold mb-3">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Start adding products to your wishlist by clicking the heart icon on products you love!
            </p>
            <Link
              href="/products"
              className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.slug}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="relative h-64 md:h-auto md:w-64 flex-shrink-0">
                    <Image
                      src={product.thumbnail}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="text-2xl font-semibold hover:text-blue-600 mb-2">
                            {product.name}
                          </h3>
                        </Link>
                        
                        <p className="text-gray-600 mb-4">
                          {product.excerpt}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {product.tags.map((tag) => (
                            <span
                              key={tag}
                              className="bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFromWishlist(product.slug)}
                        className="ml-4 text-gray-400 hover:text-red-500 p-2 transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                      <span className="text-2xl font-bold text-black">
                        {formatPrice(product.price)}
                      </span>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => removeFromWishlist(product.slug)}
                          className="border-2 border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors font-semibold"
                        >
                          Remove
                        </button>
                        <Link
                          href={`/products/${product.slug}`}
                          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
'use client'

import { IProduct } from '@/types/product-type';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';

export default function WishlistPage() {
  const [wishlistProducts, setWishlistProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishlistProducts() {
      const savedWishlist = localStorage.getItem('wishlist');
      if (!savedWishlist) {
        setLoading(false);
        return;
      }

      const wishlistSlugs: string[] = JSON.parse(savedWishlist);
      
      if (wishlistSlugs.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        const resp = await fetch(`${baseUrl}/api/products`);
        
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

    fetchWishlistProducts();
  }, []);

  const removeFromWishlist = (slug: string) => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      const wishlistSlugs: string[] = JSON.parse(savedWishlist);
      const newWishlist = wishlistSlugs.filter(s => s !== slug);
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      setWishlistProducts(prev => prev.filter(p => p.slug !== slug));
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
        <div className="text-xl">Loading wishlist...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
          >
            <FaShoppingCart />
            Continue Shopping
          </Link>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">
              Start adding products to your wishlist to see them here!
            </p>
            <Link
              href="/"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
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
                              className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFromWishlist(product.slug)}
                        className="ml-4 text-red-500 hover:text-red-700 p-2"
                        aria-label="Remove from wishlist"
                      >
                        <FaTrash className="text-xl" />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(product.price)}
                      </span>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => removeFromWishlist(product.slug)}
                          className="border border-red-500 text-red-500 px-4 py-2 rounded hover:bg-red-50 transition-colors"
                        >
                          Remove
                        </button>
                        <Link
                          href={`/products/${product.slug}`}
                          className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
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
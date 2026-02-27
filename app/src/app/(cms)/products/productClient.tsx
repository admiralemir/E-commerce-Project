'use client'

import { IProduct } from '@/types/product-type';
import Link from 'next/link';
import { useState, useEffect } from 'react';

interface ProductsClientProps {
    initialProducts: IProduct[];
}

export default function ProductsClient({ initialProducts }: ProductsClientProps) {
    const [wishlist, setWishlist] = useState<string[]>([]);
    const [products] = useState<IProduct[]>(initialProducts);

    useEffect(() => {
        fetchWishlist();

        // Listen untuk perubahan wishlist
        const handleWishlistUpdate = () => {
            fetchWishlist();
        };

        window.addEventListener('storage', handleWishlistUpdate);
        window.addEventListener('wishlistUpdate', handleWishlistUpdate);
        
        return () => {
            window.removeEventListener('storage', handleWishlistUpdate);
            window.removeEventListener('wishlistUpdate', handleWishlistUpdate);
        };
    }, []);

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    function fetchWishlist() {
        try {
            const savedWishlist = localStorage.getItem('wishlist');
            if (savedWishlist) {
                setWishlist(JSON.parse(savedWishlist));
            }
        } catch (error) {
            console.log(error);
        }
    }

    function toggleWishlist(productSlug: string, e: React.MouseEvent) {
        e.preventDefault();
        e.stopPropagation();
        
        try {
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
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white min-h-screen">
            <div className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">All Products</h1>
                    <p className="text-gray-600">Showing {products.length} items</p>

                    <div className="mt-6">
                        <div className="relative max-w-md">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                            />
                            <svg 
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">
                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-4">
                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <h3 className="font-bold text-sm uppercase mb-4">Price Range</h3>
                                <div className="space-y-2">
                                    {['Rp 0 - 499.000', 'Rp 500.000 - Rp 1.000.000', 'Rp 1.000.000 - Rp 2.000.000', 'Above Rp 2.000.000'].map((range) => (
                                        <label key={range} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-black border-gray-300 focus:ring-black rounded"
                                            />
                                            <span className="ml-3 text-sm text-gray-700 group-hover:text-black">
                                                {range}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="flex-1">
                        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
                            <button className="lg:hidden px-4 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-50">
                                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filters
                            </button>

                            <div className="flex items-center gap-4 ml-auto">
                                <label className="text-sm text-gray-600">Sort By:</label>
                                <select className="px-4 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-black">
                                    <option>Most Popular</option>
                                    <option>Newest First</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <div key={product.slug} className="group relative">
                                    <Link href={`/products/${product.slug}`}>
                                        <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100 rounded-lg">
                                            <img
                                                src={product.thumbnail}
                                                alt={product.name}
                                                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-semibold uppercase">
                                                {product.tags[0]}
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

                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-50 disabled:opacity-50">
                                Previous
                            </button>
                            {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                    key={page}
                                    className={`px-4 py-2 border rounded text-sm font-semibold ${
                                        page === 1 
                                            ? 'bg-black text-white border-black' 
                                            : 'border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="px-4 py-2 border border-gray-300 rounded text-sm font-semibold hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
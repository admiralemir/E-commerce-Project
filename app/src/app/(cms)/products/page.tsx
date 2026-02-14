'use client'
import { IProduct } from '@/types/product-type';
import { Metadata } from 'next'
import Link from 'next/link'
import { useState } from 'react';

export const metadata: Metadata = {
    title: 'Products - My E-commerce Store',
    description: 'Browse our wide selection of products and find the perfect items for you.',
    
}

export default async function ProductsPage() {
    const [wishlist, setWishlist] = useState<string[]>([])

    const resp = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`)
    if (!resp.ok) {
        return <div>Error loading products</div>
    }
    const data: IProduct[] = await resp.json()

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    async function fetchWishlist() {
        try {
            const resp = await fetch('/api/wishlist')
            if (resp.ok) {
                const data = await resp.json()
                const wishlistIds = data.map((item: { productId: string }) => item.productId)
                setWishlist(wishlistIds)
            }

        } catch (error) {
            console.log(error);
        }
    }

    async function toggleWishlist(productId: string) {
        try {
            const resp = await fetch('/api/wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId }),
            })

            if (resp.ok) {
                fetchWishlist()
            } else {
                throw new Error('Failed to update wishlist')
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="bg-white min-h-screen">

            <div className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">All Products</h1>
                    <p className="text-gray-600">Showing all items</p>

                    <div className="mt-6">
                        <div className="relative max-w-md">
                            <input
                                type="text"
                                placeholder="Search products..."
                                className="w-full px-4 py-3 pl-12 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
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
                                <h3 className="font-bold text-sm uppercase mb-4">List Price Range</h3>
                                <div className="space-y-2">
                                    {['Rp 0 - 499.000', 'Rp 500.000 - Rp 1.000.000', 'Rp 1.000.000 - Rp 2.000.000', 'Above Rp 2.000.000'].map((range) => (
                                        <label key={range} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-black border-gray-300 focus:ring-black"
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
                            <button className="lg:hidden px-4 py-2 border border-gray-300 text-sm font-semibold hover:bg-gray-50">
                                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                </svg>
                                Filters
                            </button>

                            <div className="flex items-center gap-4 ml-auto">
                                <label className="text-sm text-gray-600">Sort By:</label>
                                <select className="px-4 py-2 border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-black">
                                    <option>Most Popular</option>
                                    <option>Newest First</option>
                                    <option>Price: Low to High</option>
                                    <option>Price: High to Low</option>
                                    <option>Name: A to Z</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                            {data.map((product) => (
                                <Link
                                    key={product.slug}
                                    href={`/products/${product.slug}`}
                                    className="group"
                                >
                                    <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100">
                                        <img
                                            src={product.thumbnail}
                                            alt={product.name}
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-semibold uppercase">
                                            {product.tags}
                                        </div>
                                        <button className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-black hover:text-white">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                        </button>
                                    </div>
                                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:underline">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-gray-600 mb-2 line-clamp-1">
                                        {product.excerpt}
                                    </p>
                                    <p className="font-bold text-lg">{formatPrice(product.price)}</p>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-12 flex justify-center items-center gap-2">
                            <button className="px-4 py-2 border border-gray-300 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                                Previous
                            </button>
                            {[1, 2, 3, 4, 5].map((page) => (
                                <button
                                    key={page}
                                    className={`px-4 py-2 border text-sm font-semibold transition-all ${page === 1
                                        ? 'bg-black text-white border-black'
                                        : 'border-gray-300 hover:bg-gray-50'
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}
                            <button className="px-4 py-2 border border-gray-300 text-sm font-semibold hover:bg-gray-50">
                                Next
                            </button>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}
'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

interface WishlistItem {
    _id: string
    productId: string
    product?: {
        _id: string
        name: string
        price: number
        tags: string[]
        thumbnail: string
        slug: string
    }
}

export default async function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [removingId, setRemovingId] = useState('')

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const resp = await fetch('/api/wishlist')
                if (!resp.ok) {
                    throw new Error('Failed to fetch wishlist')
                }
                const data = await resp.json()
                setWishlist(data)
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Failed to load wishlist')
                }
            }
            finally {
                setLoading(false)
            }
        }

        fetchWishlist()
    }, [])

    async function removeFromWishlist(productId: string) {
        setRemovingId(productId)

        try {
            const resp = await fetch(`/api/wishlist/${productId}`, {
                method: 'DELETE'
            })

            if (!resp.ok) {
                throw new Error('Failed to remove item from wishlist')
            }

            setWishlist(prev => prev.filter((item) => item._id !== productId))

        } catch (error) {
            console.log(error);
        } finally {
            setRemovingId('')
        }
    }

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    }

    return(
        <div className="bg-white min-h-screen">
            <div className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
                    <p className="text-gray-600">
                        {loading ? 'Loading...' : `${wishlist.length} item${wishlist.length !== 1 ? 's' : ''} saved`}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {error && (
                    <div className="max-w-md mx-auto text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-red-100 rounded-full">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-xl font-bold mb-2">Something went wrong</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button 
                            onClick={() => window.location.reload()}
                            className="px-6 py-3 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {loading && !error && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="animate-pulse">
                                <div className="bg-gray-200 aspect-square mb-4"></div>
                                <div className="h-4 bg-gray-200 mb-2"></div>
                                <div className="h-4 bg-gray-200 w-2/3 mb-2"></div>
                                <div className="h-6 bg-gray-200 w-1/2"></div>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && wishlist.length === 0 && (
                    <div className="max-w-md mx-auto text-center py-16">
                        <div className="w-24 h-24 mx-auto mb-6 flex items-center justify-center bg-gray-100 rounded-full">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold mb-3">Your Wishlist is Empty</h2>
                        <p className="text-gray-600 mb-8">
                            Save your favorite items here and never lose track of what you love.
                        </p>
                        <Link 
                            href="/products"
                            className="inline-block px-8 py-3.5 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all"
                        >
                            Start Shopping
                        </Link>
                    </div>
                )}

                {!loading && !error && wishlist.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {wishlist.map((item) => (
                            <div key={item._id} className="group relative">
                                <Link href={`/products/${item.product?.slug}`}>
                                    <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100">
                                        <Image
                                            src={item.product?.thumbnail || '/placeholder.jpg'}
                                            alt={item.product?.name || 'Product'}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {item.product?.tags && item.product.tags[0] && (
                                            <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-semibold uppercase">
                                                {item.product.tags[0]}
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="font-semibold text-sm mb-1 line-clamp-2 group-hover:underline">
                                        {item.product?.name}
                                    </h3>
                                    <p className="font-bold text-lg mb-3">
                                        {item.product?.price ? formatPrice(item.product.price) : 'N/A'}
                                    </p>
                                </Link>

                                <button
                                    onClick={() => removeFromWishlist(item._id)}
                                    disabled={removingId === item._id}
                                    className="w-full py-2.5 px-4 border-2 border-black text-black font-semibold uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {removingId === item._id ? (
                                        <>
                                            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Removing...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                            Remove
                                        </>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {!loading && !error && wishlist.length > 0 && (
                    <div className="mt-12 text-center border-t border-gray-200 pt-8">
                        <Link 
                            href="/products"
                            className="inline-block px-8 py-3.5 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                )}
            </div>

            {!loading && !error && wishlist.length > 0 && (
                <div className="bg-gray-50 py-12 mt-8">
                    <div className="container mx-auto px-4">
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-black text-white rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Price Drop Alerts</h3>
                                    <p className="text-sm text-gray-600">Get notified when items in your wishlist go on sale</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-black text-white rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Save for Later</h3>
                                    <p className="text-sm text-gray-600">Keep track of items you want to purchase in the future</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 flex-shrink-0 flex items-center justify-center bg-black text-white rounded-full">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="font-bold mb-1">Easy Access</h3>
                                    <p className="text-sm text-gray-600">Access your wishlist anytime, anywhere across all devices</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
import React from "react";
import { IProduct } from "@/types/product-type";

interface IProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductDetail(props: IProps) {
    const {id} = await props.params

    const resp = await fetch(`http://localhost:3000/api/products/${id}`)
    const data: IProduct = await resp.json()

    return(
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                <div className="space-y-4">
                    
                    <div className="aspect-[3/4] w-full bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                            src={data.thumbnail} 
                            alt={data.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                    
                    {data.images && data.images.length > 0 && (
                        <div className="grid grid-cols-4 gap-2">
                            {data.images.map((image, index) => (
                                <div key={index} className="aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-black transition-colors">
                                    <img 
                                        src={image} 
                                        alt={`${data.name} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    
                    <div className="flex flex-wrap gap-2">
                        {data.tags.map((tag, index) => (
                            <span 
                                key={index} 
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Nama Produk */}
                    <h1 className="text-3xl font-bold text-gray-900">
                        {data.name}
                    </h1>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-lg">
                        {data.excerpt}
                    </p>

                    {/* Price */}
                    <div className="py-4 border-y border-gray-200">
                        <p className="text-4xl font-bold text-gray-900">
                            Rp {data.price.toLocaleString('id-ID')}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <button className="w-full bg-black text-white py-4 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                            ADD TO CART
                        </button>
                        <button className="w-full border-2 border-black text-black py-4 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                            ADD TO WISHLIST
                        </button>
                    </div>

                    <div className="space-y-4 pt-6">
                        <h2 className="text-xl font-bold text-gray-900">
                            Product Details
                        </h2>
                        <div className="prose prose-sm max-w-none text-gray-700">
                            <p className="whitespace-pre-line">{data.description}</p>
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">SLUG:</span>
                            <span className="text-gray-900 font-medium">{data.slug}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Created:</span>
                            <span className="text-gray-900 font-medium">
                                {new Date(data.createdAt).toLocaleDateString('id-ID', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    {/* Shipping & Returns */}
                    <div className="space-y-3 pt-6 border-t border-gray-200">
                        <details className="group">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-semibold text-gray-900">Shipping & Delivery</span>
                                <span className="transition group-open:rotate-180">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="text-gray-600 text-sm mt-3">
                                Free shipping for orders above Rp 250,000. Standard delivery in 3-5 business days.
                            </p>
                        </details>
                        
                        <details className="group">
                            <summary className="flex justify-between items-center cursor-pointer list-none">
                                <span className="font-semibold text-gray-900">Returns & Exchange</span>
                                <span className="transition group-open:rotate-180">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </span>
                            </summary>
                            <p className="text-gray-600 text-sm mt-3">
                                Easy 30-day returns and exchanges. Item must be in original condition.
                            </p>
                        </details>
                    </div>
                </div>
            </div>
        </div>
    )
}
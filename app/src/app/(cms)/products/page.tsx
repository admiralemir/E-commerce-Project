import { IProduct } from '@/types/product-type';
import Image from 'next/image'
import Link from 'next/link'


export default async function ProductsPage() {
    const resp = await fetch('http://localhost:3000/api/products')
    const data: IProduct[] = await resp.json()

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(price);
    };

    // Mock products data
    const products = [
        {
            name: 'Classic White Sneakers',
            slug: 'classic-white-sneakers',
            excerpt: 'Comfortable and stylish everyday shoes',
            price: 899000,
            thumbnail: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop',
            tag: 'New',
        },
        {
            name: 'Leather Crossbody Bag',
            slug: 'leather-crossbody-bag',
            excerpt: 'Premium leather with modern design',
            price: 1250000,
            thumbnail: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop',
            tag: 'Trending',
        },
        {
            name: 'Cotton Oversized T-Shirt',
            slug: 'cotton-oversized-tshirt',
            excerpt: 'Soft cotton blend for maximum comfort',
            price: 299000,
            thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
            tag: 'Sale',
        },
        {
            name: 'Slim Fit Denim Jeans',
            slug: 'slim-fit-denim-jeans',
            excerpt: 'Classic blue denim with perfect fit',
            price: 599000,
            thumbnail: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
            tag: 'Popular',
        },
        {
            name: 'Minimalist Watch',
            slug: 'minimalist-watch',
            excerpt: 'Elegant timepiece for any occasion',
            price: 1899000,
            thumbnail: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
            tag: 'New',
        },
        {
            name: 'Wireless Headphones',
            slug: 'wireless-headphones',
            excerpt: 'Premium sound quality and comfort',
            price: 2499000,
            thumbnail: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
            tag: 'Featured',
        },
        {
            name: 'Sports Running Shoes',
            slug: 'sports-running-shoes',
            excerpt: 'Lightweight and breathable design',
            price: 1199000,
            thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
            tag: 'Sale',
        },
        {
            name: 'Designer Sunglasses',
            slug: 'designer-sunglasses',
            excerpt: 'UV protection with style',
            price: 799000,
            thumbnail: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
            tag: 'New',
        },
        {
            name: 'Casual Backpack',
            slug: 'casual-backpack',
            excerpt: 'Spacious and durable for daily use',
            price: 549000,
            thumbnail: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
            tag: 'Trending',
        },
        {
            name: 'Winter Wool Coat',
            slug: 'winter-wool-coat',
            excerpt: 'Warm and elegant outerwear',
            price: 2199000,
            thumbnail: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
            tag: 'New',
        },
        {
            name: 'Leather Wallet',
            slug: 'leather-wallet',
            excerpt: 'Compact and functional design',
            price: 399000,
            thumbnail: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
            tag: 'Popular',
        },
        {
            name: 'Baseball Cap',
            slug: 'baseball-cap',
            excerpt: 'Classic cap for everyday style',
            price: 199000,
            thumbnail: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop',
            tag: 'Sale',
        },
    ];

    return (
        <div className="bg-white min-h-screen">

            <div className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h1 className="text-3xl font-bold mb-2">All Products</h1>
                    <p className="text-gray-600">Showing {products.length} items</p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="flex gap-8">

                    <aside className="hidden lg:block w-64 flex-shrink-0">
                        <div className="sticky top-4">

                            <div className="mb-6">
                                <h3 className="font-bold text-sm uppercase mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {['All Items', 'Clothing', 'Shoes', 'Accessories', 'Bags', 'Electronics'].map((category) => (
                                        <label key={category} className="flex items-center cursor-pointer group">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 text-black border-gray-300 focus:ring-black"
                                            />
                                            <span className="ml-3 text-sm text-gray-700 group-hover:text-black">
                                                {category}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>


                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <h3 className="font-bold text-sm uppercase mb-4">Price Range</h3>
                                <div className="space-y-2">
                                    {['Under Rp 500k', 'Rp 500k - Rp 1M', 'Rp 1M - Rp 2M', 'Above Rp 2M'].map((range) => (
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


                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <h3 className="font-bold text-sm uppercase mb-4">Size</h3>
                                <div className="grid grid-cols-4 gap-2">
                                    {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL'].map((size) => (
                                        <button
                                            key={size}
                                            className="py-2 px-3 border border-gray-300 text-sm hover:border-black hover:bg-black hover:text-white transition-all"
                                        >
                                            {size}
                                        </button>
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
                            {products.map((product) => (
                                <Link
                                    key={product.slug}
                                    href={`/products/${product.slug}`}
                                    className="group"
                                >
                                    <div className="relative aspect-square mb-4 overflow-hidden bg-gray-100">
                                        {/* <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    /> */}
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-black text-white text-xs font-semibold uppercase">
                                            {product.tag}
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
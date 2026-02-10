import '../globals.css';
import Link from 'next/link';
import Image from 'next/image';
import { IProduct } from '@/types/product-type';

export default async function Home() {
  const resp = await fetch('http://localhost:3000/api/products')
    const data: IProduct[] = await resp.json()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  }

  return (
    <div className="bg-white text-black">
      <section className="relative bg-white text-black">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center py-16 md:py-24">
            <div className="space-y-6">
              <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-semibold uppercase tracking-wider">
                New Collection
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Fashion Forward
                <br />
                <span className="text-black">Style Elevated</span>
              </h1>
              <p className="text-lg text-black max-w-md">
                Discover the latest trends and timeless classics. Unleash your unique style with our curated collection.
              </p>
              <div className="flex gap-4 pt-4">
                <Link
                  href="/products"
                  className="px-8 py-3.5 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all"
                >
                  Shop Now
                </Link>
                <button className="px-8 py-3.5 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
                  Learn More
                </button>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
                {/* TARUH FOTO DISINI */}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative h-[200px] overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop"
                alt="Women's Collection"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">WOMEN</h3>
                  <p className="text-sm uppercase tracking-wider">Up to 50% Off</p>
                </div>
              </div>
            </div>
            <div className="relative h-[200px] overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=400&fit=crop"
                alt="Men's Collection"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">MEN</h3>
                  <p className="text-sm uppercase tracking-wider">New Arrivals</p>
                </div>
              </div>
            </div>
            <div className="relative h-[200px] overflow-hidden group cursor-pointer">
              <img
                src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop"
                alt="Accessories"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-2xl font-bold mb-2">ACCESSORIES</h3>
                  <p className="text-sm uppercase tracking-wider">Must-Haves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-black text-white rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-600">On orders over Rp 500.000</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-black text-white rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">100% Authentic</h3>
              <p className="text-sm text-gray-600">Guaranteed original products</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-black text-white rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-sm text-gray-600">30 days return policy</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-black text-white rounded-full">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-sm text-gray-600">Customer service always ready</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked items just for you</p>
            </div>
            <Link
              href="/products"
              className="px-6 py-2.5 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all text-sm"
            >
              See All
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {data.slice(0, 8).map(product => (
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
        </div>
      </section>

    </div>

  );
}

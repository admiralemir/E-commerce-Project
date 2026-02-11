// import React from 'react';
// import Link from 'next/link';
// import '../../app/globals.css'

// export default function Banner() {
//     return (
//         <div className="bg-white text-black">
//             <section className="relative bg-white text-black">
//                 <div className="container mx-auto px-4">
//                     <div className="grid md:grid-cols-2 gap-8 items-center py-16 md:py-24">
//                         <div className="space-y-6">
//                             <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-semibold uppercase tracking-wider">
//                                 New Collection
//                             </div>
//                             <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//                                 Fashion Forward
//                                 <br />
//                                 <span className="text-black">Style Elevated</span>
//                             </h1>
//                             <p className="text-lg text-black max-w-md">
//                                 Discover the latest trends and timeless classics. Unleash your unique style with our curated collection.
//                             </p>
//                             <div className="flex gap-4 pt-4">
//                                 <Link
//                                     href="/products"
//                                     className="px-8 py-3.5 bg-black text-white font-semibold uppercase tracking-wider hover:bg-gray-800 transition-all"
//                                 >
//                                     Shop Now
//                                 </Link>
//                                 <button className="px-8 py-3.5 border-2 border-black text-black font-semibold uppercase tracking-wider hover:bg-black hover:text-white transition-all">
//                                     Learn More
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="relative h-[400px] md:h-[500px]">
//                             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg">
//                                 {/* <Image
//                 src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop"
//                 alt="Fashion Banner"
//                 fill
//                 className="object-cover rounded-lg"
//                 priority
//               /> */}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>

//             <section className="py-8 bg-gray-50">
//                 <div className="container mx-auto px-4">
//                     <div className="grid md:grid-cols-3 gap-4">
//                         <div className="relative h-[200px] overflow-hidden group cursor-pointer">
//                             <img
//                                 src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=400&fit=crop"
//                                 alt="Women's Collection"
//                                 className="object-cover group-hover:scale-105 transition-transform duration-300"
//                             />
//                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                                 <div className="text-center text-white">
//                                     <h3 className="text-2xl font-bold mb-2">WOMEN</h3>
//                                     <p className="text-sm uppercase tracking-wider">Up to 50% Off</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="relative h-[200px] overflow-hidden group cursor-pointer">
//                             <img
//                                 src="https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?w=600&h=400&fit=crop"
//                                 alt="Men's Collection"
//                                 className="object-cover group-hover:scale-105 transition-transform duration-300"
//                             />
//                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                                 <div className="text-center text-white">
//                                     <h3 className="text-2xl font-bold mb-2">MEN</h3>
//                                     <p className="text-sm uppercase tracking-wider">New Arrivals</p>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="relative h-[200px] overflow-hidden group cursor-pointer">
//                             <img
//                                 src="https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&h=400&fit=crop"
//                                 alt="Accessories"
//                                 className="object-cover group-hover:scale-105 transition-transform duration-300"
//                             />
//                             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
//                                 <div className="text-center text-white">
//                                     <h3 className="text-2xl font-bold mb-2">ACCESSORIES</h3>
//                                     <p className="text-sm uppercase tracking-wider">Must-Haves</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//             )
// }
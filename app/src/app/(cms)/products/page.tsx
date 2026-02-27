import { IProduct } from '@/types/product-type';
import { Metadata } from 'next'
import ProductsClient from './productClient';

export const metadata: Metadata = {
    title: 'Products - My E-commerce Store',
    description: 'Browse our wide selection of products and find the perfect items for you.',
}

async function getProducts(): Promise<IProduct[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const resp = await fetch(`${baseUrl}/api/products`, {
            cache: 'no-store'
        });
        
        if (!resp.ok) {
            throw new Error('Failed to fetch products');
        }
        
        return await resp.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

export default async function ProductsPage() {
    const products = await getProducts();

    if (!products || products.length === 0) {
        return <div>Error loading products</div>;
    }

    return <ProductsClient initialProducts={products} />;
}
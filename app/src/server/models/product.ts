import z from 'zod'
import { getDb } from '../config/mongodb'
import { ObjectId } from 'mongodb'

type IProduct = {
    name: string
    slug: string
    description: string
    excerpt: string
    price: number
    tags: string[]
    thumbnail: string
    images: string[]
    createdAt: Date
    updatedAt: Date
}

const productSchema = z.object({
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    excerpt: z.string(),
    price: z.number(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    images: z.array(z.string()),
    createdAt: z.date(),
    updatedAt: z.date()
})

export default class Product {
    static async getCollection() {
        const db = await getDb()

        return db.collection<IProduct>('products')
    }

    static async getProducts() {
        const collection = await this.getCollection()
        const products = await collection.find().toArray()

        return products
    }

    static async getProductById(id: string) {
        const collection = await this.getCollection()

        const _id = new ObjectId(id)
        const product = await collection.findOne({ _id })

        return product
    }
}
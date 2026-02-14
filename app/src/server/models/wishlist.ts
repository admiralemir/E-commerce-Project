import { IProduct } from "@/types/product-type";
import { IWishlist } from "@/types/wishlist-type";
import { getDb } from "../config/mongodb";
import { ObjectId } from "mongodb";

export interface IWishlistProduct extends IWishlist {
    product?: IProduct
}

export default class Wishlist {
    static async getCollection() {
        const db = await getDb()

        return db.collection<IWishlist>('wishlists')
    }

    static async addToWishlist(userId: string, productId: string) {
        const collection = await this.getCollection()

        const existingWishlist = await collection.findOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId)
        })

        if (!existingWishlist) {
            return { message: 'Product already added to wishlist' }
        }

        await collection.insertOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId),
            createdAt: new Date,
            updatedAt: new Date
        })

        return { message: 'Added to wishlist' }
    }

    static async removeFromWishlist(userId: string, productId: string) {
        const collection = await this.getCollection()

        await collection.deleteOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId)
        })

        return { message: 'Removed from wishlist' }
    }

    static async getWishlistByUser(userId: string) {
        const db = getDb()
        const collection = await this.getCollection()

        const wishlist = await collection.aggregate<IWishlistProduct>([
            { $match: { userId: new ObjectId(userId) } },
            {
                $lookup: {
                    from: 'products',
                    localField: 'productId',
                    foreignField: '_id',
                    as: 'productData'
                }
            },
            { $unwind: '$productData' },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    productId: 1,
                    createdAt: 1,
                    product: '$productData',
                }
            },
        ]).toArray()

        return wishlist
    }

    static async isProductInWishlist(userId: string, productId: string) {
        const collection = await this.getCollection()

        const isProductExist = await collection.findOne({
            userId: new ObjectId(userId),
            productId: new ObjectId(productId)
        })

        return !!isProductExist
    }
}


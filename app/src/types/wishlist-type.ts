import { ObjectId } from "mongodb"

export type IWishlist = {
    _id?: ObjectId
    userId: ObjectId
    productId: ObjectId
    createdAt?: Date
    updatedAt?: Date
}
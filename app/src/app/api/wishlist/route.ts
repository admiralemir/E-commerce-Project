import Wishlist from "@/server/models/wishlist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('user-id')

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        const wishlist = await Wishlist.getWishlistByUser(userId)
        return NextResponse.json(wishlist)
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to retrieve wishlist' }, { status: 500 })
    }
}

export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get('user-id')
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }
        
        const { productId } = await req.json()

        if (!productId) {
            return NextResponse.json({ error: 'Product ID is required' }, { status: 400 })
        }
        
        const result = await Wishlist.isProductInWishlist(userId, productId)
        if (result) {
            return NextResponse.json({ error: 'Product already in wishlist' }, { status: 400 })
        }

        await Wishlist.addToWishlist(userId, productId)
        return NextResponse.json({ message: 'Product added to wishlist' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to add product to wishlist' }, { status: 500 })
    }
}

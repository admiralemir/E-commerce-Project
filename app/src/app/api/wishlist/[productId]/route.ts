import Wishlist from "@/server/models/wishlist";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
    try {
        const userId = req.headers.get('user-id')

        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        const { productId } = await params
        await Wishlist.removeFromWishlist(userId, productId)
        return NextResponse.json({ message: 'Product removed from wishlist' })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to remove product from wishlist' }, { status: 500 })
    }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ productId: string }> }) {
    try {
        const userId = req.headers.get('user-id')
        if (!userId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
        }

        const { productId } = await params
        const isInWishlist = await Wishlist.isProductInWishlist(userId, productId)
        return NextResponse.json({ isInWishlist })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Failed to check product in wishlist' }, { status: 500 })
    }
}
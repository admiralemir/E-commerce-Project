'use client'

import { useEffect, useState } from "react"

interface WishlistItem {
    _id: string
    productId: string
    product?: {
        _id: string
        name: string
        price: number
        tags: string[]
        thumbnail: string
        slug: string
    }
}

export default async function WishlistPage() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [removingId, setRemovingId] = useState('')

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const resp = await fetch('/api/wishlist')
                
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message)
                } else {
                    setError('Failed to load wishlist')
                }
            }
            finally {
                setLoading(false)
            }
        }

        fetchWishlist()
    }, [])

    async function removeFromWishlist(productId: string) {
        setRemovingId(productId)

        try {
            const resp = await fetch(`/api/wishlist/${productId}`, {
                method: 'DELETE'
            })

            if (!resp.ok) {
                throw new Error('Failed to remove item from wishlist')
            }

            setWishlist(prev => prev.filter((item) => item._id !== productId))


        } catch (error) {
            console.log(error);
        } finally {
            setRemovingId('')
        }

    }
}
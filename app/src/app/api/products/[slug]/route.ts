import Product from "@/server/models/product"

type IOptions = {
    params: Promise<{ slug: string }>
}

export async function GET(req: Request, options: IOptions) {
    try {
        const { slug } = await options.params
        const product = await Product.getProductBySlug(slug)

        if (!product) {
            return Response.json(
                { error: "Product not found" }, 
                { status: 404 }
            )
        }

        return Response.json(product, { status: 200 })
    } catch (error) {
        console.error("Error fetching product:", error)
        return Response.json(
            { error: "Internal Server Error" }, 
            { status: 500 }
        )
    }
}
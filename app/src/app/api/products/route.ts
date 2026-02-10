import Product from "@/server/models/product";

export async function GET(req: Request) {
    const products = await Product.getProducts()

    return Response.json(products, { status: 200 })
}
import Product from "@/server/models/product"

type IOptions = {
    params: Promise<{ id: string }>
}

export async function GET(req: Request, options: IOptions) {
    const { id } = await options.params
    const product = await Product.getProductById(id)

    return Response.json(product, { status: 200 })
}
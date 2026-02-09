export interface Product {
  name: string
  slug: string
  description: string
  excerpt: string
  price: number
  tags: string[]
  thumbnail: string
  images: string[]
  createdAt: string
  updatedAt: string
}

export default async function ProductsPage() {
    // const resp = await fetch("mongodb+srv://admiralemir:admiralemir@admiral-hck091.sepd44p.mongodb.net/?appName=admiral-hck091")
    return (
        <div>
            <h1>Product Page</h1>
            <ul>

            </ul>
        </div>
    )
}
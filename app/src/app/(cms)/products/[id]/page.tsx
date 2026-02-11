import { IProduct } from "@/types/product-type";

interface IProps {
    params: Promise<{ id: string }>
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ProductDetail(props: IProps) {
    const {id} = await props.params
    const resp = await fetch(`http://localhost:3000/api/products/${id}`)
}
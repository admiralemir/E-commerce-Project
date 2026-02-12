import { ReactNode } from "react"
import Link from "next/link"
import Navbar from "@/components/navbar"

interface IProps {
    children: ReactNode
}

export default function HomeLayout(props: IProps) {
    return (
        <div>
            {/* <Link href="/">Home</Link>
            <Link href="/products">Products</Link> */}
            {props.children}
        </div>
    )
}
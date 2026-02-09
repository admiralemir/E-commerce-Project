import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

export default function HomeLayout(props: IProps) {
    return (
        <div>
            <h1>Home Layout</h1>
            {props.children}
        </div>
    )
}
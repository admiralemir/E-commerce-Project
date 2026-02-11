import { ErrorHandler } from "@/server/helpers/errorHandler";
import User from "@/server/models/user";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const token = await User.login(body)

        const cookieStore = await cookies()

        cookieStore.set({
            name: 'access_token',
            value: token,
            maxAge: 60 * 60 * 24
        })
        
    } catch (error: unknown) {
        if (error instanceof ErrorHandler) {
            const { message, statusCode } = error
            return Response.json({ message }, { status: statusCode })
        } else {
            return Response.json({ message: "Internal Server Error" }, { status: 500 })
        }
    }
}
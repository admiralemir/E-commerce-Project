import User from "@/server/models/user"
import { ZodError } from "zod"

export async function POST(req: Request) {
    try {
        const body = await req.json()
        const message = await User.register(body)

        return Response.json({ message }, { status: 201 })
    } catch (error: unknown) {
        if (error instanceof ZodError) {
            const issues = error.issues

            const messages = issues.map(issue => {
                return `${issue.path[0] as string}: ${issue.message}`
            })
            const message = messages.join('; ')

            return Response.json({ message }, { status: 400 })
        } else {
            return Response.json({ message: 'Internal Server Error' }, { status: 500 })
            
        }
    }
}
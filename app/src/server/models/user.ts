import z from 'zod'
import { getDb } from '../config/mongodb'
import { comparePassword, hashPassword } from '../helpers/bcrypt'
import { BadRequest, Unauthorized } from '../helpers/errorHandler'
import { signToken } from '../helpers/jwt'

type IUser = {
    name: string
    username: string
    email: string
    password: string
}

type IUserLogin = Pick<IUser, 'email' | 'password'>

const userSchema = z.object({
    name: z.string(),
    username: z.string().min(1, "Username is required"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long")
})

export default class User {
    static async getCollection() {
        const db = await getDb()

        return db.collection<IUser>('users')
    }

    static async register(body: IUser) {
        const collection = await this.getCollection()
        
        userSchema.parse(body)

        const hash = hashPassword(body.password)
        body.password = hash

        await collection.insertOne(body)

        return "User registered successfully"
    }

    static async login(payload: IUserLogin): Promise<string> {
        const collection = await this.getCollection()

        if (!payload.email) throw new BadRequest("Email is required")
        if (!payload.password) throw new BadRequest("Password is required")

        const user = await collection.findOne({ email: payload.email })
        if (!user) throw new Unauthorized("Invalid email or password")
        
        const isValidPassword = comparePassword(payload.password, user.password)
        if (!isValidPassword) throw new Unauthorized("Invalid email or password")

        const token = signToken({ _id: user._id, email: user.email })

        return 'Login successful'
    }
}
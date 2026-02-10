import z from 'zod'
import { getDb } from '../config/mongodb'
import { hashPassword } from '../helpers/bcrypt'

type IUser = {
    name: string
    username: string
    email: string
    password: string
}

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

    static async login(body: { email: string, password: string }) {
        const collection = await this.getCollection()
        
    }
}
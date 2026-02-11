import jwt from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

export type JwtPayload = {
    _id: ObjectId
    email: string
}

const JWT_SECRET = process.env.JWT_SECRET || 'rahasia'

export function signToken(payload: JwtPayload): string {
    const token = jwt.sign(payload, JWT_SECRET)

    return token
}

export function verifyToken(token: string): JwtPayload {
    const payload = jwt.verify(token, JWT_SECRET)

    return payload as JwtPayload
}


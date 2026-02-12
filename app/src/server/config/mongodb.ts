import { Db, MongoClient } from "mongodb"

const dbName: string = process.env.MONGO_DB_NAME || "gc02-admiral"
const uri: string = process.env.MONGO_URI || "mongodb://localhost:27017"

const client: MongoClient = new MongoClient(uri)
let db: Db

async function connect(): Promise<Db> {
    await client.connect()
    db = client.db(dbName)

    return db
}

export async function getDb(): Promise<Db> {
    if (!db) return connect()
    
    return db
}
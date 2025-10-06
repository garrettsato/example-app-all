import { MongoClient, Db } from "mongodb";

const MONGO_URI = process.env.MONGO_URL || "mongodb://mongo:27017";
const DB_NAME   = process.env.MONGO_DB || "app";

let client: MongoClient | null = null;
let db: Db | null = null;
let connecting: Promise<Db> | null = null;

export interface MongoConnectionManager {
    getDb(): Promise<Db>;
    closeMongo(): Promise<void>;
}

export function getMongoConnectionManager() {
    return {
        getDb,
        closeMongo
    };
}

// Exponential backoff connect
async function connectWithRetry(): Promise<Db> {
    let delay = 500;               // 0.5s
    const maxDelay = 30_000;       // 30s

    // retry until success (or add a max attempts guard if you prefer)
    for (let i = 0; i < 10; i++) {
        try {
            const c = new MongoClient(MONGO_URI, {
                serverSelectionTimeoutMS: 5000,  // fail fast if server not reachable
                maxPoolSize: 20,
                retryWrites: true,
            });
            await c.connect();
            client = c;
            db = c.db(DB_NAME);
            // Optional: simple sanity ping
            await db.command({ ping: 1 });
            console.log("✅ Mongo connected");
            return db;
        } catch (err: any) {
            console.error(`Mongo connect failed: ${err?.message ?? err}. Retrying in ${delay}ms`);
            await new Promise(r => setTimeout(r, delay));
            delay = Math.min(delay * 2, maxDelay); // exponential backoff
        }
    }
}

// Call this wherever you need a Db; it will reconnect if needed.
export async function getDb(): Promise<Db> {
    if (db) return db;

    // collapse concurrent callers during reconnect
    if (!connecting) connecting = connectWithRetry().finally(() => (connecting = null));
    return connecting;
}


// Graceful shutdown
export async function closeMongo() {
    if (client) {
        await client.close();
        client = null;
        db = null;
    }
}

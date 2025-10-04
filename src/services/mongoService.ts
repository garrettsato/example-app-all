import { MongoClient, Db, Collection } from 'mongodb';

export class MongoService {
    private mongoClient: MongoClient;

    constructor(url: string) {
        this.mongoClient = new MongoClient(url);
    }

    public async save(email: string) {
        try {
            // Connect to the MongoDB server

      
        } finally {
            // Ensure the client will close when finished or on error
            await this.mongoClient.close();
        }
    }

    public async createUser(email: string, hashedPassword: string) {
        try {
            // Connect to the MongoDB server
            await this.mongoClient.connect();
            console.log('Connected successfully to MongoDB');
      
            // Get a reference to the database
            const db = this.mongoClient.db("app");
      
            // Get a reference to the collection
            const collection = db.collection("users");

      
            // Insert a document
            const insertResult = await collection.insertOne({ email: email, hashedPassword: hashedPassword });
            console.log('Inserted document:', insertResult.insertedId);
      
            // Query documents
            const findResult = await collection.find({ email: email }).toArray();
            console.log('Found documents:', findResult);
            return findResult;
        } catch (error) {
            if (error.code === 11000) {
                console.log('Duplicate entry detected: ', error.keyValue);
            }
      
        } finally {
            // Ensure the client will close when finished or on error
            await this.mongoClient.close();
        }
    }

    public async getHashedPassword(email: string): Promise<string> {
        try {
            // Connect to the MongoDB server
            await this.mongoClient.connect();
            console.log('Connected successfully to MongoDB');
      
            // Get a reference to the database
            const db = this.mongoClient.db("app");
      
            // Get a reference to the collection
            const collection = db.collection("users");

      
            // Insert a document
            const findResult = await collection.find({ email: email }).toArray();
            console.log('Found documents:', findResult);
      
            // Query documents
   
            return findResult[0].hashedPassword;
        } catch (error) {
            if (error.code === 11000) {
                console.log('Duplicate entry detected: ', error.keyValue);
            }
      
        } finally {
            // Ensure the client will close when finished or on error
            await this.mongoClient.close();
        }
    }
}

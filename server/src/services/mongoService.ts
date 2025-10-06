import { MongoClient, Db, Collection } from 'mongodb';
import crypto from "crypto";
import {MongoConnectionManager} from "../dependencies/mongoConnectionManager";

export interface MongoService {
    createUser(email: string, hashedPassword: string);
    getHashedPassword(email: string): Promise<string>;
    createTasks(email: string, title: string, description: string): Promise<string>;
    getTasks(email: string): Promise<any>;
    save(email: string): Promise<any>;
}

export interface MongoServiceDependencies {
    mongoConnectionManager: MongoConnectionManager;
}

export function createMongoService(dependencies: MongoServiceDependencies): MongoService {
    const { mongoConnectionManager } = dependencies;

    const save = async (email: string): Promise<any> => {}

    const createUser = async (email: string, hashedPassword: string) => {
        try {
            // Connect to the MongoDB server
            console.log('Connected successfully to MongoDB');
      
            // Get a reference to the database
            const db = await mongoConnectionManager.getDb();
      
            // Get a reference to the collection
            const collection = db.collection("users");

      
            // Insert a document
            const insertResult = await collection.insertOne({
                id: crypto.randomUUID(),
                email: email,
                hashedPassword: hashedPassword
            });

            console.log('Inserted document:', insertResult.insertedId);
      
            // Query documents
            const findResult = await collection.find({ email: email }).toArray();
            console.log('Found documents:', findResult);
            return findResult;
        } catch (error) {
            if (error.code === 11000) {
                console.log('Duplicate entry detected: ', error.keyValue);
            }

            console.log('Error creating user: ', error);
        }
    }

    const getHashedPassword = async (email: string): Promise<string> => {
        try {
            // Connect to the MongoDB server
            console.log('Connected successfully to MongoDB');
      
            // Get a reference to the database
            const db = await mongoConnectionManager.getDb();
      
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
      
        }
    }

    const createTasks = async (email: string, title: string, description: string): Promise<string>  => {
        try {
            // Connect to the MongoDB server
            console.log('Connected successfully to MongoDB');

            // Get a reference to the database
            const db = await mongoConnectionManager.getDb();

            // Get a reference to the collection
            const collection = db.collection("users");

            // Insert a document
            const findResult = await collection.find({ email: email }).toArray();
            console.log('Found documents:', findResult);
            if (!findResult[0]) {
                return "No user found";
            }

            const userId = findResult[0].id;

            const tasks = db.collection("tasks");

            // Insert a document
            const insertResult = await tasks.insertOne({
                id: crypto.randomUUID(),
                title: title,
                description: description,
                userId: userId
            });
            console.log('Inserted document:', insertResult.insertedId);

            return insertResult.insertedId.toString();
        } catch (error) {
            if (error.code === 11000) {
                console.log('Duplicate entry detected: ', error.keyValue);
            }

        }
    }

    const getTasks = async (email: string): Promise<any> => {
        try {
            // Connect to the MongoDB server
            console.log('Connected successfully to MongoDB');

            // Get a reference to the database
            const db = await mongoConnectionManager.getDb();

            // Get a reference to the collection
            const collection = db.collection("users");

            // Insert a document
            const findResult = await collection.find({ email: email }).toArray();
            console.log('Found documents:', findResult);
            if (!findResult[0]) {
                return "No user found";
            }

            const userId = findResult[0].id;

            const tasks = db.collection("tasks");

            // Insert a document
            const tasksResult = await tasks.find({ userId: userId }).toArray();
            console.log('Found documents:',tasksResult);

            return tasksResult;
        } catch (error) {
            if (error.code === 11000) {
                console.log('Duplicate entry detected: ', error.keyValue);
            }

            console.log('Error fetching tasks: ', error);

        } finally {
            // Ensure the client will close when finished or on error
        }
    }

    return { createUser, getHashedPassword, createTasks, getTasks, save }
}

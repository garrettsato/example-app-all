"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoService = void 0;
const mongodb_1 = require("mongodb");
class MongoService {
    constructor(url) {
        this.mongoClient = new mongodb_1.MongoClient(url);
    }
    save(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to the MongoDB server
            }
            finally {
                // Ensure the client will close when finished or on error
            }
        });
    }
    createUser(email, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to the MongoDB server
                console.log('Connected successfully to MongoDB');
                // Get a reference to the database
                const db = this.mongoClient.db("app");
                // Get a reference to the collection
                const collection = db.collection("users");
                // Insert a document
                const insertResult = yield collection.insertOne({
                    id: crypto.randomUUID(),
                    email: email,
                    hashedPassword: hashedPassword
                });
                console.log('Inserted document:', insertResult.insertedId);
                // Query documents
                const findResult = yield collection.find({ email: email }).toArray();
                console.log('Found documents:', findResult);
                return findResult;
            }
            catch (error) {
                if (error.code === 11000) {
                    console.log('Duplicate entry detected: ', error.keyValue);
                }
            }
            finally {
                // Ensure the client will close when finished or on error
                yield this.mongoClient.close();
            }
        });
    }
    getHashedPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to the MongoDB server
                console.log('Connected successfully to MongoDB');
                // Get a reference to the database
                const db = this.mongoClient.db("app");
                // Get a reference to the collection
                const collection = db.collection("users");
                // Insert a document
                const findResult = yield collection.find({ email: email }).toArray();
                console.log('Found documents:', findResult);
                // Query documents
                return findResult[0].hashedPassword;
            }
            catch (error) {
                if (error.code === 11000) {
                    console.log('Duplicate entry detected: ', error.keyValue);
                }
            }
            finally {
                // Ensure the client will close when finished or on error
            }
        });
    }
    createTasks(email, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to the MongoDB server
                console.log('Connected successfully to MongoDB');
                // Get a reference to the database
                const db = this.mongoClient.db("app");
                // Get a reference to the collection
                const collection = db.collection("users");
                // Insert a document
                const findResult = yield collection.find({ email: email }).toArray();
                console.log('Found documents:', findResult);
                if (!findResult[0]) {
                    return "No user found";
                }
                const userId = findResult[0].id;
                const tasks = db.collection("tasks");
                // Insert a document
                const insertResult = yield tasks.insertOne({
                    id: crypto.randomUUID(),
                    title: title,
                    description: description,
                    userId: userId
                });
                console.log('Inserted document:', insertResult.insertedId);
                return insertResult.insertedId.toString();
            }
            catch (error) {
                if (error.code === 11000) {
                    console.log('Duplicate entry detected: ', error.keyValue);
                }
            }
            finally {
                // Ensure the client will close when finished or on error
            }
        });
    }
    getTasks(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect to the MongoDB server
                console.log('Connected successfully to MongoDB');
                // Get a reference to the database
                const db = this.mongoClient.db("app");
                // Get a reference to the collection
                const collection = db.collection("users");
                // Insert a document
                const findResult = yield collection.find({ email: email }).toArray();
                console.log('Found documents:', findResult);
                if (!findResult[0]) {
                    return "No user found";
                }
                const userId = findResult[0].id;
                const tasks = db.collection("tasks");
                // Insert a document
                const tasksResult = yield tasks.find({ userId: userId }).toArray();
                console.log('Found documents:', tasksResult);
                return tasksResult;
            }
            catch (error) {
                if (error.code === 11000) {
                    console.log('Duplicate entry detected: ', error.keyValue);
                }
                console.log('Error fetching tasks: ', error);
            }
            finally {
                // Ensure the client will close when finished or on error
            }
        });
    }
}
exports.MongoService = MongoService;

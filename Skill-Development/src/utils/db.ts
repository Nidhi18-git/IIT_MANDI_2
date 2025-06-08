import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://ansulpundir2468:xDvJG7saj21pJU3p@flight-agent-cluster.d6vndls.mongodb.net/?retryWrites=true&w=majority&appName=flight-agent-cluster";
const client = new MongoClient(uri);

let cachedDb: any = null;

export async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    await client.connect();
    const db = client.db('flight_agent_db');
    cachedDb = db;
    console.log('Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw error;
  }
}

export async function createUser(userData: any) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  
  try {
    const result = await usersCollection.insertOne(userData);
    return result;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export async function findUserByEmail(email: string) {
  const db = await connectToDatabase();
  const usersCollection = db.collection('users');
  
  try {
    const user = await usersCollection.findOne({ email });
    return user;
  } catch (error) {
    console.error('Error finding user:', error);
    throw error;
  }
} 
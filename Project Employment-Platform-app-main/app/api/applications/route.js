// /app/api/applications/route.js
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Connection URI - use environment variable
const uri = process.env.MONGODB_URI;
const dbName = 'employmentApp';
const collectionName = 'applications';

// Singleton pattern for MongoDB connection
let cachedClient = null;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    // Return cached connection if available
    return { client: cachedClient, db: cachedDb };
  }

  if (!uri) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  try {
    const client = new MongoClient(uri);
    await client.connect();
    
    const db = client.db(dbName);
    console.log('Connected to MongoDB successfully');
    
    // Cache the connection
    cachedClient = client;
    cachedDb = db;
    
    return { client, db };
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// GET handler for retrieving all applications
export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);
    
    const applications = await collection.find({}).toArray();
    
    // Format MongoDB IDs to strings for consistent frontend handling
    const formattedApplications = applications.map(app => ({
      ...app,
      _id: app._id.toString()
    }));
    
    console.log(`Retrieved ${applications.length} applications from MongoDB`);
    
    return NextResponse.json({ 
      success: true, 
      data: formattedApplications 
    });
  } catch (error) {
    console.error('Error getting applications:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve applications: ' + error.message,
      data: [] 
    }, { status: 500 });
  }
}

// POST handler for creating a new application
export async function POST(request) {
  try {
    const newApp = await request.json();
    
    // Validate the data
    if (!newApp.name || !newApp.application) {
      return NextResponse.json({
        success: false,
        error: 'Name and application are required'
      }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);
    
    // Format the document for MongoDB
    const document = {
      name: newApp.name,
      application: newApp.application,
      createdAt: new Date()
    };
    
    // Insert into MongoDB
    const result = await collection.insertOne(document);
    
    // Return the new document with its MongoDB ID
    return NextResponse.json({ 
      success: true, 
      data: {
        _id: result.insertedId.toString(),
        ...document
      }
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create application: ' + error.message 
    }, { status: 500 });
  }
}
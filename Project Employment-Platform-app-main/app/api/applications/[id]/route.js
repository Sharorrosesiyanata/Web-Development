// /app/api/applications/[id]/route.js
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Connection URI - use environment variable
const uri = process.env.MONGODB_URI;
const dbName = 'employmentApp';
const collectionName = 'applications';

// Reuse the same connection pattern
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

// GET handler for a single application
export async function GET(request, { params }) {
  try {
    const id = params.id;
    console.log(`Getting application with ID: ${id}`);
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid ID format'
      }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);
    
    const application = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!application) {
      return NextResponse.json({
        success: false,
        error: 'Application not found'
      }, { status: 404 });
    }
    
    // Format the MongoDB ID to string
    return NextResponse.json({ 
      success: true, 
      data: {
        ...application,
        _id: application._id.toString()
      }
    });
  } catch (error) {
    console.error('Error getting application by ID:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve application: ' + error.message
    }, { status: 500 });
  }
}

// PUT handler for updating an application
export async function PUT(request, { params }) {
  try {
    const id = params.id;
    console.log(`Updating application with ID: ${id}`);
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid ID format'
      }, { status: 400 });
    }
    
    const updateData = await request.json();
    
    // Validate the data
    if (!updateData.name || !updateData.application) {
      return NextResponse.json({
        success: false,
        error: 'Name and application are required'
      }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);
    
    // Update document
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: {
        name: updateData.name,
        application: updateData.application,
        updatedAt: new Date()
      }},
      { returnDocument: 'after' } // Return the updated document
    );
    
    if (!result) {
      return NextResponse.json({
        success: false,
        error: 'Application not found'
      }, { status: 404 });
    }
    
    // Format the MongoDB ID to string in the response
    return NextResponse.json({ 
      success: true, 
      data: {
        ...result,
        _id: result._id.toString()
      }
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update application: ' + error.message 
    }, { status: 500 });
  }
}

// DELETE handler
export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    console.log(`Deleting application with ID: ${id}`);
    
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid ID format'
      }, { status: 400 });
    }
    
    const { db } = await connectToDatabase();
    const collection = db.collection(collectionName);
    
    // Delete the document
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Application not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: { _id: id }
    });
  } catch (error) {
    console.error('Error deleting application:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete application: ' + error.message 
    }, { status: 500 });
  }
}
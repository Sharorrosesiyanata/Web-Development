// /app/api/applications/route.js
import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

// Connection URI
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = 'employmentApp';
const collectionName = 'applications';

// Connect to MongoDB function
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB successfully');
    return client.db(dbName).collection(collectionName);
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to database');
  }
}

// GET handler
export async function GET() {
  try {
    const collection = await connectToDatabase();
    const applications = await collection.find({}).toArray();
    
    console.log(`Retrieved ${applications.length} applications from MongoDB`);
    
    return NextResponse.json({ 
      success: true, 
      data: applications 
    });
  } catch (error) {
    console.error('Error getting applications:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve applications' 
    }, { status: 500 });
  } finally {
    // Close the connection
    await client.close();
  }
}

// POST handler
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
    
    const collection = await connectToDatabase();
    
    // Format the document for MongoDB
    const document = {
      name: newApp.name,
      application: newApp.application,
      createdAt: new Date()
    };
    
    // Insert into MongoDB
    const result = await collection.insertOne(document);
    console.log(`Inserted application with ID: ${result.insertedId}`);
    
    // Return the new document with its MongoDB ID
    return NextResponse.json({ 
      success: true, 
      data: {
        _id: result.insertedId,
        ...document
      }
    });
  } catch (error) {
    console.error('Error creating application:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create application: ' + error.message 
    }, { status: 500 });
  } finally {
    // Close the connection
    await client.close();
  }
}

// DELETE handler for deleting by ID
export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();
    
    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'ID is required'
      }, { status: 400 });
    }
    
    const collection = await connectToDatabase();
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Application not found'
      }, { status: 404 });
    }
    
    console.log(`Deleted application with ID: ${id}`);
    
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
  } finally {
    // Close the connection
    await client.close();
  }
}
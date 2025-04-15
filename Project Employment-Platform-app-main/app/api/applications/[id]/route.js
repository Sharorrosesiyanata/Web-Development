// /app/api/applications/[id]/route.js
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

// GET handler for single application
export async function GET(request, { params }) {
  try {
    const id = params.id;
    
    const collection = await connectToDatabase();
    const application = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!application) {
      return NextResponse.json({
        success: false,
        error: 'Application not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({ 
      success: true, 
      data: application 
    });
  } catch (error) {
    console.error('Error getting application by ID:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve application' 
    }, { status: 500 });
  } finally {
    // Close the connection
    await client.close();
  }
}

// PUT handler for updating
export async function PUT(request, { params }) {
  try {
    const id = params.id;
    const updateData = await request.json();
    
    // Validate the data
    if (!updateData.name || !updateData.application) {
      return NextResponse.json({
        success: false,
        error: 'Name and application are required'
      }, { status: 400 });
    }
    
    const collection = await connectToDatabase();
    
    // Update document
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: {
        name: updateData.name,
        application: updateData.application,
        updatedAt: new Date()
      }}
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({
        success: false,
        error: 'Application not found'
      }, { status: 404 });
    }
    
    console.log(`Updated application with ID: ${id}`);
    
    // Get the updated document
    const updatedApplication = await collection.findOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ 
      success: true, 
      data: updatedApplication
    });
  } catch (error) {
    console.error('Error updating application:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update application: ' + error.message 
    }, { status: 500 });
  } finally {
    // Close the connection
    await client.close();
  }
}

// DELETE handler
export async function DELETE(request, { params }) {
  try {
    const id = params.id;
    
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
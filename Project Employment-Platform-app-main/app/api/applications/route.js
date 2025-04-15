// app/api/applications/route.js
import clientPromise from '../../../lib/mongodb';

export async function GET(request) {
  try {
    console.log("API GET request received");
    const client = await clientPromise;
    console.log("MongoDB connected successfully");
    
    const db = client.db("employmentApp");
    const collection = db.collection("applications");
    
    const applications = await collection.find({}).toArray();
    console.log(`Found ${applications.length} applications in database`);
    
    // Transform MongoDB documents to match frontend format
    const formattedApplications = applications.map(app => ({
      _id: app._id.toString(),
      name: app.name || "",
      application: app.application || "",
      createdAt: app.createdAt || new Date()
    }));
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: formattedApplications 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("GET applications error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Server error",
        data: [] // Always include a data array even if empty
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

export async function POST(request) {
  try {
    console.log("API POST request received");
    const data = await request.json();
    console.log("Request body:", data);
    
    // Validate required fields
    if (!data.name || !data.application) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Name and application are required fields" 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const client = await clientPromise;
    console.log("MongoDB connected successfully");
    
    const db = client.db("employmentApp");
    const collection = db.collection("applications");
    
    // Create a new application with proper format
    const newApplication = {
      name: data.name,
      application: data.application,
      createdAt: new Date()
    };
    
    const result = await collection.insertOne(newApplication);
    console.log("Application inserted with ID:", result.insertedId);
    
    const insertedApplication = {
      _id: result.insertedId.toString(),
      ...newApplication
    };
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: insertedApplication 
      }),
      { 
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("POST application error:", error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || "Server error" 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}
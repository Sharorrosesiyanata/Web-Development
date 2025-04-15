// app/api/applications/[id]/route.js
import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

// Handle GET request for a single application
export async function GET(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("employmentApp");
    const applicationsCollection = db.collection("applications");
    
    const id = params.id;
    let objectId;
    
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      // If ID isn't a valid ObjectId, return an error
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid application ID" 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const application = await applicationsCollection.findOne({ _id: objectId });
    
    if (!application) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Application not found" 
        }),
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          _id: application._id.toString(),
          name: application.name,
          application: application.application,
          createdAt: application.createdAt
        }
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Server error" 
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

// Handle PUT request to update application
export async function PUT(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("employmentApp");
    const applicationsCollection = db.collection("applications");
    
    const id = params.id;
    let objectId;
    
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      // If ID isn't a valid ObjectId, return an error
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid application ID" 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const data = await request.json();
    
    // Validate the data
    if (!data.name || !data.application) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Name and application text are required" 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const updateData = {
      name: data.name,
      application: data.application,
      updatedAt: new Date()
    };
    
    const result = await applicationsCollection.updateOne(
      { _id: objectId }, 
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Application not found" 
        }),
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: {
          _id: id,
          ...updateData
        }
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Server error" 
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

// Handle DELETE request to remove application
export async function DELETE(request, { params }) {
  try {
    const client = await clientPromise;
    const db = client.db("employmentApp");
    const applicationsCollection = db.collection("applications");
    
    const id = params.id;
    let objectId;
    
    try {
      objectId = new ObjectId(id);
    } catch (error) {
      // If ID isn't a valid ObjectId, return an error
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid application ID" 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    const result = await applicationsCollection.deleteOne({ _id: objectId });
    
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Application not found" 
        }),
        { 
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    }
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        data: { _id: id }
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error("API route error:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: "Server error" 
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
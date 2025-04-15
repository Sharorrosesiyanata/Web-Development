// pages/api/applications/index.js
import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("employmentApp"); // Name your database
    const applicationsCollection = db.collection("applications");

    switch (req.method) {
      case 'GET':
        try {
          const applications = await applicationsCollection.find({}).toArray();
          
          // Transform MongoDB documents to match frontend format
          const formattedApplications = applications.map(app => ({
            _id: app._id.toString(),
            name: app.name,
            application: app.application,
            createdAt: app.createdAt
          }));
          
          return res.status(200).json({ 
            success: true, 
            data: formattedApplications 
          });
        } catch (error) {
          console.error("GET applications error:", error);
          return res.status(400).json({ 
            success: false, 
            error: error.message,
            data: [] // Always include a data array even if empty
          });
        }
        
      case 'POST':
        try {
          const data = req.body;
          // Create a new application with proper format
          const newApplication = {
            name: data.name,
            application: data.application,
            createdAt: new Date()
          };
          
          const result = await applicationsCollection.insertOne(newApplication);
          const insertedApplication = {
            _id: result.insertedId.toString(),
            ...newApplication
          };
          
          return res.status(201).json({ 
            success: true, 
            data: insertedApplication 
          });
        } catch (error) {
          console.error("POST application error:", error);
          return res.status(400).json({ 
            success: false, 
            error: error.message 
          });
        }
        
      default:
        return res.status(405).json({ 
          success: false, 
          error: "Method not allowed" 
        });
    }
  } catch (error) {
    console.error("API route error:", error);
    return res.status(500).json({ 
      success: false, 
      error: "Server error connecting to database",
      data: [] // Always include a data array even if empty
    });
  }
}
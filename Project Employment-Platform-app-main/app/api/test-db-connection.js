// pages/api/test-db-connection.js
import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    // Test the connection
    const client = await clientPromise;
    const db = client.db("employmentApp");
    
    // Get server info
    const serverInfo = await client.db("admin").command({ serverStatus: 1 });
    
    // List all collections
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(col => col.name);
    
    return res.status(200).json({
      success: true,
      message: "Connected to MongoDB successfully",
      version: serverInfo.version,
      collections: collectionNames,
      database: "employmentApp"
    });
  } catch (error) {
    console.error("Database connection test failed:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to connect to MongoDB",
      error: error.message
    });
  }
}
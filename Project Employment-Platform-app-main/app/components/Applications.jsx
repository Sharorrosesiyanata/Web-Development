"use client";

import { useState, useEffect } from "react";
import AddApplication from "./AddApplication";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [applicationToEdit, setApplicationToEdit] = useState(null);

  // Initial data - guaranteed to work
  const initialData = [
    {
      "id": 1,
      "name": "Samantha Wit",
      "application": "As an educator i am very passionate when it comes to taking students to the next level. If you are interested please contact me on this number 111-456-456"
    },
    {
      "id": 2,
      "name": "Jack Pitt",
      "application": "I am a mechanic operator who team player with unbeated attitude and a willingness until the work is done."
    },
    {
      "id": 3,
      "name": "Courtney Collens",
      "application": "A personal nurse who is dedicated with expertise in patient-recovery."
    }
  ];

  // Set initial data immediately and try to fetch API data
  useEffect(() => {
    // Always set the initial data first
    setApplications(initialData);
    setLoading(false);
    
    // Then try to fetch from API
    fetchApiData();
  }, []);

  // Attempt to fetch data from API
  const fetchApiData = async () => {
    try {
      console.log("Attempting to fetch data from API...");
      const response = await fetch('/api/applications');
      
      if (!response.ok) {
        console.warn(`API request failed with status: ${response.status}`);
        return; // Keep using initial data
      }
      
      const result = await response.json();
      console.log("API response:", result);
      
      if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
        // Format the API data
        const apiData = result.data.map(item => ({
          id: item._id || item.id,
          name: item.name,
          application: item.application
        }));
        
        console.log("Formatted API data:", apiData);
        setApplications(apiData);
      } else {
        console.log("API didn't return usable data, keeping initial data");
      }
    } catch (error) {
      console.error("Error fetching from API:", error);
      // Keep the initial data if API fails
    }
  };

  // Handle adding a new application
  const handleAddNewApplication = async (newApp) => {
    const highestId = Math.max(...applications.map(app => parseInt(app.id) || 0), 0);
    const newApplication = {
      id: (highestId + 1).toString(),
      name: newApp.name,
      application: newApp.application
    };
    
    // Add to local state
    setApplications(prev => [...prev, newApplication]); 
    
    // Save to API
    try {
      console.log("Saving to API:", newApp);
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
      
      if (!response.ok) {
        console.error("API request failed with status:", response.status);
        const errorData = await response.json();
        console.error("Error details:", errorData);
        // Optionally handle the error in the UI
      } else {
        console.log("Application successfully saved to MongoDB");
      }
    } catch (error) {
      console.error("API save error:", error);
    }
  };

  // Handle editing application
  const handleEditApplication = (application) => {
    setApplicationToEdit(application);
  };

  // Handle updating an application
  const handleUpdateApplication = (updatedApp) => {
    // Update in local state
    setApplications(prev => 
      prev.map(app => app.id === updatedApp.id ? updatedApp : app)
    );
    setApplicationToEdit(null);
  };

  // Handle deleting an application
  const handleDeleteApplication = (id) => {
    // Remove from local state
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setApplicationToEdit(null);
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(application => 
    application.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="container mx-auto px-4 py-8 text-center">Loading applications...</div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Application Collection</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            )}
          </div>
          
          {/* Add Application Component */}
          <AddApplication 
            refreshApplications={handleAddNewApplication}
            applicationToEdit={applicationToEdit}
            onUpdate={handleUpdateApplication}
            onCancelEdit={handleCancelEdit}
          />
        </div>
      </div>

      {error && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-6">
          <p>{error}</p>
        </div>
      )}

      {filteredApplications.length === 0 ? (
        <div className="text-center py-10">
          <p>No applications found. Add some applications or try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApplications.map((application) => (
            <div key={application.id} className="border rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{application.name}</h2>
                <p className="text-gray-700 mb-4">{application.application}</p>
                <div className="flex justify-between mt-4">
                  <button 
                    onClick={() => handleEditApplication(application)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteApplication(application.id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
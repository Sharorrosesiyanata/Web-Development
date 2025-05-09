"use client";

import { useState, useEffect } from "react";
import AddApplication from "./AddApplication";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [applicationToEdit, setApplicationToEdit] = useState(null);

  // Initial data - fallback only if API fails
  const initialData = [
    {
      "id": "1",
      "name": "Samantha Wit",
      "application": "As an educator i am very passionate when it comes to taking students to the next level. If you are interested please contact me on this number 111-456-456"
    },
    {
      "id": "2",
      "name": "Jack Pitt",
      "application": "I am a mechanic operator who team player with unbeated attitude and a willingness until the work is done."
    },
    {
      "id": "3",
      "name": "Courtney Collens",
      "application": "A personal nurse who is dedicated with expertise in patient-recovery."
    }
  ];

  // Fetch data from API
  const fetchApiData = async () => {
    try {
      setLoading(true);
      console.log("Fetching data from API...");
      const response = await fetch('/api/applications');
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("API response:", result);
      
      if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
        // Format the API data consistently
        const apiData = result.data.map(item => ({
          id: item._id || item.id,
          name: item.name,
          application: item.application
        }));
        
        console.log("Formatted API data:", apiData);
        setApplications(apiData);
        setError(null);
      } else {
        console.log("API didn't return usable data, using initial data");
        setApplications(initialData);
      }
    } catch (error) {
      console.error("Error fetching from API:", error);
      setError(`Failed to load applications: ${error.message}`);
      // Fallback to initial data
      setApplications(initialData);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchApiData();
  }, []);

  // Handle adding a new application
  const handleAddNewApplication = async (newApp) => {
    try {
      console.log("Saving to API:", newApp);
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log("API response after save:", result);
      
      if (result && result.success && result.data) {
        // Add the new application with the MongoDB ID to local state
        const savedApp = {
          id: result.data._id,
          name: result.data.name,
          application: result.data.application
        };
        
        setApplications(prev => [...prev, savedApp]);
        console.log("Application successfully saved to MongoDB with ID:", savedApp.id);
      } else {
        throw new Error("API didn't return success response");
      }
    } catch (error) {
      console.error("API save error:", error);
      setError(`Failed to save application: ${error.message}`);
    }
  };

  // Handle editing application
  const handleEditApplication = (application) => {
    setApplicationToEdit(application);
  };

  // Handle updating an application
  const handleUpdateApplication = async (updatedApp) => {
    try {
      console.log("Updating in API:", updatedApp);
      const response = await fetch(`/api/applications/${updatedApp.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: updatedApp.name,
          application: updatedApp.application
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API update failed: ${errorData.error || response.statusText}`);
      }
      
      const result = await response.json();
      console.log("API update response:", result);
      
      if (result && result.success && result.data) {
        // Update in local state with consistent ID format
        setApplications(prev => 
          prev.map(app => app.id === updatedApp.id ? {
            id: result.data._id,
            name: result.data.name,
            application: result.data.application
          } : app)
        );
        console.log("Application successfully updated in MongoDB");
        setError(null);
      } else {
        throw new Error("API didn't return success response");
      }
    } catch (error) {
      console.error("API update error:", error);
      setError(`Failed to update application: ${error.message}`);
    }
    
    setApplicationToEdit(null);
  };

  // Handle deleting an application
  const handleDeleteApplication = async (id) => {
    try {
      console.log("Deleting from API:", id);
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API delete failed: ${errorData.error || response.statusText}`);
      }
      
      const result = await response.json();
      console.log("API delete response:", result);
      
      if (result && result.success) {
        // Remove from local state after successful API deletion
        setApplications(prev => prev.filter(app => app.id !== id));
        console.log("Application successfully deleted from MongoDB");
        setError(null);
      } else {
        throw new Error("API didn't return success response");
      }
    } catch (error) {
      console.error("API delete error:", error);
      setError(`Failed to delete application: ${error.message}`);
    }
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
          <button 
            onClick={fetchApiData}
            className="mt-2 text-blue-600 hover:text-blue-800 font-medium"
          >
            Retry
          </button>
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
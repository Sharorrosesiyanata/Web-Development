"use client";

import { useState, useEffect } from "react";
import AddApplication from "./AddApplication";

export default function Applications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchApplications = async () => {
    try {
      setLoading(true);
      console.log("Attempting to fetch applications...");
      const response = await fetch('/api/applications');
      console.log("Response status:", response.status);
      
      if (!response.ok) {
        const text = await response.text();
        console.error("Response text:", text);
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Applications data received:", data);
      
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching applications:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleDeleteApplication = async (id) => {
    try {
      const response = await fetch(`/api/applications/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete application');
      }

      // Re-fetch applications after deletion
      fetchApplications();
    } catch (err) {
      console.error('Error deleting application:', err);
      alert('Failed to delete application: ' + err.message);
    }
  };

  // Filter applications based on search term (using name instead of title)
  const filteredApplications = applications.filter(application => 
    application.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading applications...</div>;
  if (error) return <div>Error loading applications: {error}</div>;

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
          <AddApplication refreshApplications={fetchApplications} />
        </div>
      </div>

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
"use client";
import { useState } from "react";

const AddApplication = ({ refreshApplications }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newApplicationName, setNewApplicationName] = useState("");
  const [newApplication, setNewApplication] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleSubmitNewApplication = async (e) => {
    e.preventDefault();


    if (!newApplicationName || !newApplicationApplication) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/applications/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: newApplicationName,
          application: newApplicationApplication,
        })
      });

      if (res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add application');
      }

      // Reset form and close modal
      setNewApplicationName("");
      setNewApplicationApplication("");
      setModalOpen(false);

      // Refresh book list
      refreshApplications();
    } catch (error) {
        console.error('Error adding application:', error);
        alert('Failed to add application: ' + error.message);
    } finally {
        setIsSubmitting(false);
    }
  };


  return (
    <div>
        <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => setModalOpen(true)}
        >
            Add New Application
        </button>
        
        {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold">Add New Application</h3>
                        <button
                            onClick={() => setModalOpen(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                    </div>
                    
                    <form onSubmit={handleSubmitNewApplication}>
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                 Name
                            </label>
                            <input
                                type="text"
                                value={newName}
                                onChange={e => setNewName(e.target.value)}
                                placeholder="Enter Name"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Application
                            </label>
                            <input
                                type="url"
                                value={newApplication}
                                onChange={e => setNewApplication(e.target.value)}
                                placeholder="Enter application"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setModalOpen(false)}
                                className="px-4 py-2 mr-2 text-gray-700 hover:bg-gray-100 rounded-md"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
                            >
                                {isSubmitting ? 'Adding...' : 'Add Application'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        )}
    </div>
);
};
export default AddApplication;

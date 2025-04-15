"use client";
import { useState, useEffect } from "react";

const AddApplication = ({ refreshApplications, applicationToEdit, onUpdate, onCancelEdit }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [applicationName, setApplicationName] = useState("");
  const [application, setApplication] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Handle opening modal from outside (for edit mode)
  useEffect(() => {
    if (applicationToEdit) {
      setApplicationName(applicationToEdit.name || "");
      setApplication(applicationToEdit.application || "");
      setIsEditMode(true);
      setModalOpen(true);
    }
  }, [applicationToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicationName || !application) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create the application data object
      const appData = {
        name: applicationName,
        application: application
      };
      
      if (isEditMode && applicationToEdit) {
        // Call the parent's update function
        if (onUpdate) {
          onUpdate({
            ...appData,
            id: applicationToEdit.id
          });
        }
      } else {
        // Call the parent's add function
        if (refreshApplications) {
          refreshApplications(appData);
        }
      }

      // Reset form and close modal
      resetAndClose();
    } catch (error) {
      console.error(`Error ${isEditMode ? 'updating' : 'adding'} application:`, error);
      alert(`Failed to ${isEditMode ? 'update' : 'add'} application: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setApplicationName("");
    setApplication("");
    setModalOpen(false);
    setIsEditMode(false);
    
    // If in edit mode, notify parent component that editing is cancelled
    if (isEditMode && onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <div>
      {!isEditMode && (
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => setModalOpen(true)}
        >
          Add New Application
        </button>
      )}
      
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">
                {isEditMode ? "Edit Application" : "Add New Application"}
              </h3>
              <button
                onClick={resetAndClose}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  value={applicationName}
                  onChange={e => setApplicationName(e.target.value)}
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Application
                </label>
                <textarea
                  value={application}
                  onChange={e => setApplication(e.target.value)}
                  placeholder="Enter application details"
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2 mr-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-4 py-2 text-white rounded-md disabled:opacity-70 ${
                    isEditMode 
                      ? "bg-green-600 hover:bg-green-700" 
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {isSubmitting 
                    ? (isEditMode ? 'Updating...' : 'Adding...') 
                    : (isEditMode ? 'Update Application' : 'Add Application')
                  }
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
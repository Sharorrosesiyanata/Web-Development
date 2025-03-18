"use client";
import { useState } from "react";

const AddApplication = ({refreshApplications}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newApplicationName, setNewApplicationName] = useState("");
  const [newApplication, setNewApplication] = useState("");


  const handleSubmitNewApplication = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/applications/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: newApplicationName,
        application: newApplication,
      }),
    });
    if (res.ok) {
      setNewApplicationName("");
      setNewapplication("");
      setModalOpen(false);
      refreshApplication();
    }
  };

  return (
    <div>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add New Application
      </button>
      <dialog
        id="my_modal_3"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmitNewApplication}
        >
          <button
            onClick={() => setModalOpen(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add Application</h3>
          {/* quote input field */}
          <input
            type="text"
            value={newApplicationName}
            onChange={(e) => setNewApplicationName(e.target.value)}
            placeholder="Enter who the application is by..."
            className="input input-bordered w-full max-w-xs"
          />
          {/* by input field */}
          <input
            type="text"
            value={newApplication}
            onChange={(e) => setNewApplication(e.target.value)}
            placeholder="Enter a new Application..."
            className="input input-bordered w-full max-w-xs"
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Add New Application
          </button>
        </form>
      </dialog>
    </div>
  );
};
export default AddApplication;

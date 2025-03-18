"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingPage from "../loading";
import AddApplication from "./AddApplication";


async function getApplications() {
  const res = await fetch("http://localhost:3000/api/applications");
  const json = await res.json();
  return json;
}

const Application = () => {
  const [quotes, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const fetchApplications = async () => {
    const res = await fetch("/api/applications");
    const applications = await res.json();
    setApplications(applications);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch(`/api/applications/search?query=${query}`);
    const applications = await res.json();
    setApplications(applications);
    setLoading(false);
  };

  const deleteApplication = async (id) => {
    const res = await fetch(`/api/applications/${id}`, {
      method:'DELETE'
    });
    fetchApplications();
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for Applications..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <AddApplication refreshApplications={fetchApplications} />
      {quotes.map((application) => (
        <div key={application.id}>
          <div className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <p>{application.name}</p>
              <p>- {application.application}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => deleteApplication(application.id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Application;

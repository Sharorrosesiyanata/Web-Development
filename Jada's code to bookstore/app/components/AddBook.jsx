"use client";
import { useState } from "react";

const AddBook = ({ refreshBooks }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newBookTitle, setNewBookTitle] = useState("");
  const [newBookImage, setNewBookImage] = useState("");
  const [newBookLink, setNewBookLink] = useState("");

  const handleSubmitNewBook = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/books/`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: newBookTitle,
        link: "https://www.amazon.com/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J",
        img: "https://m.media-amazon.com/images/I/41y8qC9RT0S._SX404_BO1,204,203,200_.jpg"
      }),
    });
    if (res.ok) {
      setNewBookTitle("");
      setNewBookLink("");
      setNewBookImage("");
      setModalOpen(false);
      refreshQuotes();
    }
  };

  return (
    <div>
      <button className="btn" onClick={() => setModalOpen(true)}>
        Add New Book
      </button>
      <dialog
        id="my_modal_3"
        className={`modal ${modalOpen ? "modal-open" : ""}`}
      >
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmitNewBook}
        >
          <button
            onClick={() => setModalOpen(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
          <h3 className="font-bold text-lg">Add Book</h3>
          {/* book title input field */}
          <input
            type="text"
            value={newBookTitle}
            onChange={(e) => setNewBookImage(e.target.value)}
            placeholder="Enter Image URL..."
            className="input input-bordered w-full max-w-xs"
          />
          {/* link URL input field */}
          <input
            type="text"
            value={newBookLink}
            onChange={(e) => setNewBookLink(e.target.value)}
            placeholder="Enter Book URL..."
            className="input input-bordered w-full max-w-xs"
          />
          {/* image URL input field */}
          <input
            type="text"
            value={newBookImage}
            onChange={(e) => setNewBookImage(e.target.value)}
            placeholder="Enter Image URL..."
            className="input input-bordered w-full max-w-xs"
          />
          <br />
          <button type="submit" className="btn btn-primary">
            Add New Book
          </button>
        </form>
      </dialog>
    </div>
  );
};
export default AddBook;

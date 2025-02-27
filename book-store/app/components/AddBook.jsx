'use client';

import { useState } from 'react';

const AddBook = ({refreshBooks}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [newBookTitle, setNewBookTitle] = useState('');
    const [newBookImage, setNewBookImage] = useState('');
    const [newBookLink, setNewBookLink] = useState('');

    const handleSubmitNewBook = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/books/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                title: newBookTitle,
                link: "https://www.amazon.com/Beginning-MERN-Stack-MongoDB-Express/dp/B0979MGJ5J",
                 img: "https://m.media-amazon.com/images/I/41y8qC9RT0S._SX404_BO1,204,203,200_.jpg"
            })
        })
        if (res.ok) {
            setNewBookTitle('');
            setModalOpen(false);
            
        }
        console.log({ title: newBookTitle, image: newBookImage, link: newBookLink });
        setNewBookTitle('');
        setNewBookImage('');
        setNewBookLink('');

    }

    return (
        <div>
            <button className="btn" onClick={() => setModalOpen(true)}>
                Add Book
            </button>
            <dialog
                id="my_modal_3"
                className={`modal ${modalOpen ? "modal-open" : ""}`}>
                <form
                    method="dialog"
                    className="modal-box"
                    onSubmit={handleSubmitNewBook}>
                    <button
                        onClick={() => setModalOpen(false)}
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"> x
                    </button>
                    <h3 className="font-bold text-lg">Add New Book</h3>

                    <input
                        type="text"
                        value={newBookTitle}
                        onChange={e => setNewBookTitle(e.target.value)}
                        placeholder="Enter New Book Title"
                        className="input input-bordered w-full max-w-xs"
                    />

                    <input
                        type="text"
                        value={newBookImage}
                        onChange={e => setNewBookImage(e.target.value)}
                        placeholder="Enter Image URL"
                        className="input input-bordered w-full max-w-xs mt-2"
                    />

                    <input
                        type="text"
                        value={newBookLink}
                        onChange={e => setNewBookLink(e.target.value)}
                        placeholder="Enter Book Link"
                        className="input input-bordered w-full max-w-xs mt-2"
                    />

                    <button
                        type="submit"
                        className='btn btn-primary mt-2'>
                        Add Book
                    </button>
                </form>
            </dialog>
        </div>
    );
}

export default AddBook;
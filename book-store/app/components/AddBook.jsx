'use client';

import { useState } from 'react';

const AddBook = ({ refreshBooks }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [newBookTitle, setNewBookTitle] = useState('');
    const [newBookImage, setNewBookImage] = useState('');
    const [newBookLink, setNewBookLink] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmitNewBook = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!newBookTitle || !newBookImage || !newBookLink) {
            alert('Please fill in all fields');
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            const res = await fetch(`/api/books/`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    title: newBookTitle,
                    link: newBookLink,
                    img: newBookImage
                })
            });
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || 'Failed to add book');
            }
            
            // Reset form and close modal
            setNewBookTitle('');
            setNewBookImage('');
            setNewBookLink('');
            setModalOpen(false);
            
            // Refresh book list
            refreshBooks();
        } catch (error) {
            console.error('Error adding book:', error);
            alert('Failed to add book: ' + error.message);
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
                Add New Book
            </button>
            
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold">Add New Book</h3>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmitNewBook}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Book Title
                                </label>
                                <input
                                    type="text"
                                    value={newBookTitle}
                                    onChange={e => setNewBookTitle(e.target.value)}
                                    placeholder="Enter book title"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Image URL
                                </label>
                                <input
                                    type="url"
                                    value={newBookImage}
                                    onChange={e => setNewBookImage(e.target.value)}
                                    placeholder="Enter image URL"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Book Link
                                </label>
                                <input
                                    type="url"
                                    value={newBookLink}
                                    onChange={e => setNewBookLink(e.target.value)}
                                    placeholder="Enter book link (Amazon, etc.)"
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
                                    {isSubmitting ? 'Adding...' : 'Add Book'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddBook;
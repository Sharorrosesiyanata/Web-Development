"use client";

import { useState, useEffect } from 'react';
import AddBook from './AddBook';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/books');
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`Server error: ${response.status} ${errorData.error || ''}`);
      }
      
      const data = await response.json();
      console.log("Books data received:", data); // Debug log
      
      // Make sure data is an array 
      const booksArray = Array.isArray(data) ? data : [];
      setBooks(booksArray);
    } catch (err) {
      console.error('Error fetching books:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDeleteBook = async (id) => {
    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete book');
      }

      // Re-fetch books after deletion
      fetchBooks();
    } catch (err) {
      console.error('Error deleting book:', err);
      alert('Failed to delete book: ' + err.message);
    }
  };

  // Filter books based on search term
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div>Loading books...</div>;
  if (error) return <div>Error loading books: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold mb-4 md:mb-0">Book Collection</h1>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search books..."
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
          
          {/* Add Book Component */}
          <AddBook refreshBooks={fetchBooks} />
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-10">
          <p>No books found. Add some books or try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="border rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
              <div className="relative pb-2/3">
                <img 
                  src={book.img} 
                  alt={book.title} 
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{book.title}</h2>
                <div className="flex justify-between mt-4">
                  <a 
                    href={book.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    View Details
                  </a>
                  <button 
                    onClick={() => handleDeleteBook(book.id)}
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
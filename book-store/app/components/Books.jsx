'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import LoadingPage from "../loading";

async function getBooks() {
    const res = await fetch("http://localhost:3000/api/books");
    const json = await res.json();
    return json;
}
const Books = async () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        getBooks().then((books) => {
            setBooks(books);
            setLoading(false);
        });
    },
        []);
    if (loading) {
        return
        <LoadingPage />
    }
    return (
        <div>
            <h1>Books</h1>
            {books.map((book) => (
                <div key={book.id}>
                    <div className="card bg-base-100 w-96 shadow-xl">
                        <figure>
                            <img src={book.img} width="200" height="150" />
                        </figure>
                        <div className="card-body">
                            <h2
                                className="card-title">{book.id}
                            </h2>
                            <p>{book.title}</p>
                            <div className="card-actions justify-end">
                                <Link href={book.link} className="btn btn-primary">
                                    See in Amazon
                                </Link>
                                <button className="btn btn-error">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <br />
                </div>
            )
            )}
        </div>

    )
}
export default Books;


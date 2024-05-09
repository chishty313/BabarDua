import React, { useState } from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import {
    _createBook
} from "../utils/axios_controllers";

const CreateBook = () => {
    const [bookData, setBookData] = useState({
        isbn: '',
        title: '',
        author: '',
        authorImage: '',
        authorDetails: '',
        description: '',
        image: '',
        genres: [],
        totalPages: 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookData({
            ...bookData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Call your function to create the book here, passing bookData
        console.log('Book data:', bookData);
        const bookCreation = await _createBook(bookData)
        // Reset the form after submission
        setBookData({
            isbn: '',
            title: '',
            author: '',
            authorImage: '',
            authorDetails: '',
            description: '',
            image: '',
            genres: [],
            totalPages: 0,
        });
    };

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">BabarDua</a>
                </div>
                <div className="flex-none gap-2">
                    <MenuDropdown />
                </div>
            </div>
            <div>

                <form onSubmit={handleSubmit} className="p-4 w-[40%] max-w-md mx-auto bg-white rounded-md shadow-2xl flex justify-center flex-col items-center">
                    <h1 className='text-3xl font-black'>Create Book</h1>
                    <label className="block mb-2">
                        <span className="text-gray-700">ISBN:</span>
                        <br />
                        <input
                            type="text"
                            name="isbn"
                            value={bookData.isbn}
                            onChange={handleChange}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Title:</span>
                        <br />
                        <input
                            type="text"
                            name="title"
                            value={bookData.title}
                            onChange={handleChange}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Author:</span>
                        <br />
                        <input
                            type="text"
                            name="author"
                            value={bookData.author}
                            onChange={handleChange}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Author Image:</span>
                        <br />
                        <input
                            type="text"
                            name="authorImage"
                            value={bookData.authorImage}
                            onChange={handleChange}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Author Details:</span>
                        <br />
                        <textarea
                            name="authorDetails"
                            value={bookData.authorDetails}
                            onChange={handleChange}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        ></textarea>
                    </label>
                    <br />
                    <label className="block mb-2">
                        <span className="text-gray-700">Description:</span>
                        <br />
                        <textarea
                            name="description"
                            value={bookData.description}
                            onChange={handleChange}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        ></textarea>
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Image:</span>
                        <br />
                        <input
                            type="text"
                            name="image"
                            value={bookData.image}
                            onChange={handleChange}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Genres:</span>
                        <br />
                        <input
                            type="text"
                            name="genres"
                            value={bookData.genres.join(',')}
                            onChange={(e) => setBookData({ ...bookData, genres: e.target.value.split(',') })}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Total Pages:</span>
                        <br />
                        <input
                            type="number"
                            name="totalPages"
                            value={bookData.totalPages}
                            onChange={handleChange}
                            className="bg-white border-2 border-black input input-bordered w-full max-w-xs block"
                        />
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Book
                    </button>
                </form>
            </div>
        </div>

    );
};

export default CreateBook;

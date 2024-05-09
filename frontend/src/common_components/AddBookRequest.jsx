import React, { useState } from 'react';
import { _createBookRequest } from '../utils/axios_controllers';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const AddBookRequest = () => {

    const addBookRequestMutation = useMutation({
        mutationFn: _createBookRequest,
        onSuccess: () => {
            toast.success("Your request has been saved successfully")
            setRequestInfo({
                userId: '',
                isbn: '',
                title: '',
                author: '',
                genres: [],
            });
            document.getElementById('addBookRequest_modal').close()
            // // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // navigate(-1)
        },
    })

    const [requestInfo, setRequestInfo] = useState({
        isbn: '',
        title: '',
        author: '',
        genres: [],
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRequestInfo({
            ...requestInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call your function to handle the book request here, passing requestInfo
        console.log('Request info:', requestInfo);
        // Reset the form after submission
        addBookRequestMutation.mutate(requestInfo)


    };

    return (
        <dialog id="addBookRequest_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click outside to close</p>

                <form method="dialog" className="">
                    <label className="block mb-2">
                        <span className="text-gray-700">ISBN:</span>
                        <input
                            type="text"
                            name="isbn"
                            value={requestInfo.isbn}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full p-5 rounded-xl"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Title:</span>
                        <input
                            type="text"
                            name="title"
                            value={requestInfo.title}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full p-5 rounded-xl"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Author:</span>
                        <input
                            type="text"
                            name="author"
                            value={requestInfo.author}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full p-5 rounded-xl"
                        />
                    </label>
                    <label className="block mb-2">
                        <span className="text-gray-700">Genres:</span>
                        <input
                            type="text"
                            name="genres"
                            value={requestInfo.genres.join(',')}
                            onChange={(e) => setRequestInfo({ ...requestInfo, genres: e.target.value.split(',') })}
                            className="form-input mt-1 block w-full p-5 rounded-xl"
                        />
                    </label>
                    {/* </div> */}
                    {/* <div

                        className="modal-action">
                        <label htmlFor="my_modal_6" onClick={handleSubmit} className="btn">Send Request</label> */}
                    {/* </div> */}
                    <button
                        // type="btn"
                        onClick={handleSubmit}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded btn"
                    >
                        Send Request
                    </button>
                </form>
            </div >
        </dialog >
    );
};

export default AddBookRequest;
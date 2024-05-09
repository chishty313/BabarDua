import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    _addBookToShelf,
    _getShelves,
    _removeFromShelf,
    _fetchBookById,
    _userInfo,
} from "../../../frontend/src/utils/axios_controllers";
import { useMutation, useQuery } from "@tanstack/react-query";
export default function ({ id }) {
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    console.log(id);
    // !mutate
    const addBookToShelfMutation = useMutation({
        mutationFn: ({ bookId, shelfId }) => _addBookToShelf(bookId, shelfId),
        onSuccess: () => {
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // navigate(-1)
        },
    })

    const deleteBookToShelfMutation = useMutation({
        mutationFn: ({ bookId, shelfId }) => _removeFromShelf(bookId, shelfId),
        onSuccess: () => {
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // navigate(-1)
        },
    })
    const { data: book, isLoading: bookLoading } = useQuery(
        {
            queryKey: ['book', id],
            queryFn: () => _fetchBookById(id),
            enabled: !!id
        })
    console.log({ book });
    const navigate = useNavigate();
    return (
        <div
            className="card w-72 bg-base-50 shadow-xl cursor-pointer backdrop-blur-sm bg-black/40"
        // // onClick={() => {
        // //     console.log(book?.book?.title + " Clicked");
        // //     navigate("/bookinfo");
        // }}
        >
            {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
            <>
                <img
                    src={book?.book?.image}
                    alt="Cover"
                    className="object-cover h-48 w-96"
                />
            </ >
            <div className="card-body">
                <h2 className="card-title">
                    {book?.book?.description}
                    <div className="badge badge-secondary">{book?.book?.avgRating}</div>
                </h2>
                <p>{book?.book?.author}</p>
                <div className="card-actions justify-end">
                    {book?.book?.genres?.map((item) => (
                        <div className="badge badge-outline">{item}</div>
                    ))}
                </div>
                <div className="flex gap-2">
                    <div className="dropdown dropdown-end dropdown-top">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        >
                            Add to Library
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {data?.data?.shelves?.map((item) => (
                                <li
                                    onClick={() => addBookToShelfMutation.mutate({ shelfId: item?._id, bookId: id })}
                                >
                                    <a>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="dropdown dropdown-end dropdown-top">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        >
                            Delete from Library
                        </div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                            {data?.data?.shelves?.map((item) => (
                                <li
                                    onClick={() => deleteBookToShelfMutation.mutate({ shelfId: item?._id, bookId: id })}
                                >
                                    <a>{item.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <button
                            className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                            onClick={() => {
                                navigate_to("/bookreview", {
                                    state: {
                                        b_id: b_id,
                                        name: name,
                                        image_url: image_url,
                                    },
                                });
                            }}
                        >
                            Reviews
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
}

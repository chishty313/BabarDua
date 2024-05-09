import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../common_components/Footer";
import MenuDropdown from "../../../common_components/MenuDropdown";
import login_info from "../../../login_info";
import {
    _addReview,
    _editReview,
    _userInfo,
    _fetchBookById,
    _getUserBookReview
} from "../../../utils/axios_controllers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../main";

export default ({}) => {
    // ! location
    const { state } = useLocation();
    const navigate = useNavigate();
    let userName, initialRating, initialDescription, b_id, edit;
    b_id = state.b_id;
    edit = state.edit;
    // ! fetching
    const { data: book, isLoading: isBookLoading } = useQuery({
        queryKey: ['specificBook', state?.b_id],
        queryFn: () => _fetchBookById(state?.b_id),
        enabled: !!state.b_id
    })

    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    userName = data?.data?.firstName + " " + data?.data?.lastName


    const { data: bookReviewInfo, isLoading: isBookReviewLoading } = useQuery({
        queryKey: ['specificBookReview', state?.b_id],
        queryFn: () => _getUserBookReview(state?.b_id),
        enabled: !!state.b_id
    })

    // console.log(bookReviewInfo?.reviews[0]?._id, 34);
    // console.log(book, 35);
    // console.log(data, 36);


    // !mutate
    const addReviewMutation = useMutation({
        mutationFn: _addReview,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            navigate(-1)
        },
    })

    const editReviewMutation = useMutation({
        mutationFn: _editReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // Invalidate and refetch
            navigate(-1)
        },
    })

    // ! state
    const [rating, setRating] = useState(bookReviewInfo?.reviews?.rating || null);
    const [description, setDescription] = useState(bookReviewInfo?.reviews?.reviewText || null);





    // userName, initialRating, initialDescription
    return (
        <>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">BabarDua</a>
                </div>
                <div className="flex-none gap-2">
                    <MenuDropdown />
                </div>
            </div>
            {
                !isBookLoading && !isBookReviewLoading ? <div className="container mx-auto mt-8 ">
                <div className="flex flex-col items-center h-screen">
                    <h3 className="text-2xl font-bold mb-4">{userName}</h3>
                    <div className="mb-4">
                        <div className="rating rating-md ">
                            {[1, 2, 3, 4, 5].map((index) => {
                                if (Math.floor(rating) == index) {
                                    return (
                                        <input
                                            key={index}
                                            type="radio"
                                            name={`rating-1`}
                                            className="mask mask-star-2 bg-orange-400"
                                            checked
                                            onChange={() => setRating(index)}
                                        />
                                    );
                                } else
                                    return (
                                        <input
                                            key={index}
                                            type="radio"
                                            name={`rating-1`}
                                            className="mask mask-star-2 bg-orange-400"
                                            onChange={() => setRating(index)}
                                        />
                                    );
                            })}
                        </div>
                    </div>
                    <div className="mb-4">
                        {/* Editable Description Box */}
                        <textarea
                            className="w-96 h-40 p-2 bg-gray-100 border border-gray-300 rounded-md resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="flex items-start space-x-4">
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate_to(-1)}
                        >
                            Cancel
                        </button>
                            {/* add review*/}
                            {bookReviewInfo?.data?.length === 0 ? <button
                                className="btn btn-primary"
                                onClick={() => {
                                    addReviewMutation.mutate({
                                        bookId: b_id,
                                        rating: rating,
                                        reviewText: description,
                                    })
                                }}
                            >
                                Add Review
                            </button> : null}

                            {/* edit review */}
                            {bookReviewInfo?.data?.length !== 0 ? <button
                                className="btn btn-primary"
                                onClick={() => {
                                    editReviewMutation.mutate({
                                        id: bookReviewInfo?.data[0]?._id,
                                        bookId: b_id,
                                        rating: rating,
                                        reviewText: description,
                                    });
                                }}
                            >
                                Edit Review
                            </button> : null}
                            {/* <button
                            className="btn btn-primary"
                            onClick={() => {
                                // console.log(rating, description);
                                // if (login_info.user_name) {
                                    // console.log(edit);
                                if (!bookReviewInfo.data.reviews.length === 0) {
                                        const reviewData = {
                                            bookId: b_id,
                                            rating: rating,
                                            reviewText: description,
                                        };
                                    _addReview(
                                            reviewData
                                        ).then((data) => {
                                            // console.log(data);
                                            navigate_to(-1);
                                        });
                                    } else {
                                        const reviewData = {
                                            bookId: b_id,
                                            rating: rating,
                                            reviewText: description,
                                        };
                                        // console.log(reviewData);
                                    _editReview(
                                            reviewData
                                        ).then((data) => {
                                            // console.log(data);
                                            navigate_to(-1);
                                        });
                                    }
                                // }
                                // navigate_to(-1)
                            }}
                        >
                            Save
                        </button> */}
                    </div>
                </div>
                </div > : <span className="loading loading-spinner loading-xs"></span>
            }
            <Footer />
        </>
    );
};

// export default EditReview;

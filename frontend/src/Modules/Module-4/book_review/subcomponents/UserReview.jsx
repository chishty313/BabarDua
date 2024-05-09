import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import login_info from "../../../../login_info";
import { MdReport } from "react-icons/md";
import {
    _deleteReview,
    _likeReview,
    _dislikeReview,
    _reportCommentReview
} from "../../../../utils/axios_controllers";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../../../main";
import ReportModal from "./ReportModal";

export default function ({
    userId,
    userName,
    reviewId,
    currentUserId,
    likes,
    dislikes,
    initialRating,
    initialDescription,
    initialLikesCount,
    show_add,
    change_show_add,
    b_id,
    trigger_page_changed,
}) {

    // ! fetching 
    const likeReviewMutation = useMutation({
        mutationFn: _likeReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // Invalidate and refetch
            // navigate(-1)
        },
    })

    const dislikeReviewMutation = useMutation({

        mutationFn: _dislikeReview,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // Invalidate and refetch

            // navigate(-1)
        },
    })

    const reportReviewMutation = useMutation({

        mutationFn: _reportCommentReview,
        onSuccess: () => {
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // Invalidate and refetch

            // navigate(-1)
        },
    })

    // const [rating, setRating] = useState(initialRating);
    // const [description, setDescription] = useState(initialDescription);
    // const [likesCount, setLikesCount] = useState(initialLikesCount);
    // useEffect(() => {
    //     setLikesCount(initialLikesCount);
    //     return () => setLikesCount(initialLikesCount);
    // }, []);
    // console.log(likesCount, "Likes");
    const [liked, setLiked] = useState(false);
    const name_extension = userName.replaceAll(" ", "");
    const [reportText, setReportText] = useState("")
    // const [show_edit, change_show_edit] = useState(false);
    // console.log(rating);
    const navigate_to = useNavigate();

    const handleLike = () => {
        // if (liked) {
        //     setLikesCount(likesCount - 1);
        // } else {
        //     setLikesCount(likesCount + 1);
        // }
        setLiked(!liked);
    };
    const [show_edit, change_show_edit] = useState(false);
    useEffect(() => {
        if (login_info.user_name && login_info.user_name == userName) {
            change_show_edit(true);
            change_show_add(false);
        }
    });

    // ! like button
    let actionButton;
    if ((!likes.includes(currentUserId) && !dislikes.includes(currentUserId)) || (dislikes.includes(currentUserId) && !likes.includes(currentUserId))) {
        actionButton = <button className="btn btn-primary" onClick={() => {
            likeReviewMutation.mutate({ id: reviewId })
        }}>
            Like
        </button>
    } else if (likes.includes(currentUserId)) {
        actionButton = null
        actionButton = <button className="btn btn-primary" onClick={() => {
            dislikeReviewMutation.mutate({ id: reviewId })
        }}>
            DisLike
        </button>
    }


    // const disLikeButton = <button className="btn btn-primary" onClick={() => {
    //     disLikeReviewMutation.mutate({ id: reviewId })
    // }}>
    //     DiLike
    // </button>
    const reportComment = () => {
        reportReviewMutation.mutate({ id: reviewId, comment: reportText })
    }

    return (
        <div className="bg-[#111827] p-4 rounded-xl shadow-xl">
            <div className="flex flex-col items-center m-4">
                <h3 className="text-2xl font-bold mb-4">{userName}</h3>
                <div className="mb-4">
                    {/* DaisyUI Star Rating */}
                    <div className="rating rating-md">
                        {[1, 2, 3, 4, 5].map((index) => {
                            if (Math.floor(initialRating) == index)
                                return (
                                    <input
                                        key={index + name_extension}
                                        type="radio"
                                        name={`rating-${name_extension}`}
                                        className="mask mask-star-2 bg-orange-400"
                                        checked
                                        disabled
                                        // onChange={() => setRating(index)}
                                    />
                                );
                            else
                                return (
                                    <input
                                        key={index + name_extension}
                                        type="radio"
                                        name={`rating-${name_extension}`}
                                        className="mask mask-star-2 bg-orange-400"
                                        disabled
                                        // onChange={() => setRating(index)}
                                    />
                                );
                        })}
                    </div>
                </div>
                <div className="mb-4">
                    {/* Dummy Book Description (non-editable) */}
                    <textarea
                        className="w-96 h-auto p-2 bg-black-100  rounded-md resize-none"
                        value={initialDescription}
                        readOnly
                    />
                </div>
                <div className="flex items-center space-x-4">
                    <div>
                        {actionButton}
                    </div>
                    <span className="text-sm">{likes.length} Likes</span>
                    <div title="Report the comment" >
                        <button className="btn" onClick={() => document.getElementById('my_modal_1').showModal()}><MdReport
                            className="text-xl text-red-400"
                            title="Report the comment"
                        /></button>

                    </div>
                    {show_edit && (
                        <button
                            className="btn btn-secondary"
                            onClick={() => {
                                navigate_to("/editreview", {
                                    state: {
                                        userName: userName,
                                        initialRating: initialRating,
                                        initialDescription: initialDescription,
                                        b_id: b_id,
                                        edit: true,
                                    },
                                });
                            }}
                        >
                            Edit
                        </button>
                    )}
                    {show_edit && (
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                const reviewData = {
                                    bookId: b_id,
                                    deleteReviewText: true,
                                    deleteRating: true,
                                };
                                // console.log(reviewData);
                                _deleteReview(login_info.token, reviewData)
                                    .then((data) => {
                                        trigger_page_changed(
                                            (prevState) => prevState + 1
                                        );
                                        // console.log(data);
                                    })
                                    .catch((err) => console.log(err));
                            }}
                        >
                            Delete
                        </button>
                    )}
                </div>
            </div>
            <ReportModal reportText={reportText} setReportText={setReportText} reportComment={reportComment} />
        </div>
    );
}

// export default UserReview;

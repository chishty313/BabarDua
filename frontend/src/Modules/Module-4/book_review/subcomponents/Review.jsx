import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import login_info from "../../../../login_info";
import {
    _userInfo,
    _getReviewsByBookId,
    _fetchBookById,
} from "../../../../utils/axios_controllers";
import BookDetailButton from "./BookDetailButton";
import UserReview from "./UserReview";
import { useQuery } from "@tanstack/react-query";
import BookInfo from "../../../Module-2/book_info/BookInfo";

export default () => {

    const { state } = useLocation();
    let image_url = state.image_url;
    let name = state.name;
    let b_id = state.b_id;

    console.log({ bookId: state.image_url });

    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    const { data: bookInfo, isLoading: isBookLoading, error } = useQuery({
        queryKey: ['specificBook', state.b_id],
        queryFn: () => _fetchBookById(state.b_id),
        enabled: !!state.b_id
    })
    const { data: bookReview, isLoading: isBookReviewLoading, error: bookReviewError } = useQuery({
        queryKey: ['specificBookReview', state.b_id],
        queryFn: () => _getReviewsByBookId(state.b_id),
        enabled: !!state.b_id
    })

    // console.log({ bookInfo, bookReview });
    const navigate_to = useNavigate();
    const [page_changed, trigger_page_changed] = useState(0);
    // let name, image_url, b_id;

    // try {

    //     // console.log(image_url, name, b_id);
    // } catch (e) {
    //     b_id = "foo";
    //     image_url = "./src/assets/the_foundation_2.jpg";
    //     name = "The Foundation 3";
    // }

    const placeholder_data = {
        book: {
            id: 1,
            title: "Book 1",
            imageUrl:
                "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        review: [
            {
                id: 1,
                userName: "John Doe a",
                initialRating: 4,
                initialDescription: "A great book! Highly recommended.",
                initialLikesCount: 200,
            },
            {
                id: 2,
                userName: "John Doe b",
                initialRating: 2,
                initialDescription: "A great book! Highly recommended.",
                initialLikesCount: 2020,
            },
            {
                id: 3,
                userName: "John Doe c",
                initialRating: 3,
                initialDescription: "A great book! Highly recommendedxxx.",
                initialLikesCount: 3200,
            },
            {
                id: 4,
                userName: "John Doe d",
                initialRating: 4,
                initialDescription: "A great book! Highly recommended.",
                initialLikesCount: 4200,
            },
        ],
    };
    // Add more book-review pairs as needed
    const [book_reviews, change_book_reviews] = useState(
        placeholder_data.review
    );
    const [show_add, change_show_add] = useState(true);

    // useEffect(() => {
    //     if (data?.data?.username) {
    //         _getReviewsByBookId(b_id).then((data) => {
    //             const tmp_reviews = data?.reviews?.map((item) => {
    //                 return {
    //                     id: item.book,
    //                     userName: data?.data?.firstName + " " + data?.data?.lastName,
    //                     initialRating: item.rating,
    //                     initialDescription: item.reviewText,
    //                     initialLikesCount: item.likes.length,
    //                 };
    //             });
    //             change_book_reviews(tmp_reviews);
    //             // console.log(tmp_reviews);
    //         });
    //     } else {
    //         console.log("Not logged in");
    //     }
    // }, [page_changed]);

    return (
        <div>
            {
                !isLoading && !isBookLoading && !isBookReviewLoading ?
                    <div className="container mx-auto mt-8 grid grid-cols-1 gap-8">
                <BookDetailButton
                    book={{
                        id: b_id,
                                title: state.name,
                                imageUrl: state.image_url,
                        show_add: show_add,
                    }}
                />
                        {
                            bookReview?.reviews ? bookReview?.reviews?.map((item) => (
                    <div className="grid grid-cols-1 gap-8">
                        <UserReview
                                        userName={item.userId.username}
                                        userId={item.userId._id}
                                        currentUserId={data?.data?._id}
                                        initialRating={item.rating}
                                        initialDescription={item.reviewText}
                                        reviewId={item._id}
                                        likes={item.likes}
                                        dislikes={item.dislikes}
                            initialLikesCount={item.initialLikesCount}
                            show_add={show_add}
                            change_show_add={change_show_add}
                            b_id={b_id}
                            trigger_page_changed={trigger_page_changed}
                        />
                    </div>
                            )) : <div>
                                <p>No Review Found for the book</p>
                            </div>
                        }
                    </div> : <span className="loading loading-spinner loading-xs"></span>
            }
        </div>
    );
};

// export default Review;

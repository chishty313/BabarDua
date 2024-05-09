import React from "react";
import { useNavigate } from "react-router";

export default ({ book }) => {
    const { imageUrl, title, id, show_add } = book;
    const navigate_to = useNavigate();
    return (
        <div>
            <div className="bg-[#111827] p-4 rounded-xl shadow-2xl">
                <div className="grid grid-cols-2 content-center place-content-center m-4">
                    <div>
                        <img
                            src={imageUrl}
                            alt="Book Cover"
                            className="w-80 h-80 m-4"
                        />
                    </div>
                    <div className="place-self-center justify-self-start">
                        <h3 className="text-4xl font-bold p-3">{title}</h3>
                        <div className="flex gap-10 my-8 mx-3">
                            {show_add && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        navigate_to("/editreview", {
                                            state: { b_id: id, edit: false },
                                        });
                                    }}
                                >
                                    Give Review
                                </button>
                            )}
                            <button
                                className="btn btn-secondary"
                                onClick={() => {
                                    navigate_to(-1);
                                }}
                            >
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// export default BookDetailButton;

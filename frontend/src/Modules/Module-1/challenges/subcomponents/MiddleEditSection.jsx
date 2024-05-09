import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import login_info from "../../../../login_info";
import {
    _getChallenge,
    _updateTargetBooks,
    _userInfo
} from "../../../../utils/axios_controllers";
import { useQuery } from "@tanstack/react-query";

export default function () {
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    const { data: challengeInfo, isLoading: isChallengeLoading, error } = useQuery(
        { queryKey: ['challenge'], queryFn: _getChallenge }
    )

    const navigate_to = useNavigate();
    let completedBooks = 0,
        progress = 0,
        targetBooks = 0,
        username = "Ahsan",
        year = 2023;

    const [newCompletedBooks, change_newCompletedBooks] = useState(challengeInfo?.challengeDetails?.completedBooks);
    const [newTargetBooks, change_newTargetBooks] = useState(challengeInfo?.challengeDetails?.targetBooks);

    const handleInputChange = (set_func) => {
        return (event) => set_func(event.target.value);
    };

    // try {
    //     useEffect(() => {
    //         if (login_info.user_name) {
    //             _getChallenge(login_info.token)
    //                 .then((data) => {
    //                     // console.log(data);
    //                     const tmp = data.challengeDetails;

    //                     completedBooks = tmp.completedBooks;
    //                     change_newCompletedBooks(completedBooks);
    //                     progress = tmp.progress;
    //                     targetBooks = tmp.targetBooks;
    //                     change_newTargetBooks(targetBooks);
    //                     username = tmp.username;
    //                     year = tmp.year;
    //                 })
    //                 .catch((err) => console.log(err));
    //         } else {
    //             console.log("Not looged in");
    //         }
    //     }, []);
    // } catch (e) {
    //     console.log("Error: ", e);
    // }

    const showval = (label, value, change_func) => {
        return [
            <div>
                <h1 className="text-xl font-bold">{label} :</h1>
            </div>,
            <div>
                <input
                    type="text"
                    placeholder="Type Here"
                    className="input input-bordered input-sm input-success w-full max-w-xs"
                    value={value}
                    onChange={change_newCompletedBooks(e.target.value)}
                />
            </div>,
        ];
    };

    console.log({ targetBooks, completedBooks });

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-12">
            <h1 className="text-4xl font-bold ">
                Edit Book challenge for {username}
            </h1>
            <div className="grid grid-cols-[repeat(2,auto)] gap-x-12 gap-y-4 w-max">
                {/* target book */}
                <div>
                    <h1 className="text-xl font-bold">Target Book :</h1>
                </div>
                <div>
                    <input
                        type="targetBook"
                        placeholder="Enter target book"
                        required
                        className="input input-bordered input-sm input-success w-full max-w-xs"
                        value={newTargetBooks}
                        onChange={(e) => change_newTargetBooks(e.target.value)}
                    />
                </div>
                {/* completed book */}
                <div>
                    <h1 className="text-xl font-bold">Completed Book :</h1>
                </div>
                <div>
                    <input
                        type="completedBook"
                        placeholder="Enter completed book"
                        required
                        className="input input-bordered input-sm input-success w-full max-w-xs"
                        value={newCompletedBooks}
                        onChange={(e) => change_newCompletedBooks(e.target.value)}
                    />
                </div>
            </div>

            <div className="flex gap-6">
                <button
                    className="btn btn-wide btn-outline btn-error"
                    onClick={() => {
                        navigate_to("/challenges");
                    }}
                >
                    Cancel Edit
                </button>
                <button
                    className="btn btn-wide btn-outline btn-success"
                    onClick={() => {
                        // // try {
                        //     const tmp_target = parseInt(newTargetBooks);
                        //     const tmp_compl = parseInt(newCompletedBooks);
                        //     // console.log("DOne!", tmp_compl, tmp_target);
                        //     if (isNaN(tmp_target) || isNaN(tmp_compl))
                        //         throw new Error("Insert integer only");
                        //     if (tmp_compl > tmp_target)
                        //         throw new Error(
                        //             "Can't complete more book than targeted"
                        //         );

                        //     const targetData = {
                        //         targetBooks: tmp_target,
                        //     };
                        // // if ()
                        _updateTargetBooks(
                            {
                                targetBooks: Number(newTargetBooks),
                                completedBooks: Number(newCompletedBooks)
                            }
                                ).then((data) => {
                                    console.log(data);
                                    navigate_to("/challenges");
                                });
                        //     else console.log("Not logged in");
                        // } catch (e) {
                        //     console.log(e);
                        // }
                        // console.log(newTargetBooks, newCompletedBooks);
                    }}
                >
                    Complete Edit
                </button>
            </div>
        </div>
    );
}

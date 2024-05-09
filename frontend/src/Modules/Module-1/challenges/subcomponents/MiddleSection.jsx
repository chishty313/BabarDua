import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import login_info from "../../../../login_info";
import {
    _deleteChallenge,
    _getChallenge,
    _userInfo
} from "../../../../utils/axios_controllers";
import { useQuery } from "@tanstack/react-query";

export default function () {
    // ! fetching user information
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    const { data: challengeInfo, isLoading: isChallengeLoading, error } = useQuery(
        { queryKey: ['challenge'], queryFn: _getChallenge }
    )

    // console.log(challengeInfo?.challengeDetails?.year);

    const navigate_to = useNavigate();
    const [page_edited, trigger_page_edited] = useState(0);
    const [completedBooks, change_completedBooks] = useState(0),
        [progress, change_progress] = useState(0),
        [targetBooks, change_targetBooks] = useState(0),
        [username, change_username] = useState("Ahsan"),
        [year, change_year] = useState(2023);

    useEffect(() => { 
        if (challengeInfo) {
            change_completedBooks(challengeInfo?.challengeDetails?.completedBooks);
            change_progress(challengeInfo?.challengeDetails?.progress);
            change_targetBooks(challengeInfo?.challengeDetails?.targetBooks);
            // change_username(challengeInfo.username);
            change_year(challengeInfo?.challengeDetails?.year);
        }
    }, [challengeInfo])


    const showval = (label, value) => {
        return [
            <div>
                <h1 className="text-xl font-bold">{label} :</h1>
            </div>,
            <div>
                <h1 className="text-xl font-bold">{value}</h1>
            </div>,
        ];
    };

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-12">
            <h1 className="text-4xl font-bold ">
                Book challenge for{" "}
                {data?.data?.username ? data?.data?.firstName + " " + data?.data?.lastName : " "} in year{" "}
                {challengeInfo?.challengeDetails?.year}
            </h1>
            <div className="grid grid-cols-[repeat(2,auto)] gap-x-12 w-max">
                {showval("Target Number of Books", targetBooks)}
                {showval("Completed Books", completedBooks)}
                {showval("Progress", progress + "%")}
            </div>

            <div className="flex gap-6">
                <button
                    className="btn btn-wide btn-outline btn-primary"
                    onClick={() => {
                        navigate_to("/editchallenge");
                    }}
                >
                    Edit Challenge
                </button>
                <button
                    className="btn btn-wide btn-outline btn-error"
                    onClick={() => {
                        _deleteChallenge(login_info.token).then((data) => {
                            trigger_page_edited(page_edited + 1);
                        });
                    }}
                >
                    Delete Challenge
                </button>
            </div>
        </div>
    );
}

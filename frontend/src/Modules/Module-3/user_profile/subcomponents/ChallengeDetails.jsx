import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import login_info from "../../../../login_info";
import { _getShelves, _userInfo } from "../../../../utils/axios_controllers";
import { useQuery } from "@tanstack/react-query";

const ChallengeDetails = () => {
    const navigate_to = useNavigate();

    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })

    console.log({ data: data?.data });

    const [libraryFolder, change_libraryFolder] = useState([]);


    const [showAllBooks, setShowAllBooks] = useState(false);

    const [showAllShelves, setShowAllShelves] = useState(false);

    return (
        <div className="p-4">
            {
                data?.data?.shelves?.map(shelves => <div className="text-lg font-bold mb-4 border rounded-lg p-2">
                    <h2>Number of Books {shelves.label} : {shelves.books.length}</h2>
                </div>
                )
            }
            {/* <div className="text-lg font-bold mb-4 border rounded-lg p-2">
                <h2>Number of Books Read : {data?.data?.shel}</h2>
            </div>

            <div className="text-lg font-bold mb-4 border rounded-lg p-2">
                {/* <h2>Total Pages Read : {challengeData.pagesRead}</h2> */}
            {/* </div> */}

            {/* <div className="text-lg font-bold mb-4 border rounded-lg p-2"> */}
            {/* <h2>Number of Shelves in Library : {libraryFolder.length}</h2> */}
            {/* </div> * / */}

            <div className="mb-4">
                <h2 className="text-center m-3 text-4xl font-bold">
                    Your Challenges
                </h2>
                <h2 className="text-center m-2 text-xl font-bold">
                    1 Challenge Activated this year
                </h2>
                {/* <ul className="text-lg m-2">
                    {challengeData.bookList
                        .slice(0, showAllBooks ? undefined : 6)
                        .map((book, index) => (
                            <li key={index}>{book}</li>
                        ))}
                </ul> */}
                <button
                    className="btn btn-secondary mt-2"
                    onClick={() => {
                        navigate_to("/challenges");
                    }}
                >
                    View Challenge
                </button>
            </div>

            <div>
                <h2 className="text-center m-3 text-4xl font-bold">
                    Your Library
                </h2>

                <ul className="text-lg m-2">
                    {libraryFolder
                        .slice(0, showAllShelves ? undefined : 6)
                        .map((shelf, index) => (
                            <li key={index}>{shelf}</li>
                        ))}
                </ul>

                <button
                    className="btn btn-secondary mt-2"
                    onClick={() => {
                        navigate_to("/booklibrary");
                    }}
                >
                    View All
                </button>
            </div>
        </div>
    );
};

export default ChallengeDetails;

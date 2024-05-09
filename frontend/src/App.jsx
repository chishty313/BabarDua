import { redirect, Route, Routes, useNavigate } from "react-router-dom";
import Login from "./Modules/Module-1/Login.jsx";
import Register from "./Modules/Module-1/Register.jsx";
import SelectGenre from "./Modules/Module-1/SelectGenre";
import Challenges from "./Modules/Module-1/challenges/Challenges.jsx";
import EditChallenge from "./Modules/Module-1/challenges/EditChallenge.jsx";
import BookInfo from "./Modules/Module-2/book_info/BookInfo.jsx";
import BookSearch from "./Modules/Module-2/book_search/BookSearch.jsx";
import BookLibrary from "./Modules/Module-3/book_library/BookLibrary.jsx";
import EditProfile from "./Modules/Module-3/user_profile/EditProfile.jsx";
import UserProfile from "./Modules/Module-3/user_profile/UserProfile.jsx";
import BookReview from "./Modules/Module-4/book_review/BookReview.jsx";
import EditReview from "./Modules/Module-4/book_review/EditReview.jsx";
import CreateBook from '../src/pages/CreateBook.jsx'
import Donars from "./pages/Donars.jsx";
import UserManagement from "./pages/UserManagement.jsx";
import { useQuery } from "@tanstack/react-query";
import { _userInfo } from "./utils/axios_controllers.js";
import Banned from "./pages/Banned.jsx";
import { useEffect } from "react";
import ChallangeLeaderBoard from "./pages/ChallangeLeaderBoard.jsx";
import BookAddRequest from "./pages/BookAddRequest.jsx";
import CreateContest from "./pages/CreareContest.jsx";
import Contest from "./pages/Contest.jsx";
import ContestResponse from "./pages/ContestResponse.jsx";
export default function () {
    const navigate_to = useNavigate();
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })



    useEffect(() => {
        if (data?.data?.isBanned === true) {
            navigate_to('/banned')
        }
    }, [data?.data?._id, data?.data?.isBanned])

    return (
        <>
            <div role="alert" className="alert shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <div>
                    <h3 className="font-bold">Contest Going On !</h3>
                    <div className="text-xs">You participate to the contest and win</div>
                </div>
                <button onClick={() => navigate_to('/contest')} className="btn btn-sm">Explore</button>
            </div>
            <Routes>
                <Route path="/booksearch" element={<BookSearch />} />
                <Route path="/bookinfo" element={<BookInfo />} />
                <Route path="/bookreview" element={<BookReview />} />
                <Route path="/editreview" element={<EditReview />} />
                <Route path="/userprofile" element={<UserProfile />} />

                <Route path="login" element={<Login />}></Route>
                <Route path="/challenges" element={<Challenges />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/editchallenge" element={<EditChallenge />} />
                <Route path="register" element={<Register />}></Route>
                <Route path="selectgenre" element={<SelectGenre />}></Route>
                <Route path="booklibrary" element={<BookLibrary />} />
                <Route path="donars" element={<Donars />} />
                <Route path="user-management" element={<UserManagement />} />
                <Route path="banned" element={<Banned />} />
                <Route path="challange-leaderbord" element={<ChallangeLeaderBoard />} />
                <Route path="create-book" element={<CreateBook />} />
                <Route path="book-requests" element={<BookAddRequest />} />
                <Route path="create-contest" element={<CreateContest />} />
                <Route path="contest" element={< Contest />} />
                <Route path="contest-response" element={< ContestResponse />} />
            </Routes >
        </>


    );
}

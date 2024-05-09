import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { _userInfo } from "../utils/axios_controllers";
import AddBookRequest from "./AddBookRequest";

export default function () {
    const navigate_to = useNavigate();
    const [amount, setAmount] = useState(0)

    // ! user info
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    console.log({ data });


    // ! handle donation
    const handleValidate = async () => {
        console.log('click');
        const res = await fetch('http://localhost:4000/validate')
        const jsonRes = await res.json();
        // console.log(jsonRes);
        // window.location.replace(jsonRes.GatewayPageURL)
        console.log({ jsonRes });
    }
    const handleDonate = async () => {
        console.log('click');
        const response = await fetch('http://localhost:4000/init', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // You can include a body if you need to send data with your request
            body: JSON.stringify({
                amount
            }),
            credentials: 'include'
        });
        const jsonRes = await response.json();
        // console.log(jsonRes);
        window.location.replace(jsonRes.GatewayPageURL)
        console.log({ jsonRes });
    }
    // useEffect(() => {
    //     handleDonate();
    // }, [])

    return (
        <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src="./src/assets/user_icon.jpg"
                    />
                </div>
            </label>
            <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
                <li
                    key="profile"
                    onClick={() => {
                        navigate_to("/userprofile");
                    }}
                >
                    <a className="justify-between">
                        Profile
                        <span className="badge">Active</span>
                    </a>
                </li>
                <li
                    key="library"
                    onClick={() => {
                        navigate_to("/booklibrary");
                    }}
                >
                    <a>Library</a>
                </li>
                <li
                    key="book-list"
                    onClick={() => {
                        navigate_to("/booksearch");
                    }}
                >
                    <a>Book List</a>
                </li>
                <li
                    key="challenges"
                    onClick={() => {
                        navigate_to("/challenges");
                    }}
                >
                    <a>Challenges</a>
                </li>
                <li
                    key="donars"
                    onClick={() => {
                        navigate_to("/donars");
                    }}
                >
                    <a>All Donar</a>
                </li>
                <li
                    key="Request a book"
                    typeof="btn"
                    onClick={() => document.getElementById('addBookRequest_modal').showModal()}
                >
                    {/* <button className="btn" > */}
                    <p>Request Book</p>
                    {/* </button> */}
                </li>

                <li
                    key="challange-leaderbord"
                    onClick={() => {
                        navigate_to("/challange-leaderbord");
                    }}
                >
                    <a>Challenge Leaderboard</a>
                </li>
                {/* admin route start */}
                {
                    data?.data?.role === 'admin' ? <li
                        key="user-management"
                        onClick={() => {
                            navigate_to("/user-management");
                        }}
                    >
                        <a>User Management</a>
                    </li> : null
                }
                {
                    data?.data?.role === 'admin' ? <li
                        key="contest-response"
                        onClick={() => {
                            navigate_to("/contest-response");
                        }}
                    >
                        <a>Contest Responses</a>
                    </li> : null
                }
                {
                    data?.data?.role === 'admin' ? <li
                        key="create-contest"
                        onClick={() => {
                            navigate_to("/create-contest");
                        }}
                    >
                        <a>Create Contest</a>
                    </li> : null
                }
                {
                    data?.data?.role === 'admin' ? <li
                        key="create-book"
                        onClick={() => {
                            navigate_to("/create-book");
                        }}
                    >
                        <a>Create Book</a>
                    </li> : null
                }
                {
                    data?.data?.role === 'admin' ? <li
                        key="book-requests"
                        onClick={() => {
                            navigate_to("/book-requests");
                        }}
                    >
                        <a>Book Requests</a>
                    </li> : null
                }

                {/* admin route end */}
                <li
                    key="logout"
                    onClick={() => {
                        navigate_to("/login");
                    }}
                >
                    <a>Logout</a>
                </li>
                <li
                // key="logout"
                // onClick={() => {
                //     navigate_to("/login");
                // }}
                >
                    {/* <a href="http://localhost:4000/init" > */}
                    <button className="btn" onClick={() => document.getElementById('donate_modal').showModal()}>Donate us</button>
                    <dialog id="donate_modal" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Thanks for the Donation</h3>
                            <p className="py-4">Your contribution matters </p>
                            <div className="modal-action">
                                <form method="dialog">
                                    <input
                                        className="input input-bordered w-full max-w-xs"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        type="text" typeof="number"
                                        placeholder="Enter the amount you want to pay" />
                                    {/* if there is a button in form, it will close the modal */}
                                    <button
                                        onClick={() => handleDonate()}
                                        className="btn">
                                        Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>

                    {/* <button >Donate us</button> */}
                    {/* </a> */}
                </li>
            </ul>
            <AddBookRequest />
        </div>
    );
}

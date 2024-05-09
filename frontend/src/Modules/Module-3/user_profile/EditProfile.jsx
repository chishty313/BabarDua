// UserProfile.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../../../common_components/Footer";
import MenuDropdown from "../../../common_components/MenuDropdown";
import login_info from "../../../login_info";
import { _updateUser, _userInfo } from "../../../utils/axios_controllers";
import { useMutation, useQuery } from "@tanstack/react-query";

const UserProfile = () => {
    const navigate_to = useNavigate();
    // ! fetch
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })

    const [error_in_input, change_error_in_input] = useState(false);
    const [submission_attempt, change_submission_attempt] = useState(0);

    let error_msg = "";
    const [error_state, change_error_state] = useState(error_msg);

    const [firstName, set_firstName] = useState("");
    const [lastName, set_lastName] = useState("");

    const handleInputChange = (set_func) => {
        return (event) => set_func(event.target.value);
    };


    // ! Update user profile
    const updateUserMutation = useMutation({
        mutationFn: _updateUser,
        onSuccess: () => {
            navigate_to('/userprofile')
        },
    })


    useEffect(() => {
        if (data?.data?._id) {
            set_firstName(data?.data?.firstName);
            set_lastName(data?.data?.lastName);
        }
    }, [data?.data?.firstName, data?.data?.last]);

    useEffect(() => {
        if (submission_attempt > 0 && !error_in_input && login_info.user_name) {
            const editedData = {
                firstName: firstName,
                lastName: lastName,
                bio: "This was not asked on login",
            };
            console.log(editedData, login_info);
            _updateUser(login_info.token, login_info.user_name, editedData)
                .then((data) => {
                    console.log(data);
                    if (data.success) {
                        login_info.first_name = editedData.firstName;
                        login_info.last_name = editedData.lastName;
                        navigate_to(-1);
                    }
                })
                .catch((err) => console.log(err));
            // _userSignup(newUser)
            //     .then((data) => {
            //         if (data.success) {
            //             navigate_to_select_genre("/selectgenre");
            //         } else {
            //             error_msg = "Username or password already taken!";
            //             change_error_state(error_msg);
            //             change_error_in_input(true);
            //         }
            //     })
            //     .catch((err) => {
            //         error_msg = "400 Bad Request";
            //         change_error_state(error_msg);
            //         change_error_in_input(true);
            //         console.log(err);
            //     });
        } else console.log("Not logged in");
    }, [submission_attempt]);

    return (
        <div className="flex flex-col">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">BIntellegent</a>
                </div>
                <div className="flex-none gap-2">
                    <MenuDropdown />
                </div>
            </div>
            <div
                className="text-white h-[100vh] flex justify-center items-center bg-cover"
                // style={{
                //     backgroundImage: "url('../src/assets/bookstore-bg.jpg')",
                // }}
            >
                <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
                    <h1 className="text-4xl font-bold text-center mb-8">
                        Edit profile
                    </h1>
                    <div>
                        <div className="relative my-4">
                            <input
                                type="text"
                                value={firstName}
                                onChange={handleInputChange(set_firstName)}
                                className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                First Name
                            </label>
                            {/* <BiUser className="absolute top-4 right-4 text-slate-400" /> */}
                        </div>
                        <div className="relative my-4">
                            <input
                                type="text"
                                value={lastName}
                                onChange={handleInputChange(set_lastName)}
                                className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                                placeholder=" "
                            />
                            <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Last Name
                            </label>
                            {/* <BiUser className="absolute top-4 right-4 text-slate-400" /> */}
                        </div>
                        <button
                            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                            // type="submit"
                            onClick={() => {
                                updateUserMutation.mutate({
                                    firstName,
                                    lastName,
                                    id: data?.data?._id
                                })
                            }}
                        >
                            {" "}
                            Done
                            {/* <Link to="/SelectGenre">Register</Link> */}
                        </button>
                        {error_in_input && (
                            <div role="alert" className="alert alert-warning">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="stroke-current shrink-0 h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                <span>{error_state}</span>
                            </div>
                        )}
                        <div className="mt-2 items-center">
                            <div className="my-4">
                                {/* <span>
                                    Already Register?{" "}
                                    <span className="text-blue-500">
                                        {" "}
                                        <Link to="/Login">Login</Link>
                                    </span>
                                </span> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;

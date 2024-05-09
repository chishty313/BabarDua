import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { _userSignup } from "../../utils/axios_controllers";

const Register = () => {
    const navigate_to_select_genre = useNavigate();
    const [error_in_input, change_error_in_input] = useState(false);
    const [submission_attempt, change_submission_attempt] = useState(0);

    let error_msg = "";
    const [error_state, change_error_state] = useState(error_msg);

    const [username, set_username] = useState("");
    const [firstName, set_firstName] = useState("");
    const [lastName, set_lastName] = useState("");
    const [email, set_email] = useState("");
    const [password, set_password] = useState("");
    const [confirm_password, set_confirm_password] = useState("");

    const handleInputChange = (set_func) => {
        return (event) => set_func(event.target.value);
    };

    useEffect(() => {
        if (submission_attempt > 0 && !error_in_input) {
            const newUser = {
                username: username,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
            };
            _userSignup(newUser)
                .then((data) => {
                    if (data.success) {
                        navigate_to_select_genre("/selectgenre");
                    } else {
                        error_msg = "Username or password already taken!";
                        change_error_state(error_msg);
                        change_error_in_input(true);
                    }
                })
                .catch((err) => {
                    error_msg = "400 Bad Request";
                    change_error_state(error_msg);
                    change_error_in_input(true);
                    console.log(err);
                });
        }
    }, [submission_attempt]);

    return (
        <div
            className="text-white h-[100vh] flex justify-center items-center bg-cover"
            style={{ backgroundImage: "url('../src/assets/bookstore-bg.jpg')" }}
        >
            <div className="bg-slate-800 border border-slate-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
                <h1 className="text-4xl font-bold text-center mb-8">
                    Register
                </h1>
                <div>
                    <div className="relative my-4">
                        <input
                            type="text"
                            value={username}
                            onChange={handleInputChange(set_username)}
                            className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            User Name
                        </label>
                        {/* <BiUser className="absolute top-4 right-4 text-slate-400" /> */}
                    </div>
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
                    <div className="relative my-4">
                        <input
                            type="text"
                            value={email}
                            onChange={handleInputChange(set_email)}
                            className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email
                        </label>
                        {/* <BiUser className="absolute top-4 right-4 text-slate-400" /> */}
                    </div>
                    <div className="relative my-4">
                        <input
                            type="password"
                            value={password}
                            onChange={handleInputChange(set_password)}
                            className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Your Password
                        </label>
                        {/* <AiOutlineUnlock className="absolute top-4 right-4 text-slate-400" /> */}
                    </div>
                    <div className="relative my-4">
                        <input
                            type="password"
                            value={confirm_password}
                            onChange={handleInputChange(set_confirm_password)}
                            className="block w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
                            placeholder=" "
                        />
                        <label className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Your Confirm Password
                        </label>
                        {/* <AiOutlineUnlock className="absolute top-4 right-4 text-slate-400" /> */}
                    </div>
                    <button
                        className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-600 hover:text-white py-2 transition-colors duration-300"
                        // type="submit"
                        onClick={() => {
                            if (username == "") {
                                error_msg = "Username can't be empty";
                            } else if (firstName == "") {
                                error_msg = "First name can't be empty";
                            } else if (lastName == "") {
                                error_msg = "Last name can't be empty";
                            } else if (email == "") {
                                error_msg = "Email can't be empty";
                            } else if (password.length < 6) {
                                error_msg =
                                    "Password have to be at least 6 digit long";
                            } else if (password != confirm_password) {
                                error_msg = "Password don't match";
                            } else {
                                error_msg = "";
                            }
                            change_error_state(error_msg);
                            if (error_msg) {
                                change_error_in_input(true);
                            } else {
                                change_submission_attempt(
                                    submission_attempt + 1
                                );
                                change_error_in_input(false);
                            }
                        }}
                    >
                        {" "}
                        Register
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
                            <span>
                                Already Register?{" "}
                                <span className="text-blue-500">
                                    {" "}
                                    <Link to="/Login">Login</Link>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

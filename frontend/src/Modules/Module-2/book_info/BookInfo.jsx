import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../../../common_components/Footer";
import MenuDropdown from "../../../common_components/MenuDropdown";
import login_info from "../../../login_info";
import {
    _addBookToShelf,
    _getShelves,
    _removeFromShelf,
    _userInfo,
} from "../../../utils/axios_controllers";
import "./BookInfo.css";
import { queryClient } from "../../../main";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function () {

    // ! fetch
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    console.log(data?.data?.shelves);

    const navigate_to = useNavigate();
    let name, author, rating, genre, image_url, description, b_id;
    const [bg_image, set_bg_image] = useState(
        `url('./src/assets/the_foundation_2.jpg')`
    );


    // !mutate
    const addBookToShelfMutation = useMutation({
        mutationFn: ({ bookId, shelfId }) => _addBookToShelf(bookId, shelfId),
        onSuccess: () => {
            toast.success('Book added successfully')
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // navigate(-1)
        },
    })

    const deleteBookToShelfMutation = useMutation({
        mutationFn: ({ bookId, shelfId }) => _removeFromShelf(bookId, shelfId),
        onSuccess: () => {
            toast.success('Book deleted successfully')
            // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // navigate(-1)
        },
    })


    try {
        const { state } = useLocation();
        image_url = state.image_url;
        name = state.name;
        author = state.author;
        rating = state.rating;
        genre = state.genre;
        description = state.description;
        b_id = state.b_id;
        // console.log(state.b_id);
    } catch (e) {
        b_id = "foo";
        image_url = "./src/assets/the_foundation_2.jpg";
        name = "The Foundation 3";
        author = "Isaac Asimov";
        rating = 4.8;
        genre = ["fantasy"];
    }

    const libraryFolder_t = [
        {
            name: "To Read",
            books: ["655b12886c1fab9f95fd40b2", "6568a3f22ca94ac2fa0be2cf"],
        },
        {
            name: "Read",
            books: ["655b12886c1fab9f95fd40b2", "655c9b2c545a2f3bb0b7c130"],
        },
        {
            name: "Reading",
            books: ["655b12886c1fab9f95fd40b2", "655cf7b7ea40310f48cf29ee"],
        },
        {
            name: "Custom",
            books: [
                "6568a3f22ca94ac2fa0be2cf",
                "655c9b2c545a2f3bb0b7c130",
                "655cf7b7ea40310f48cf29ee",
            ],
        },
    ];

    const [libraryFolder, change_libraryFolder] = useState(libraryFolder_t);
    const [sync_success, change_sync_success] = useState(0);

    useEffect(() => {
        set_bg_image(`url('${image_url}')`);

        if (login_info.user_name) {
            _getShelves(login_info.user_name).then((data) => {
                const tmp_data = data.shelves.map((item) => {
                    // console.log(item.books);
                    return {
                        name: item.label,
                        books: item.books.map((elm) => elm.book),
                    };
                });
                change_libraryFolder(tmp_data);
                // console.log(tmp_data);
            });
        } else {
            console.log("Not logged in");
        }
    }, []);

    console.log({ b_id }, 104);

    return (
        <div
            className="flex flex-col bg-cover"
            // subject to change based on relative image link
            style={{ backgroundImage: bg_image }}
        >
            <div className="shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30">
                <div className="backdrop-blur-sm bg-black/70">
                    <div className="navbar bg-base-100">
                        <div className="flex-1">
                            <a className="btn btn-ghost text-xl">BabarDua</a>
                        </div>
                        <div className="flex-none gap-2">
                            <MenuDropdown />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 content-center bi-info-page-mid">
                        <div className="justify-self-center self-center bi-book-cover">
                            <img
                                src={image_url}
                                alt="Cover"
                                className="object-cover max-h-screen"
                            />
                        </div>
                        <div className="flex flex-col justify-self-center self-center gap-2">
                            {/* place inoframtions here */}
                            <div>
                                <h1 className="mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white break-all">
                                    {name}
                                </h1>
                            </div>
                            <div className="flex flex-row gap-2">
                                <div className="rating">
                                    <input
                                        type="radio"
                                        name="rating-2"
                                        className="mask mask-star-2 bg-orange-400"
                                        checked
                                    />
                                </div>
                                <h5 className="text-xl font-bold dark:text-white">
                                    {rating}
                                </h5>
                            </div>
                            <div className="bi-author-name-display">
                                <h3 className="text-3xl font-bold dark:text-white break-all">
                                    {author}
                                </h3>
                            </div>
                            <div>
                                <h3 className="text-3xl font-semibold dark:text-white break-all">
                                    Description:
                                </h3>
                            </div>
                            <div>
                                <p className="text-lg text-gray-900 dark:text-white">
                                    {description}
                                </p>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {genre.map((item) => (
                                    <span className="bg-gray-100 text-gray-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                                        {item}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <div className="dropdown dropdown-end dropdown-top">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                    >
                                        Add to Library
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                    >
                                        {data?.data?.shelves?.map((item) => (
                                            <li
                                                onClick={() => addBookToShelfMutation.mutate({ shelfId: item?._id, bookId: b_id })}
                                            >
                                                <a>{item.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="dropdown dropdown-end dropdown-top">
                                    <div
                                        tabIndex={0}
                                        role="button"
                                        className="btn bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                    >
                                        Delete from Library
                                    </div>
                                    <ul
                                        tabIndex={0}
                                        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                                    >
                                        {data?.data?.shelves?.map((item) => (
                                            <li
                                                onClick={() => deleteBookToShelfMutation.mutate({ shelfId: item?._id, bookId: b_id })}
                                            >
                                                <a>{item.label}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <button
                                        className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                                        onClick={() => {
                                            navigate_to("/bookreview", {
                                                state: {
                                                    b_id: b_id,
                                                    name: name,
                                                    image_url: image_url,
                                                },
                                            });
                                        }}
                                    >
                                        Reviews
                                    </button>
                                </div>
                            </div>
                            {sync_success == 0 ? (
                                ""
                            ) : sync_success == 1 ? (
                                <div
                                    role="alert"
                                    className="alert alert-success"
                                >
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
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>Action Completed Successfully.</span>
                                </div>
                            ) : (
                                <div role="alert" className="alert alert-error">
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
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                    <span>
                                        Error! Can't Perform the Action.
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

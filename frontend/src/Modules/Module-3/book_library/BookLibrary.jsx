import { useEffect, useState } from "react";
import Footer from "../../../common_components/Footer";
import login_info from "../../../login_info";
import "./BookLibrary.css";
import MenuBar from "./subcomponents/MenuBar";
import MiddleSection from "./subcomponents/MiddleSection";

// import { fetchBooks } from "../api_controller/loadBooks";
import { useLocation } from "react-router-dom";
import {
    _createShelf,
    _deleteShelf,
    _fetchBooks,
    _getShelves,
    _userInfo
} from "../../../utils/axios_controllers";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../main";

export default function () {
    // ! fetching user information
    const { data, isLoading, refetch } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    const { data: allBooks, isLoading: allBookLoading } = useQuery({ queryKey: ['books'], queryFn: _fetchBooks })

    console.log({ shelves: data?.data?.shelves });
    console.log({ allBooks });

    // ! mutation
    const addLibraryMutation = useMutation({
        mutationFn: _createShelf,
        onSuccess: () => {
            // Invalidate and refetch
            refetch()

        },
    })
    const deleteLibraryMutation = useMutation({
        mutationFn: _deleteShelf,
        onSuccess: () => {
            // Invalidate and refetch
            refetch()
        },
    })


    let user_name = data?.data?.firstName + " " + data?.data?.lastName;

    //     const { state } = useLocation();
    //     user_name = state.user_name;
    // } catch (e) {
    //     // console.log(e);
    //     user_name = "Ahsan Habib";
    // }
    if (login_info.user_name) user_name = login_info.first_name;

    const [current_page, change_current_page] = useState(1);
    const [is_sorted_by_rating, change_is_sorted_by_rating] = useState(false);
    const [genres, set_genres] = useState(["All", "romance"]);


    // const books_t = [
    //     {
    //         name: "The Foundation 1",
    //         author: "Isaac Asimov",
    //         rating: 4.8,
    //         id: "foo",
    //         genre: ["romance", "fiction"],
    //         cover: "./src/assets/the_foundation_2.jpg",
    //         description: "loren ipsam",
    //     },
    // ];
    const [libraryFolder, change_libraryFolder] = useState();
    const [libUpdateTriggered, set_libUpdateTriggered] = useState(0);

    const [newLibraryName, set_newLibraryName] = useState("");
    const [books, set_books_data] = useState();
    // api changes
    // const books = [];
    const set_data = async () => {
        const data = await _fetchBooks();
        // console.log(data);
        const tmp_books = [];
        const tmp_genres = ["All"];
        for (let i = 0; i < data.length; i++) {
            const tmp = {};
            tmp.id = data[i]._id;
            tmp.name = data[i].title;
            tmp.author = data[i].author;
            tmp.genre = data[i].genres;
            tmp.rating = parseFloat(data[i].avgRating);
            tmp.cover = data[i].image;
            tmp.description = data[i].description;
            tmp_books.push(tmp);
            tmp_genres.push(
                ...data[i].genres.filter((item) => !tmp_genres.includes(item))
            );
        }
        // console.log(tmp_genres);
        set_genres(tmp_genres);
        // change_books_to_show(tmp_books);
        tmp_books.sort((a, b) => a.name.localeCompare(b.name));
        set_books_data(tmp_books);
    };

    const set_shelves = async () => {
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
    };



    const handleInputChange = (set_func) => {
        return (event) => set_func(event.target.value);
    };

    // end changes

    const [books_to_show, change_books_to_show] = useState(books);
    // let bookpage_heading_text = searched_keyword
    //     ? 'Showing Search Result for Keyword "' + searched_keyword + '"'
    //     : current_genre
    //     ? current_genre === "All"
    //         ? "Showing All Books"
    //         : 'Showing Books Related to "' + current_genre + '"'
    //     : "Showing Recommended Books for " + user_name;
    let bookpage_heading_text = `Book Library for ${user_name}`;

    return (
        <>
            {!isLoading ? <div className="flex flex-col">
            <MenuBar
                books={books}
                change_current_page={change_current_page}
                change_books_to_show={change_books_to_show}
                change_is_sorted_by_rating={change_is_sorted_by_rating}
            />
            <div className="grid justify-items-stretch grid-cols-2">
                <div className="flex flex-row bi-bookpage-heading">
                    <h2 className="text-2xl font-bold dark:text-white">
                        {bookpage_heading_text}
                        </h2>
                    </div>
                    {/*  adding book shelf and shelf display */}

                <div className="flex justify-self-end bi-toggle-button gap-2">
                    <div>
                        <button
                            className="btn btn-sm btn-success rounded-none w-20 h-4"
                            onClick={() =>
                                document
                                    .getElementById("my_modal_1")
                                    .showModal()
                            }
                        >
                            Add Shelf
                        </button>
                        <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                                <div className="flex flex-col gap-4">
                                    <h3 className="font-bold text-lg">
                                        Add a Shelf
                                    </h3>
                                    <input
                                        value={newLibraryName}
                                        onChange={handleInputChange(
                                            set_newLibraryName
                                        )}
                                        type="text"
                                        placeholder="Type here"
                                        className="input input-bordered input-success w-full max-w-xs"
                                    />
                                </div>
                                <div className="modal-action">
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button
                                            className="btn btn-sm btn-error rounded-none w-20 h-4"
                                            style={{ marginRight: 4 }}
                                        >
                                            Cancel
                                        </button>
                                            <button
                                            className="btn btn-sm btn-success rounded-none w-20 h-4"
                                                // onClick={addLibraryMutation(newLibraryName)}
                                                onClick={() => addLibraryMutation.mutate(newLibraryName)}
                                        >
                                            OK
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                    </div>
                    <div className="dropdown dropdown-end">
                        <div
                            tabIndex={0}
                            role="button"
                            className="btn btn-sm btn-error rounded-none w-20 h-4"
                        >
                            Delete Shelf
                        </div>
                            <ul
                            tabIndex={0}
                            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                        >
                                {data?.data?.shelves.map((item) => (
                                    <li
                                        onClick={() => deleteLibraryMutation.mutate(item._id)}
                                    >
                                        <a>{item.label}</a>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </div>
            </div>
                <div className="bg-[url('./src/assets/bookstore-bg.jpg')]">
                <MiddleSection
                        libraryFolder={data?.data?.shelves}
                    genres={genres}
                        all_books={allBooks}
                    books_to_show={books_to_show}
                    change_books_to_show={change_books_to_show}
                    current_page={current_page}
                    change_current_page={change_current_page}
                    change_is_sorted_by_rating={change_is_sorted_by_rating}
                />
            </div>
            <Footer />
            </div> : <span className="loading loading-spinner loading-xs"></span>
            }
        </>

    );
}

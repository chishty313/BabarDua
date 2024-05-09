import { useEffect, useState } from "react";
import Footer from "../../../common_components/Footer";
import "./BookSearch.css";
import MenuBar from "./subcomponents/MenuBar";
import MiddleSection from "./subcomponents/MiddleSection";

// import { fetchBooks } from "../api_controller/loadBooks";
import { useLocation } from "react-router-dom";
import login_info from "../../../login_info";
import {
    _fetchBooks,
    _userInfo
} from "../../../utils/axios_controllers";
import { useQuery } from "@tanstack/react-query";

export default function () {
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    let user_name, recommended_genre;

    try {
        const { state } = useLocation();
        user_name = data?.data?.firstName + " " + data?.data?.lastName;
        recommended_genre = ["Thriller"];
    } catch (e) {
        console.log(e);
        user_name = "Ahsan Habib";
        recommended_genre = ["Thriller"];
    }
    if (login_info.user_name) user_name = login_info.first_name;

    const [searched_keyword, change_searched_keyword] = useState("");
    const [current_genre, change_current_genre] = useState("");
    const [current_page, change_current_page] = useState(1);
    const [is_sorted_by_rating, change_is_sorted_by_rating] = useState(false);
    const [genres, set_genres] = useState(["All", "romance"]);

    const books_t = [
        {
            name: "The Foundation 1",
            author: "Isaac Asimov",
            rating: 4.8,
            id: "foo",
            genre: ["romance", "fiction"],
            cover: "./src/assets/the_foundation_2.jpg",
            description: "loren ipsam",
        },
    ];
    const [books, set_books_data] = useState([...books_t]);
    const recommended_book_list = (target) =>
        target.filter((item) => {
            let choose = false;
            for (let i = 0; i < recommended_genre.length; i++) {
                choose = item.genre.includes(recommended_genre[i]) | choose;
            }
            return choose;
        });

    // api changes
    // const books = [];
    const set_data = async () => {
        const data = await _fetchBooks();
        // console.log(data);
        const tmp_books = [];
        const tmp_genres = ["All"];
        for (let i = 0; i < data.length; i++) {
            // console.log(data);
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
        tmp_books.sort((a, b) => a.name.localeCompare(b.name));
        change_books_to_show(recommended_book_list(tmp_books));
        return set_books_data(tmp_books);
    };
    // set_data();
    useEffect(() => {
        set_data();
    }, []);

    // end changes

    const [books_to_show, change_books_to_show] = useState(
        recommended_book_list(books)
    );
    let bookpage_heading_text = searched_keyword
        ? 'Showing Search Result for Keyword "' + searched_keyword + '"'
        : current_genre
        ? current_genre === "All"
            ? "Showing All Books"
            : 'Showing Books Related to "' + current_genre + '"'
        : "Showing Recommended Books for " + user_name;

    return (
        <>
            {!isLoading ? <div className="flex flex-col">
            <MenuBar
                books={books}
                change_searched_keyword={change_searched_keyword}
                change_current_genre={change_current_genre}
                change_current_page={change_current_genre}
                change_books_to_show={change_books_to_show}
                change_is_sorted_by_rating={change_is_sorted_by_rating}
            />
            <div className="grid justify-items-stretch grid-cols-2">
                <div className="flex flex-row bi-bookpage-heading">
                    <h2 className="text-2xl font-bold dark:text-white">
                        {bookpage_heading_text}
                    </h2>
                    {searched_keyword || current_genre ? (
                        <button
                            className="btn btn-sm btn-square btn-outline"
                            onClick={() => {
                                change_is_sorted_by_rating(false);
                                change_books_to_show(
                                    recommended_book_list(books)
                                );
                                change_current_page(1);
                                if (current_genre) {
                                    change_current_genre("");
                                }
                                if (searched_keyword) {
                                    change_searched_keyword("");
                                }
                            }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    ) : (
                        ""
                    )}
                </div>
                <div className="justify-self-end bi-toggle-button">
                    <button
                        className="btn btn-sm rounded-none w-48 h-4"
                        onClick={() => {
                            // console.log(is_sorted_by_rating);
                            change_current_page(1);
                            const books_to_sort = [...books_to_show];
                            if (is_sorted_by_rating) {
                                books_to_sort.sort((a, b) =>
                                    a.name.localeCompare(b.name)
                                );
                            } else {
                                books_to_sort.sort((a, b) => {
                                    return a.rating == b.rating
                                        ? 0
                                        : a.rating > b.rating
                                        ? -1
                                        : 1;
                                });
                            }
                            // console.log(books_to_sort);
                            change_books_to_show(books_to_sort);
                            change_is_sorted_by_rating(!is_sorted_by_rating);
                        }}
                    >
                        {is_sorted_by_rating
                            ? "Sorted By Rating"
                            : "Sorted Alphabetically"}
                    </button>
                </div>
            </div>
            <div className="bg-[url('./src/assets/bookstore-bg.jpg')]">
                <MiddleSection
                    genres={genres}
                    books={books}
                    change_current_genre={change_current_genre}
                    change_searched_keyword={change_searched_keyword}
                    books_to_show={books_to_show}
                    change_books_to_show={change_books_to_show}
                    current_page={current_page}
                    change_current_page={change_current_page}
                    change_is_sorted_by_rating={change_is_sorted_by_rating}
                />
            </div>
            <Footer />
            </div> :
                <span className="loading loading-spinner loading-xs"></span>
            }
        </>
    );
}

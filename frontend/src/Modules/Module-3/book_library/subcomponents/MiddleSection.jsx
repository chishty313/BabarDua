import { useState } from "react";
import BookCards from "../../../../common_components/BookCards";
import SingleBookCard from "../../../../common_components/SingleBookCard";

export default function ({
    libraryFolder,
    genres,
    all_books,
    books_to_show,
    change_books_to_show,
    current_page,
    change_current_page,
    change_is_sorted_by_rating,
}) {

    console.log({ libraryFolder });

    const [libraryBooks, setLibraryBooks] = useState([])
    return (
        <div className="shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative ">
            <div className="drawer lg:drawer-open ">
                <input
                    id="my-drawer-2"
                    type="checkbox"
                    className="drawer-toggle"
                />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    {libraryBooks?.map(id => <SingleBookCard
                        id={id}
                    />

                    )
                    }

                    <label
                        htmlFor="my-drawer-2"
                        className="btn btn-neutral drawer-button lg:hidden"
                    >
                        Select Genre
                    </label>
                </div>
                <div className="drawer-side bi-sidebar">
                    <label
                        htmlFor="my-drawer-2"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}
                        {libraryFolder?.map(({ label, books }) => (
                            <li
                                onClick={() => {
                                    // // change_is_sorted_by_rating(false);

                                    // const filtered_book = all_books?.filter(
                                    //     (item) => books?.includes(item?.id)
                                    // );
                                    // console.log(filtered_book);
                                    setLibraryBooks(books);
                                }}
                            >
                                <a>{label}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

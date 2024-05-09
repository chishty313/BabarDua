import { useState } from "react";
import Card from "./Card";

export default function ({ books_to_show, current_page, change_current_page }) {
    // console.log(books_to_show);
    if (books_to_show.length != 0) {
        const number_of_page = Math.ceil(books_to_show.length / 6);
        let current_books = books_to_show.slice(
            current_page * 6 - 6,
            current_page * 6
        );

        return (
            <div className="grid gap-4">
                <div className="grid grid-cols-3 grid-rows-2 gap-4">
                    {current_books.map((item) => (
                        <Card
                            name={item.name}
                            author={item.author}
                            rating={item.rating}
                            genre={item.genre}
                            cover={item.cover}
                            description={item.description}
                            b_id={item.id}
                        />
                    ))}
                </div>
                <div className="join place-self-center">
                    <button
                        className="join-item btn"
                        onClick={() => {
                            if (current_page > 1) {
                                change_current_page(current_page - 1);
                            }
                        }}
                    >
                        «
                    </button>
                    <button className="join-item btn">
                        Page {current_page}
                    </button>
                    <button
                        className="join-item btn"
                        onClick={() => {
                            if (current_page < number_of_page) {
                                change_current_page(current_page + 1);
                            }
                        }}
                    >
                        »
                    </button>
                </div>
            </div>
        );
    } else {
        return <h1>No Books Found</h1>;
    }
}

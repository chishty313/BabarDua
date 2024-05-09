import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ({
    name,
    author,
    rating,
    genre,
    cover,
    description,
    b_id,
}) {
    const image_url = cover;
    const name_mod = name.length > 20 ? name.slice(0, 16) + " ..." : name;
    const author_mod =
        author.length > 30 ? author.slice(0, 26) + " ..." : author;
    const genre_mod =
        genre.length > 2 ? [genre[0], genre[1], "..."] : [...genre];
    const navigate = useNavigate();
    return (
        <div
            className="card w-72 bg-base-50 shadow-xl cursor-pointer backdrop-blur-sm bg-black/40"
            onClick={() => {
                console.log(name + " Clicked");
                navigate("/bookinfo", {
                    state: {
                        b_id: b_id,
                        name: name,
                        author: author,
                        rating: rating,
                        genre: [...genre],
                        image_url: image_url,
                        description: description,
                    },
                });
            }}
        >
            {/* <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
            <figure>
                <img
                    src={image_url}
                    alt="Cover"
                    className="object-cover h-48 w-96"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {name_mod}
                    <div className="badge badge-secondary">{rating}</div>
                </h2>
                <p>{author_mod}</p>
                <div className="card-actions justify-end">
                    {genre_mod.map((item) => (
                        <div className="badge badge-outline">{item}</div>
                    ))}
                </div>
            </div>
        </div>
    );
}

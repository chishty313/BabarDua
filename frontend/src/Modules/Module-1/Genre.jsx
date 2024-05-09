import { useState } from "react";

const Genre = (genre) => {
    const [isActive, setIsActive] = useState(false);
    const handleButtonClick = () => {
        setIsActive(!isActive);
    };
    const buttonClass = isActive
        ? "btn btn-active btn-outline btn-secondary"
        : "btn btn-outline btn-secondary";
    // console.log(genre);
    return (
        <div className="">
            <div className="">
                <button
                    id="genre-button"
                    onClick={handleButtonClick}
                    className={buttonClass}
                >
                    {genre.genre}
                </button>
            </div>
        </div>
    );
};

export default Genre;

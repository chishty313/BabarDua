import React from "react";
import Footer from "../../../common_components/Footer";
import MenuDropdown from "../../../common_components/MenuDropdown";
import Review from "./subcomponents/Review";
// import "../book_search/subcomponents/styles/MenuBar.css";

export default () => {
    return (
        <div>
            <div className="navbar bg-base-100 bi-nav">
                <div className="navbar bg-base-100">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-xl">BabarDua</a>
                    </div>
                    <div className="flex-none gap-2">
                        <MenuDropdown />
                    </div>
                </div>
            </div>
            {/* <EditReview /> */}
            <Review />
            <Footer />
        </div>
    );
};

// export default BookReview;

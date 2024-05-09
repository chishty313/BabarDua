// UserProfile.jsx
import React from "react";
import Footer from "../../../common_components/Footer";
import MenuDropdown from "../../../common_components/MenuDropdown";
import ChallengeDetails from "./subcomponents/ChallengeDetails";
import UserDetails from "./subcomponents/UserDetails";
import { _userInfo } from "../../../utils/axios_controllers";

const UserProfile = () => {


    return (
        <div className="flex flex-col">
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">BabarDua</a>
                </div>
                <div className="flex-none gap-2">
                    <MenuDropdown />
                </div>
            </div>
            <div className="m-auto p-4 w-screen">
                <div className="grid grid-cols-2 items-">
                    <div>
                        <UserDetails />
                    </div>

                    <div>
                        <ChallengeDetails />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default UserProfile;

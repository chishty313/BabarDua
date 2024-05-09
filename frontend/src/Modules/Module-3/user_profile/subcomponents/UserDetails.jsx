import React from "react";
import { useNavigate } from "react-router-dom";
import login_info from "../../../../login_info";
import { useQuery } from "@tanstack/react-query";
import { _userInfo } from "../../../../utils/axios_controllers";

const UserDetails = () => {
    const navigate_to = useNavigate();
    const { data, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    // const user = {
    //     name: login_info.user_name,
    //     email: login_info.email,
    //     profilePicture: "https://placekitten.com/200/200",
    // };

    return (
        <div className="p-4 text-center">
            {/* User Picture */}
            <div className="overflow-hidden  flex justify-center">
                {/* <img
                    src={user.profilePicture}
                    alt="User Profile"
                    className="rounded-full m-4"
                /> */}
            </div>

            {/* User Details */}
            <div className="">
                <h2 className="text-3xl font-bold m-4">{`${data?.data.firstName} ${data?.data?.lastName}[@${data?.data.username}]`}</h2>
                <p className="text-gray-600 text-2xl m-4">{data?.data.email}</p>
            </div>

            {/* Edit Profile Button */}
            <button
                className="btn btn-primary m-4"
                onClick={() => {
                    navigate_to("/editprofile");
                }}
            >
                Edit Profile
            </button>
        </div>
    );
};

export default UserDetails;

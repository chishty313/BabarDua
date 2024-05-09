import React from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import {
    _deleteUser,
    _updateUser,
    _userInfo
} from "../../src/utils/axios_controllers";

const UserManagement = () => {

    // const { data: user, isLoading } = useQuery({ queryKey: ['userInfo'], queryFn: _userInfo })
    // // userName = data?.data?.firstName + " " + data?.data?.lastName

    const fetchAllUsers = async () => {
        const response = await axios.get('http://localhost:4000/api/v1/user/users');
        console.log(response?.data, 10);
        return response?.data;
    };

    const { data, isLoading, error, refetch } = useQuery({ queryKey: ['users'], queryFn: fetchAllUsers });

    // !mutate
    const updateUserMutation = useMutation({
        mutationFn: _updateUser,
        onSuccess: () => {
            refetch()
        },
    })

    const deleteUserMutation = useMutation({
        mutationFn: _deleteUser,
        onSuccess: () => {
            refetch()
        },
    })



    return (
        <div className='bg-white'>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">BabarDua</a>
                </div>
                <div className="flex-none gap-2">
                    <MenuDropdown />
                </div>
            </div>
            <div className="overflow-x-auto px-20 mx-20">
                <table className="table px-20 mx-20">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                            {/* <th>Given At</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {data?.user?.map(user => <tr>
                            <th></th>
                            <td className='font-black'>{user.username}</td>
                            <td className='font-black'>{user.role}</td>
                            <td>
                                {!user.isBanned ? <button
                                    onClick={() => updateUserMutation.mutate({ isBanned: true, id: user._id })}
                                    className="btn btn-info mx-3">Ban</button> :
                                    <button
                                        onClick={() => updateUserMutation.mutate({ isBanned: false, id: user._id })}
                                        className="btn btn-info mx-3">un Ban</button>
                                }


                                <button
                                    onClick={() => deleteUserMutation.mutate(user._id)}
                                    className="btn btn-info mx-3">
                                    Delete
                                </button>


                            </td>
                            {/* <td>{user.createdAt}</td> */}
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default UserManagement;
import React from 'react';
import { useQuery } from "@tanstack/react-query";
import axios from 'axios';
import MenuDropdown from '../common_components/MenuDropdown';
const Donars = () => {


    const fetchAllDonars = async () => {
        const response = await axios.get('http://localhost:4000/api/v1/donar');
        return response?.data;
        console.log(response?.data, 8);
    };

    const { data, isLoading, error, refetch } = useQuery({ queryKey: ['donars'], queryFn: fetchAllDonars });



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
                            <th>Donation Amount</th>
                            <th>status</th>
                            <th>Given At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {data?.donars?.map(donar => <tr>
                            <th></th>
                            <td>{donar?.userId?.username}</td>
                            <td>{donar?.amount}</td>
                            <td>{donar?.success}</td>
                            <td>{donar?.createdAt}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Donars;
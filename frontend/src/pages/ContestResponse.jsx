import React from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import { _getAllContestResponse, _updateContest } from '../utils/axios_controllers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaCrown } from "react-icons/fa";
const ContestResponse = () => {

    const { data, isLoading, error, refetch } = useQuery({ queryKey: ['contest'], queryFn: _getAllContestResponse });

    // !mutate
    const editContentResultMutation = useMutation({
        mutationFn: ({ id, updatedInfo }) => _updateContest(id, updatedInfo),
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
                            <th>User Name</th>
                            <th>Contest Name</th>
                            <th>Response</th>
                            <th>Given At</th>
                            <th>Winner</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.contestResponses?.map(response => <tr>
                                <th></th>
                                <td className='font-black'>{response.userId?.username}</td>
                                <td className='font-black'>{response?.contestId?.contestName}</td>
                                <td className='font-black'>{response?.writings}</td>
                                <td className='font-black'>{response?.createdAt}</td>
                                {!response?.contestId?.winnerId ? <td className='font-black'> <button
                                    onClick={() => editContentResultMutation.mutate({
                                        id: response?.contestId?._id,
                                        updatedInfo: {
                                            winnerId: response.userId?._id,
                                            winnerResponse: response?._id,
                                            isActive: false,
                                        }
                                    })}
                                    className='btn btn-primary'>
                                    Make Winner
                                </button>   </td> : <td
                                    className='font-black'>
                                    {response.userId?.username}
                                    <FaCrown className='mx-3 inline' />
                                </td>}

                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ContestResponse;
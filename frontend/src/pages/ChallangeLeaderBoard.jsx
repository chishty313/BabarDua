import React from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import { useQuery } from '@tanstack/react-query';
import { _getLeaderBoard } from '../utils/axios_controllers';

const ChallangeLeaderBoard = () => {

    const { data, isLoading, error, refetch } = useQuery({ queryKey: ['users'], queryFn: _getLeaderBoard });

    // console.log({ data: data?.data });
    // !mutate
    // const updateUserMutation = useMutation({
    //     mutationFn: _updateUser,
    //     onSuccess: () => {
    //         refetch()
    //     },
    // })


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
                            <th>Progress</th>
                            <th>Target Book</th>
                            <th>Completed Book</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {data?.data?.map(user => <tr>
                            <th></th>
                            <td className='font-black'>{user.user[0]?.username}</td>
                            <td className='font-black'>{user.progress}</td>
                            <td className='font-black'>{user.targetBooks}</td>
                            <td className='font-black'>{user.completedBooks}</td>
                        </tr>)}
                    </tbody>
                </table>
            </div>
        </div >
    );
};

export default ChallangeLeaderBoard;
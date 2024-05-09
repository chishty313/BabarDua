import React from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import { useQuery } from '@tanstack/react-query';
import { _getAllBookRequest } from '../utils/axios_controllers';

const BookAddRequest = () => {
    const { data, isLoading, error, refetch } = useQuery({ queryKey: ['bookRequest'], queryFn: _getAllBookRequest });
    // console.log({ data });
    return (
        <div>
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
                                <th>ISBN</th>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Genre</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {data?.data?.map(request => <tr>
                                <th></th>
                                <td className='font-black'>{request?.userId?.username}</td>
                                <td className='font-black'>{request.isbn}</td>
                                <td className='font-black'>{request.title}</td>
                                <td className='font-black'>{request.author}</td>
                                <td className='font-black'>{request.genres}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div >
        </div>
    );
};

export default BookAddRequest;
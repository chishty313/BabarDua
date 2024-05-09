import React, { useState } from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import { _allContest, _createContest, _createContestResponse } from '../utils/axios_controllers';
import { useMutation, useQuery } from '@tanstack/react-query';
import ParticipateContest from '../common_components/ParticipateContest';
import { FaCrown } from "react-icons/fa";
const Contest = () => {

    const { data, isLoading, error, refetch } = useQuery({ queryKey: ['contest'], queryFn: _allContest });

    // console.log(data?.data);
    // !mutate
    const participateContestMutation = useMutation({
        mutationFn: _createContestResponse,
        onSuccess: () => {
            toast.success('Received')
            document.getElementById('contestParticipate_modal').close()
            refetch()
            setResponseInfo({
                contestId: '',
                userId: '',
                writings: '',
            });
        },
    })
    const [responseInfo, setResponseInfo] = useState({
        contestId: '',
        writings: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setResponseInfo({
            ...responseInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call your function to handle the contest response here, passing responseInfo
        console.log('Contest response data:', responseInfo);
        // Reset the form after submission
        participateContestMutation.mutate(responseInfo);

    };

    const openParticipationModal = (id) => {
        setResponseInfo({
            ...responseInfo,
            contestId: id,
        });
        document.getElementById('contestParticipate_modal').showModal()
    }
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
                            <th>Contest Name</th>
                            <th>Contest Details</th>
                            <th>Active</th>
                            <th>Created At</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {data?.data?.map(contest => <tr>
                            <th></th>
                            <th>{contest?.contestName}</th>
                            {/* <td className='font-black'>{contest.contestName}</td> */}
                            <td className='font-black'>{contest.details}</td>
                            <td className='font-black'>{contest.isActive ? 'On Going' : 'Closed'}</td>
                            <td className='font-black'>{contest.createdAt}</td>
                            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
                            {!contest?.winnerId ? <td className='font-black'>
                                {contest.isActive ? <button
                                    onClick={() => openParticipationModal(contest._id)}
                                    className='mx-2 btn'>Participate</button> : null}
                            </td> : <td className='font-black'>{contest.winnerId?.username} <FaCrown className='inline mx-2' /></td>
                            }
                            <ParticipateContest
                                responseInfo={responseInfo} setResponseInfo={setResponseInfo}
                                handleChange={handleChange}
                                id={contest._id}
                                handleSubmit={handleSubmit} />
                        </tr>)}
                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default Contest;
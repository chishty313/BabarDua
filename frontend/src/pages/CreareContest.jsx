import React, { useState } from 'react';
import MenuDropdown from '../common_components/MenuDropdown';
import { _createContest } from '../utils/axios_controllers';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const CreateContest = () => {

    // !mutate
    const addContestMutation = useMutation({
        mutationFn: _createContest,
        onSuccess: () => {
            toast.success('Contest successfully added')
            // // Invalidate and refetch
            // queryClient.invalidateQueries({ queryKey: ['specificBookReview'] })
            // navigate(-1)
        },
    })
    const [contestData, setContestData] = useState({
        contestName: '',
        isActive: true,
        details: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContestData({
            ...contestData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Call your function to create the contest here, passing contestData
        console.log('Contest data:', contestData);
        addContestMutation.mutate(contestData)
        // Reset the form after submission
        // setContestData({
        //     contestName: '',
        //     userId: '',
        //     isActive: true,
        //     details: '',
        // });
    };

    return (
        <div>
            <div className="navbar bg-base-100">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">BabarDua</a>
                </div>
                <div className="flex-none gap-2">
                    <MenuDropdown />
                </div>
            </div>
            <div className='w-[80vw] p-4 py-10 rounded-lg shadow-xl mx-auto bg-white'>
                <p>Create a Contest here</p>
                <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto">
                    <label className="block mb-2">
                        <span className="text-gray-700">Contest Name:</span>
                        <input
                            type="text"
                            name="contestName"
                            value={contestData.contestName}
                            onChange={handleChange}
                            className="form-input mt-1 block w-full rounded-lg bg-white border-2 border-black"
                        />
                    </label>
                    {/* You can manage user selection or authentication elsewhere */}
                    {/* <label className="block mb-2">
    <span className="text-gray-700">User ID:</span>
    <input
      type="text"
      name="userId"
      value={contestData.userId}
      onChange={handleChange}
      className="form-input mt-1 block w-full"
    />
  </label> */}
                    <label className="block mb-2">
                        <span className="text-gray-700">Details:</span>
                        <textarea
                            name="details"
                            value={contestData.details}
                            onChange={handleChange}
                            className="form-textarea mt-1 block w-full rounded-lg bg-white border-2 border-black"
                        ></textarea>
                    </label>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Create Contest
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateContest;

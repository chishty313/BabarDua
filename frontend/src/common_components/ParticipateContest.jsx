import React, { useState } from 'react';
import { _createContest } from '../utils/axios_controllers';
import { toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';

const ParticipateContest = ({ id, handleSubmit, handleChange, participateContestMutation, responseInfo, setResponseInfo }) => {


    return (
        <dialog id="contestParticipate_modal" className="modal">
            <div className="modal-box flex flex-col item-center">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click the button below to close</p>
                <div className="modal-action mx-auto">
                    <form onSubmit={handleSubmit} method="dialog mx-auto">
                        <label className="block mb-2">
                            <span className="text-white">Writings:</span>
                            <textarea
                                name="writings"
                                value={responseInfo.writings}
                                onChange={handleChange}
                                className="form-textarea mt-1 block w-[90%] bg-white border-2 border-black p-3 rounded-lg"
                            ></textarea>
                        </label>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Submit Response
                        </button>
                        {/* <button className="btn">Close</button> */}
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default ParticipateContest;
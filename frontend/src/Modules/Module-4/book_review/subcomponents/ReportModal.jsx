import React, { useRef } from 'react';

const ReportModal = ({ reportText, setReportText, reportComment }) => {
    const closeButtonRef = useRef()

    const handleReportComment = () => {
        console.log({ reportText });
        reportComment()
        closeButtonRef.current.click()
    }
    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
                {/* <h3 className="font-bold text-lg">Comment to the report</h3> */}
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <div className="modal-action flex justify-center flex-col">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <input type="text"
                            className="input input-bordered w-full max-w-xs p-3"
                            placeholder='Enter the report here'
                            onChange={e => setReportText(e.target.value)}
                            value={reportText} />
                        <br />
                        <button ref={closeButtonRef} className="btn hidden">Close</button>
                        {/* <button className=' btn-warning flex justify-center my-2 w-full'>Submit the Report</button> */}
                    </form>
                    <br />
                    <button
                        onClick={handleReportComment}
                        className='btn bg-red-400 flex justify-center my-2'
                    >
                        Submit the Report
                    </button>
                </div>
            </div>
        </dialog>

    );
};

export default ReportModal;
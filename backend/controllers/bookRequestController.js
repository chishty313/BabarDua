import BookRequestModel from "../models/bookRequest.js";


// Create a new book
const createBookRequest = async (req, res) => {
    const userId = req.userid
    console.log({ userId });
    const bookDataRequest = req.body;
    try {
        const newBookRequest = await BookRequestModel.create({ userId, ...bookDataRequest })

        res.status(201).json(
            {
                success: true,
                message: 'New Book request created successfully',
                book: newBookRequest
            }
        );

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// get all book requests
const getAllBookRequest = async (req, res) => {

    try {
        const bookRequests = await await BookRequestModel.find({}).populate("userId")

        if (!bookRequests) {
            return res.status(404).json({
                success: false,
                error: 'No such book request'
            });
        }

        res.status(200).json(
            {
                success: true,
                message: 'Book request fetched successfully',
                data: bookRequests
            }
        );

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a book
const getSpecificBookRequest = async (req, res) => {
    const { id } = req.params;
    try {
        const specificBookRequest = await BookRequestModel.findById(id).populate("userId");

        if (!specificBookRequest) {
            return res.status(404).json({ success: false, error: 'No such book request found' });
        }

        res.status(200).json({
            success: true,
            message: 'Book request fetched successfully',
            data: specificBookRequest
        });


    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};



export {
    getAllBookRequest,
    createBookRequest,
    getSpecificBookRequest
};



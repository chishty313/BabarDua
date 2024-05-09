import ContestResponseModel from "../models/WritingContestResponse.js";



// Create a new contest response
const createContestResponse = async (req, res) => {
    const contestResponseData = req.body;
    try {
        const newContestResponse = await ContestResponseModel.create({ userId: req.userid, ...contestResponseData });
        res.status(201).json({ success: true, message: 'New contest response created successfully', contestResponse: newContestResponse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a contest response
const updateContestResponse = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedContestResponse = await ContestResponseModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContestResponse) {
            return res.status(404).json({ success: false, error: 'No such contest response for update' });
        }
        res.status(200).json({ success: true, message: 'Contest response updated successfully', contestResponse: updatedContestResponse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete a contest response
const deleteContestResponse = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedContestResponse = await ContestResponseModel.findByIdAndDelete(id);
        if (!deletedContestResponse) {
            return res.status(404).json({ success: false, error: 'No such contest response found for delete' });
        }
        res.status(200).json({ success: true, message: 'Contest response deleted successfully', contestResponse: deletedContestResponse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get all contest responses
const getContestResponses = async (req, res) => {
    try {
        const contestResponses = await ContestResponseModel.find().populate('userId').populate('contestId');
        res.status(200).json({ success: true, message: 'Contest responses retrieved successfully', contestResponses });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single contest response
const getContestResponse = async (req, res) => {
    const { id } = req.params;
    try {
        const contestResponse = await ContestResponseModel.findById(id);
        if (!contestResponse) {
            return res.status(404).json({ success: false, error: 'No such contest response found in the database' });
        }
        res.status(200).json({ success: true, message: 'Contest response retrieved successfully', contestResponse });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export {
    createContestResponse,
    updateContestResponse,
    deleteContestResponse,
    getContestResponses,
    getContestResponse
};

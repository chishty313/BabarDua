import ContestModel from '../models/writingContestModel.js';



// Create a new book
const createContest = async (req, res) => {
    const userId = req.userid
    const contestData = req.body;
    try {
        const contest = await ContestModel.create({ userId, ...contestData });
        res.status(201).json({
            success: true, message: 'New contest created successfully',
            contest
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Update a book
const updateContest = async (req, res) => {
    const contestId = req.params.contestId;
    try {
        const updatedContest = await ContestModel.findByIdAndUpdate(contestId, req.body);


        res.status(200).json({ success: true, message: 'Contest updated successfully', contest: updatedContest });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Delete contest
const deleteContest = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBook = await ContestModel.deleteOne(id);

        res.status(200).json({ success: true, message: 'Contest deleted' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

//Get all contests
const getAllContest = async (req, res) => {
    try {

        const allContest = await ContestModel.find({}).populate('winnerId')

        res.status(200).json({
            success: true,
            message: 'Contests retrieved successfully',
            data: allContest
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// Get a single book
const getContest = async (req, res) => {
    const { id } = req.params
    try {
        const singleContest = await ContestModel.findById(id)

        if (!singleContest) {
            return res.status(404).json({ success: false, error: 'No such contest found in the database' });
        }

        res.status(200).json({
            success: true, message: 'Contest retrieved successfully',
            contest: singleContest
        });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

export {
    getContest,
    createContest,
    getAllContest,
    updateContest,
    deleteContest
};



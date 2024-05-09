import mongoose from 'mongoose';

const { Schema } = mongoose;

const contestResponseSchema = new Schema({
    contestId: {
        type: mongoose.Types.ObjectId,
        ref: "contest",
        required: true
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    writings: {
        type: String,
        required: true
    },

}, { timestamps: true })

const ContestResponseModel = mongoose.model('contestResponse', contestResponseSchema);



export default ContestResponseModel;

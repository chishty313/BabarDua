import mongoose from 'mongoose';

const { Schema } = mongoose;

const contestSchema = new Schema({
    contestName: {
        type: String,
        required: true
    },

    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    winnerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    winnerResponse: {
        type: mongoose.Types.ObjectId,
        ref: 'contestResponse',
        required: false,
    },
    details: {
        type: String,
        required: true
    },

}, { timestamps: true })

const ContestModel = mongoose.model('contest', contestSchema);



export default ContestModel;

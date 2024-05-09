import mongoose from 'mongoose';

const { Schema } = mongoose;

const challengeSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref : 'User',
        required : true,
    },
    year : {
        type : Number,
        required : true
    },
    targetBooks : {
        type : Number,
        required : true,
    },
    completedBooks : {
        type : Number,
        default : 0,
    },
    // progress : {
    //     type : Number,
    //     default : 0,
    // },
    challengeStart: {
        type: Date,
        default: new Date(),
    },
    challengeEnd: {
        type: Date,
        default: new Date(new Date().getFullYear(), 11, 31, 23, 59, 59, 999),
    },
}, { timestamps: true });

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge ;
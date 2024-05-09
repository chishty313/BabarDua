import mongoose from "mongoose";

const { Schema } = mongoose;

const donateSchema = new Schema(
    {
        userId: {
            type: mongoose.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: String,
            required: true,
        },
        tran_id: {
            type: String,
            required: true,
        },
        success: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const DonateModel = mongoose.model("donation", donateSchema);

export default DonateModel;

import express from "express";
import DonateModel from "../models/donateModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const donars = await DonateModel.find({}).populate("userId");
        // console.log({ donars });

        res.status(200).json({
            success: true,
            message: "Donars retrieved successfully",
            donars,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export default router;

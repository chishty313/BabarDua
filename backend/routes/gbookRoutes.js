import express from "express";
import { getList } from "../controllers/gbookController.js";

const router = express.Router();

router.get('/', getList)

export default router;
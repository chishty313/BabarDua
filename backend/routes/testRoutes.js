import express from "express";
import {
  testGetController,
  testPostController,
} from "../controllers/testController.js";

// router object ..//
const router = express.Router();

//routes ....
router.get("/test-get", testGetController);
router.post("/test-post", testPostController);

export default router;

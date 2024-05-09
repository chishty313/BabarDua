import express from "express";
import { loginController, signupController, updatePassword, getUserInfo } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


// router object ..//
const router = express.Router();


//routes ....
router.post('/login', loginController)
router.get('/user-info', authMiddleware, getUserInfo)

router.post('/signup', signupController)
router.patch('/update-password', authMiddleware, updatePassword)


export default router;
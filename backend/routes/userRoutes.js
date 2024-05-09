import express from "express";
import { getAllUserDetails, getUserController, getUserDetails, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { deleteUser, getUserInfo } from "../controllers/authController.js";



// router object ..//
const router = express.Router();


//routes ....mostly crud
router.get('/users', getAllUserDetails)
router.get('/:username', getUserDetails)
router.patch('/', authMiddleware, updateUser)
router.put('/user-info', authMiddleware, getUserInfo)
router.delete('/:userId', authMiddleware, deleteUser)



export default router;
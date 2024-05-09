import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createShelfByUsername, deleteShelf, addBookToShelf, getShelves, removeBookFromShelf } from "../controllers/shelfController.js";


// router object ..//
const router = express.Router();


//routes ....mostly crud
// router.get('/:username/shelves', getShelves)
router.patch('/create-shelf', authMiddleware, createShelfByUsername)
router.delete('/delete-shelf/:shelfId', authMiddleware, deleteShelf)
router.patch('/shelves/:shelfId/add-book', authMiddleware, addBookToShelf)
router.patch('/shelves/:shelfId/remove-book', authMiddleware, removeBookFromShelf)


export default router;
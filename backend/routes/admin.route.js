import express from 'express';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { isAdmin } from '../middlewares/admin.middleware.js';
import { upload } from '../lib/multer.js';
import {
  addFaculty,
  deleteFacultyById,
  getAllFaculty,
  getFacultyById,
  editFaculty,
} from '../controllers/admin.controller.js';

const router = express.Router();

router.get('/faculty-list', protectRoute, isAdmin, getAllFaculty);
router.post('/add-faculty', protectRoute, isAdmin, upload.single('profilePic'), addFaculty);
router.put('/edit-faculty/:id', protectRoute, isAdmin, upload.single('profilePic'), editFaculty);
router.get('/faculty/:id', protectRoute, isAdmin, getFacultyById);
router.delete('/delete-faculty/:id', protectRoute, isAdmin, deleteFacultyById);


export default router;
import express from 'express';
import {
  addAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  getAnnouncementByID,
  getAnnouncements,
  getPdf
} from '../controllers/announcements.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
import { upload } from '../lib/multer.js';

const router = express.Router();

router.get('/', getAnnouncements);
router.post('/add', protectRoute, upload.single('pdf'), addAnnouncement);
router.get('/get/:id', protectRoute, getAnnouncementByID);
router.delete('/delete/:id', protectRoute, deleteAnnouncement);
router.patch('/edit/:id', protectRoute,upload.single('pdf'), editAnnouncement);
router.get('/pdf/:id',getPdf)
export default router;

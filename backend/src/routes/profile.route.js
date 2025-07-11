import express from 'express'
import { protectRoute } from '../middlewares/auth.middleware.js';
import { upload } from '../lib/multer.js';
import { getProfilePic, editProfile } from '../controllers/profile.controller.js';
const router = express.Router()

router.put(
  '/edit',
  protectRoute,
  upload.single('profilePic'), // key must be 'profilePic'
  editProfile
);

router.get('/pic/:userId', getProfilePic);

export default router
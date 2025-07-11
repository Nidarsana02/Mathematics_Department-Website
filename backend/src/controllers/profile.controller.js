import User from "../models/user.model.js";
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const editProfile = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user._id; // from protectRoute

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;

    if (req.file) {
      // Delete old profile pic if exists
      if (user.profilePic) {
        const oldPath = path.join(__dirname,'..', 'uploads', user.profilePic);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // Save new filename
      user.profilePic = req.file.filename;
    }

    await user.save();

    // Send updated user without password
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log('Edit error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user || !user.profilePic) {
      return res.status(404).send('No profile picture found');
    }

    const imgPath = path.join(
      import.meta.dirname,
      '..',
      'uploads',
      user.profilePic
    );

    if (!fs.existsSync(imgPath)) {
      return res.status(404).send('File not found');
    }

    res.sendFile(imgPath);
  } catch (err) {
    console.error('Error serving profile image:', err.message);
    res.status(500).send('Server error');
  }
};

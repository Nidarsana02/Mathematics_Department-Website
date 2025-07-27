import Announcement from '../models/announcement.model.js';
import User from '../models/user.model.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 }) // newest first
      .select('-__v');

    res.status(200).json(announcements);
  } catch (error) {
    console.error('Error in getAnnouncements controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const addAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const uploadedBy = req.user._id.toString();

    const existingAnnouncement = await Announcement.findOne({ title });
    if (existingAnnouncement) {
      return res
        .status(400)
        .json({ message: 'Please choose a different title.' });
    }

    const newAnnouncement = new Announcement({
      title,
      description,
      uploadedBy,
    });

    if (req.file) {
      // Save new filename
      newAnnouncement.pdf = req.file.filename;
    }

    await newAnnouncement.save();

    res.status(201).json({ message: 'Announcement added successfully.' });
  } catch (error) {
    console.error('Error in addAnnouncement controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteAnnouncement = async (req, res) => {
  try {
    const announcementId = req.params.id;
    const userId = req.user._id.toString();

    const existingAnnouncement = await Announcement.findById(announcementId);
    if (!existingAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Admin can delete any announcement
    if (
      existingUser.role === 'faculty' &&
      existingAnnouncement.uploadedBy !== userId
    ) {
      return res.status(403).json({
        message: 'You are not authorized to delete this announcement',
      });
    }

    await Announcement.findByIdAndDelete(announcementId);

    res.status(200).json({ message: 'Announcement deleted successfully.' });
  } catch (error) {
    console.error('Error in deleteAnnouncement controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const editAnnouncement = async (req, res) => {
  try {
    const { title, description } = req.body;
    const announcementId = req.params.id;
    const userId = req.user._id.toString();

    const existingAnnouncement = await Announcement.findById(announcementId);
    if (!existingAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Admin can edit any announcement
    if (
      existingUser.role === 'faculty' &&
      existingAnnouncement.uploadedBy !== userId
    ) {
      return res.status(403).json({
        message: 'You are not authorized to edit this announcement',
      });
    }

    // check if new title already exists for uniqueness
    if (title && title !== existingAnnouncement.title) {
      const duplicateTitle = await Announcement.findOne({ title });
      if (duplicateTitle) {
        return res
          .status(400)
          .json({ message: 'An announcement with this title already exists.' });
      }
    }

    // Update the fields
    if (title) existingAnnouncement.title = title;
    if (description) existingAnnouncement.description = description;

    if (req.file) {
      // Delete old profile pic if exists
      if (existingAnnouncement.pdf) {
        const oldPath = path.join(
          __dirname,
          '..',
          'uploads',
          'pdfs',
          existingAnnouncement.pdf
        );

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // Save new filename
      existingAnnouncement.pdf = req.file.filename;
    }

    await existingAnnouncement.save();

    res.status(200).json({ message: 'Announcement edited successfully.' });
  } catch (error) {
    console.error('Error in editAnnouncement controller:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getAnnouncementByID = async (req, res) => {
  try {
    const announcementId = req.params.id;
    const existingAnnouncement = await Announcement.findById(
      announcementId
    ).select('-__v');

    if (!existingAnnouncement) {
      return res.status(404).json({ message: 'Announcement not found' });
    }

    res.status(200).json(existingAnnouncement);
  } catch (error) {
    console.error('Error fetching announcement:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getPdf = async (req, res) => {
  try {
    console.log(req.params.id)
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement || !announcement.pdf) {
      return res.status(404).send('No PDF found');
    }

    const pdfPath = path.join(
      import.meta.dirname,
      '..',
      'uploads',
      'pdfs',
      announcement.pdf
    );

    if (!fs.existsSync(pdfPath)) {
      return res.status(404).send('File not found');
    }

    res.sendFile(pdfPath);
  } catch (error) {
    console.error('Error serving PDF :', error.message);
    res.status(500).send('Server error');
  }
};

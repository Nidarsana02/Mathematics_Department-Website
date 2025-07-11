import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import User from '../models/user.model.js';

export const addFaculty = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashed,
      role: 'faculty',
      profilePic: req.file?.filename || '',
    });

    await user.save();
    res.status(201).json({ message: 'Faculty added successfully' });

  } catch (error) {
    console.error('Add Faculty Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAllFaculty = async (req, res) => {
  try {
    const facultyList = await User.find({ role: 'faculty' }).select('-password');
    res.json(facultyList);
  } catch (error) {
    console.error('Get Faculty Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const editFaculty = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findById(id);
    if (!user || user.role !== 'faculty') {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    if (email && email !== user.email) {
      const exists = await User.findOne({ email });
      if (exists) {
        return res.status(409).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    if (name) user.name = name;
    if (password) user.password = await bcrypt.hash(password, 10);

    if (req.file) {
      if (user.profilePic) {
        const oldPath = path.join('uploads', user.profilePic);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      user.profilePic = req.file.filename;
    }

    await user.save();
    res.json({ message: 'Faculty updated successfully' });
  } catch (error) {
    console.error('edit Faculty Error:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getFacultyById = async (req, res) => {
  try {
    const faculty = await User.findById(req.params.id).select('-password');
    if (!faculty || faculty.role !== 'faculty') {
      return res.status(404).json({ message: 'Faculty not found' });
    }
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const deleteFacultyById = async (req, res) => {
  try {
    const faculty = await User.findById(req.params.id);
    if (!faculty || faculty.role !== 'faculty') {
      return res.status(404).json({ message: 'Faculty not found' });
    }

    if (faculty.profilePic) {
      const imgPath = path.join('uploads', faculty.profilePic);
      if (fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
    }

    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Faculty deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete faculty' });
  }
};
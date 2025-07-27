import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';

// Needed for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let subfolder = '';

    // Choose subfolder based on MIME type
    if (file.mimetype.startsWith('image/')) {
      subfolder = 'imgs';
    } else if (file.mimetype === 'application/pdf') {
      subfolder = 'pdfs';
    } else {
      return cb(new Error('Invalid file type'), false);
    }

    const uploadPath = path.join(__dirname, '..', 'uploads', subfolder);

    // Ensure the folder exists
    fs.mkdirSync(uploadPath, { recursive: true });

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/jpg',
    'image/webp',
    'application/pdf',
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only images and PDFs are allowed'), false);
  }
};

export const upload = multer({ storage, fileFilter });

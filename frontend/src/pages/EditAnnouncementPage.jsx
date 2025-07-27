import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const EditAnnouncementPage = () => {
  const { authUser, announcement, editAnnouncementFn } = useAuthStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title);
      setDescription(announcement.description);
    }
  }, [announcement]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (file) {
      formData.append('pdf', file); // must match multer's field name
    }

    await editAnnouncementFn(announcement._id, formData); // pass ID and FormData

    navigate('/announcements');
  };

  if (!authUser) {
    return <Navigate to="/" />;
  }

  if (!announcement) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No announcement to edit
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Announcement</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md"
            rows="5"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">
            Upload New PDF (Optional)
          </label>

          <div className="flex items-center space-x-4">
            <label className="cursor-pointer bg-gray-100 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-200 transition">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
              />
              Choose File
            </label>

            <span className="text-sm text-gray-600">
              {file ? file.name : 'No file selected'}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="bg-[#4c83bb] text-white px-5 py-2 rounded-xl hover:bg-[#3b6d9e] transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditAnnouncementPage;

import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const AddAnnouncementPage = () => {
  const { authUser, addAnnouncementFn } = useAuthStore();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    pdf: null,
  });

  const [fileName, setFileName] = useState('');

  const handlePDFChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setFormData({ ...formData, pdf: file });
      setFileName(file.name);
    } else {
      alert('Only PDF files are allowed.');
    }
  };

  const handleClickUpload = () => {
    document.getElementById('pdfInput').click();
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.pdf) data.append('pdf', formData.pdf);

    await addAnnouncementFn(data); // <-- Send FormData

    setFormData({ title: '', description: '', pdf: null });
    setFileName('');
  };

  if (!authUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add Announcement</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title</label>
          <input
            type="text"
            name="title"
            className="w-full px-4 py-2 border rounded-md"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>
          <textarea
            name="description"
            className="w-full px-4 py-2 border rounded-md"
            rows="5"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1">Upload PDF</label>
          <button
            type="button"
            onClick={handleClickUpload}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Choose PDF
          </button>
          <input
            type="file"
            accept="application/pdf"
            id="pdfInput"
            onChange={handlePDFChange}
            className="hidden"
          />
          {fileName && <p className="text-sm mt-1 text-green-600">{fileName}</p>}
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

export default AddAnnouncementPage;

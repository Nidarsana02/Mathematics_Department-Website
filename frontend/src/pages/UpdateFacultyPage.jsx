import { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const UpdateFacultyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {authUser} = useAuthStore()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: null,
  });

  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await axiosInstance.get(`/admin/faculty/${id}`);
        setFormData({
          name: res.data.name,
          email: res.data.email,
          password: '',
          profilePic: null,
        });
        setPreviewUrl(`/api/profile/pic/${res.data._id}`);
      } catch (err) {
        toast.error('Error fetching faculty');
        navigate('/manage-faculty');
      }
    };
    fetchFaculty();
  }, [id, navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profilePic: file }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    if (formData.password) data.append('password', formData.password);
    if (formData.profilePic) data.append('profilePic', formData.profilePic);

    try {
      await axiosInstance.put(`/admin/edit-faculty/${id}`, data);
      toast.success('Faculty updated');
      navigate('/manage-faculty');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this faculty?')) {
      try {
        await axiosInstance.delete(`/admin/delete-faculty/${id}`);
        toast.success('Faculty deleted');
        navigate('/manage-faculty');
      } catch (err) {
        toast.error('Failed to delete faculty');
      }
    }
  };

  if (!authUser || !authUser?.role === 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-5 p-4 border rounded shadow"
    >
      <h2 className="text-2xl font-bold">update Faculty</h2>

      <label className="block font-semibold">Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <label className="block font-semibold">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full p-2 border rounded"
        required
      />

      <label className="block font-semibold">New Password (optional)</label>
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      />

      <label className="block font-semibold">Profile Picture</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full"
      />

      {previewUrl && (
        <div className="mt-4">
          <p className="text-sm text-gray-600 mb-1">Preview:</p>
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full border"
          />
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Update Faculty
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
        >
          Delete Faculty
        </button>
      </div>
    </form>
  );
};

export default UpdateFacultyPage;

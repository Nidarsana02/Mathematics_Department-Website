import { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';

const ManageFacultyPage = () => {
  const {authUser} = useAuthStore()
  const [facultyList, setFacultyList] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const navigate = useNavigate();

  const fetchFacultyList = async () => {
    try {
      const res = await axiosInstance.get('/admin/faculty-list');
      setFacultyList(res.data);
    } catch (err) {
      toast.error('Failed to fetch faculty list');
    }
  };

  useEffect(() => {
    fetchFacultyList();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFaculty = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('password', formData.password);
    if (formData.profilePic) data.append('profilePic', formData.profilePic);

    try {
      await axiosInstance.post('/admin/add-faculty', data);
      toast.success('Faculty added');
      setFormData({ name: '', email: '', password: '', profilePic: null });
      setPreviewUrl('');
      fetchFacultyList(); // Refresh list
    } catch (err) {
      toast.error(err.response?.data?.message || 'Add failed');
    }
  };

  if(!authUser || !authUser?.role==='admin'){
   return  <Navigate to='/'/>
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      {/* Faculty List */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Faculty List</h2>
        {facultyList.map((fac) => (
          <div
            key={fac._id}
            className="flex items-center justify-between border p-3 rounded"
          >
            <div className="flex items-center gap-4">
              <img
                src={`http://localhost:1821/api/profile/pic/${fac._id}`}
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium">{fac.name}</p>
                <p className="text-sm text-gray-500">{fac.email}</p>
              </div>
            </div>
            <button
              onClick={() => navigate(`/update-faculty/${fac._id}`)}
              className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500"
            >
              Update Profile
            </button>
          </div>
        ))}
      </div>

      {/* Add Faculty Form */}
      <form
        onSubmit={handleAddFaculty}
        className="space-y-4 border p-4 rounded shadow"
      >
        <h2 className="text-xl font-semibold">Add New Faculty</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {previewUrl && (
          <img src={previewUrl} className="w-24 h-24 rounded-full border" />
        )}
        <button
          type="submit"
          className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Faculty
        </button>
      </form>
    </div>
  );
};

export default ManageFacultyPage;

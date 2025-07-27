import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Navigate } from 'react-router-dom';

function UpdateProfilePage() {
  const { authUser, updateProfileFn } = useAuthStore();
  const [formData, setFormData] = useState({
    name: '',
    profilePic: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');

  useEffect(() => {
    if (authUser) {
      setFormData({
        name: authUser.name || '',
        profilePic: null,
      });

      // Show current profile pic from backend route
      setPreviewUrl(`http://localhost:1821/api/profile/pic/${authUser._id}`);
    }
  }, [authUser]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profilePic: file });

      // Temporary preview
      const tempUrl = URL.createObjectURL(file);
      setPreviewUrl(tempUrl);
    }
  };

  const handleClickUpload = () => {
    document.getElementById('profilePicInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    if (formData.profilePic) {
      data.append('profilePic', formData.profilePic);
    }

    await updateProfileFn(data);

    // Reload updated image
    if (authUser?._id) {
      setPreviewUrl(
        `http://localhost:1821/api/profile/pic/${authUser._id}?t=${Date.now()}`
      );
    }
  };

  if (!authUser) {
    return <Navigate to="/" />;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 space-y-5 p-4 border rounded shadow"
    >
      <label className="block font-semibold">Name</label>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded"
      />

      <label className="block font-semibold">Profile Picture</label>
      <div
        onClick={handleClickUpload}
        className="w-32 h-32 flex items-center justify-center rounded-full border border-dashed cursor-pointer hover:bg-gray-100"
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-full"
          />
        ) : (
          <span className="text-sm text-gray-500">Upload</span>
        )}
      </div>
      <input
        type="file"
        id="profilePicInput"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      <button
        type="submit"
        className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Update Profile
      </button>
    </form>
  );
}

export default UpdateProfilePage;

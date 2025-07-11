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

      // Generate temporary preview of the new image
      const tempUrl = URL.createObjectURL(file);
      setPreviewUrl(tempUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    if (formData.profilePic) {
      data.append('profilePic', formData.profilePic);
    }

    await updateProfileFn(data);

    // Refresh preview with new file from backend (forces browser to reload)
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
            alt="Profile Preview"
            className="w-32 h-32 object-cover rounded-full border"
          />
        </div>
      )}

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

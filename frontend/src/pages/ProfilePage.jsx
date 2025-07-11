import { Navigate, NavLink } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';

const ProfilePage = () => {
  const { authUser } = useAuthStore();


  if (!authUser) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
      <div className="max-w-md w-full bg-white shadow-lg rounded-xl p-6 text-center space-y-4">
        <div className="flex justify-center">
          <img
            src={`http://localhost:1821/api/profile/pic/${authUser._id}`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-2 border-blue-800"
          />
        </div>

        <h2 className="text-xl font-semibold text-gray-800">{authUser.name}</h2>
        <p className="text-sm text-gray-600 capitalize">{authUser.role}</p>

        <NavLink
          to="/update-profile"
          className="inline-block mt-4 px-4 py-2 bg-blue-800 text-white rounded hover:bg-blue-700 transition"
        >
          update Profile
        </NavLink>
      </div>
    </div>
  );
};

export default ProfilePage;

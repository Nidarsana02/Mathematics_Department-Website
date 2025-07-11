import { useState } from 'react';
import {
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { authUser, loginFn, isLoggingIn } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    if (!formData.email.trim()) return toast.error('Email is required');
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error('Invalid email format');
    if (!formData.password) return toast.error('Password is required');
    if (formData.password.length < 6)
      return toast.error('Password must be at least 6 characters');

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    //Add login logic here
    const isSuccess = validateForm();

    if (isSuccess) loginFn(formData);
  };

  if (authUser) {
    return <Navigate to="/" />;
  }

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 py-4">
      <div className="w-full max-w-6xl flex flex-col items-center justify-center lg:flex-row gap-8">
        {/* Faculty and Admin Login */}
        <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-black-800">
          <h2 className="text-3xl font-bold text-black-800 mb-6 text-center">
            Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-800">
                <EnvelopeIcon className="h-5 w-5 text-gray-400 mr-2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full outline-none"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password */}
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="flex items-center border rounded-lg px-3 py-2 mb-2 focus-within:ring-2 focus-within:ring-blue-800">
              <LockClosedIcon className="h-5 w-5 text-gray-400 mr-2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full outline-none"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="focus:outline-none ml-2"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-800 text-white py-3 mt-4 rounded-lg cursor-pointer hover:bg-blue-700 transition"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                  'Loading...'
              ) : (
                'Log in'
              )}
            </button>

            {/* Forgot Password */}
            <div className="text-right">
              <a href="#" className="text-sm text-blue-800 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;

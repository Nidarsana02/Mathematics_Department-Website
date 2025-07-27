import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isLoggingIn: false,
  isLoggingOut: false, //not actually needed
  isUpdatingProfile: false,
  isCheckingAuth: true,
  announcements: [],
  announcement: null,

  checkAuthFn: async () => {
    try {
      const res = await axiosInstance.get('/auth/check');
      set({ authUser: res.data });
    } catch (error) {
      console.log('Error in checkAuth:', error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  loginFn: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      set({ authUser: res.data });
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logoutFn: async () => {
    set({ isLoggingOut: true });
    try {
      await axiosInstance.post('/auth/logout');
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingOut: false });
    }
  },

  updateProfileFn: async (formData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put('/profile/edit', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      set({ authUser: res.data });
      toast.success('Profile updated');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Update failed');
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  fetchAnnouncementsFn: async () => {
    try {
      const res = await axiosInstance.get('/announcements');
      console.log(res.data)
      set({ announcements: res.data });
    } catch (error) {
      console.error('Error fetching announcements:', error);
      toast.error('Failed to fetch announcements.');
    }
  },

  deleteAnnouncementFn: async (id) => {
    try {
      await axiosInstance.delete(`/announcements/delete/${id}`);
      toast.success('Deleted successfully');
    } catch (error) {
      console.error('Error deleting announcement:', error);
      toast.error('Failed to delete.');
    }
  },

  addAnnouncementFn: async (data) => {
    try {
      await axiosInstance.post('/announcements/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Announcement Added');
    } catch (error) {
      console.error('Error adding announcement:', error);
      toast.error('Failed to add.');
    }
  },

  getAnnouncementFn: async (id) => {
    try {
      const res = await axiosInstance.get(`/announcements/get/${id}`);
      set({ announcement: res.data });
    } catch (error) {
      console.error('Error adding announcement:', error);
      toast.error('Failed to fetch announcement.');
    }
  },

  editAnnouncementFn: async (id, formData) => {
    try {
      const res = await axiosInstance.patch(
        `/announcements/edit/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      set({ announcement: null }); // Clear after edit
      toast.success('Announcement edited successfully');
    } catch (error) {
      console.error('Error editing announcement:', error);
      toast.error('Failed to edit announcement.');
    }
  },
}));

import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const AnnouncementsPage = () => {
  const {
    announcements,
    fetchAnnouncementsFn,
    deleteAnnouncementFn,
    getAnnouncementFn,
    authUser,
  } = useAuthStore();

  useEffect(() => {
    fetchAnnouncementsFn();
  }, [fetchAnnouncementsFn]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this announcement?'
    );
    if (!confirmDelete) return;

    await deleteAnnouncementFn(id);
    await fetchAnnouncementsFn();
  };

  return (
    <div className="max-w-[75vw] mx-auto my-12">
      <h1 className="text-4xl font-bold text-center text-black mb-10 border-b-4 border-[#4c83bb] inline-block pb-3">
        ANNOUNCEMENTS
      </h1>

      {(authUser?.role === 'admin' || authUser?.role === 'faculty') && (
        <div className="flex justify-end mb-6">
          <Link
            to="/add-announcement"
            className="bg-[#4c83bb] text-white px-5 py-2 rounded-xl hover:bg-[#3b6d9e] transition"
          >
            + Add Announcement
          </Link>
        </div>
      )}

      {announcements.length > 0 ? (
        <div className="space-y-6">
          {announcements.map((item) => (
            <div
              key={item._id}
              className="border border-gray-300 p-6 rounded-xl shadow hover:shadow-md transition-shadow"
            >
              <a
                href={`http://localhost:1821/api/announcements/pdf/${item._id}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl font-semibold text-[#4c83bb] mb-2 hover:underline"
              >
                {item.title}
              </a>

              <p className="text-gray-700 mb-2">{item.description}</p>
              <p className="text-sm text-gray-500">
                Posted on:{' '}
                {new Date(item.createdAt).toLocaleDateString('en-IN')}
              </p>

              {(authUser?.role === 'admin' ||
                authUser?._id === item.uploadedBy) && (
                <div className="mt-4 flex gap-3">
                  <Link
                    onClick={() => {
                      getAnnouncementFn(item._id);
                    }}
                    to={`/edit-announcement`}
                    className="px-4 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="px-4 py-1 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-8">
          No announcements at the moment.
        </p>
      )}
    </div>
  );
};

export default AnnouncementsPage;

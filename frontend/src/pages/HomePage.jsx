import React from 'react';
import HeroCarousel from '../components/HeroCarousel';
import abt_department from '../assets/images/abt_dept.jpg';
import HoD_img from '../assets/images/sanjeev_iiti.jpg';

const HomePage = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Carousel */}
      <div>
        <HeroCarousel />
      </div>

      {/* Main Grid */}
      <div className="px-6 py-10 max-w-7xl mx-auto space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* About Department */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-blue-900 mb-3">ABOUT THE DEPARTMENT</h1>
            <hr className="border-b-2 border-blue-900 mb-4" />
            <div className="space-y-4">
              <p className="text-sm leading-relaxed">
                Since its inception in July 2009, the Department of Mathematics has evolved in several directions...
              </p>
              <img
                src={abt_department}
                alt="About Department"
                className="w-full rounded-lg shadow-md object-cover"
              />
              <div>
                <a href="#" className="text-blue-800 hover:underline font-medium">
                  READ MORE
                </a>
              </div>
            </div>
          </div>

          {/* Message from HoD */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-blue-900 mb-3">MESSAGE FROM HOD</h1>
            <hr className="border-b-2 border-blue-900 mb-4" />
            <div className="flex flex-col items-center space-y-4">
              <img
                src={HoD_img}
                alt="HoD"
                className="w-40 h-40 object-cover rounded-full shadow-md"
              />
              <p className="text-sm leading-relaxed text-center">
                Since its inception in July 2009, the Department of Mathematics has evolved in several directions...
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-blue-900 mb-3">QUICK LINKS</h1>
            <hr className="border-b-2 border-blue-900 mb-4" />
            <ul className="list-disc list-inside space-y-2 text-sm text-blue-700">
              <li><a href="#">Timetable</a></li>
              <li><a href="#">Syllabus</a></li>
              <li><a href="#">Faculty Login</a></li>
              <li><a href="#">Research Areas</a></li>
              <li><a href="#">Events</a></li>
              <li><a href="#">Notices</a></li>
              <li><a href="#">Admissions</a></li>
              <li><a href="#">Student Portal</a></li>
            </ul>
          </div>
        </div>

        {/* Announcements and News */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-blue-900 mb-3">ANNOUNCEMENTS</h1>
            <hr className="border-b-2 border-blue-900 mb-4" />
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><a href="#" className="text-blue-700">New B.Tech program launched</a></li>
              <li><a href="#" className="text-blue-700">PhD Admissions Open</a></li>
              <li><a href="#" className="text-blue-700">Mid-Sem Exam Schedule Released</a></li>
              <li><a href="#" className="text-blue-700">Convocation 2025 Notice</a></li>
            </ul>
            <div className="mt-4">
              <a href="/announcements" className="text-blue-800 hover:underline font-medium">
                View All
              </a>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <h1 className="text-2xl font-bold text-blue-900 mb-3">NEWS</h1>
            <hr className="border-b-2 border-blue-900 mb-4" />
            <ul className="list-disc list-inside space-y-2 text-sm">
              <li><a href="#" className="text-blue-700">Prof. Sharma wins INSA award</a></li>
              <li><a href="#" className="text-blue-700">Mathematics fest concluded</a></li>
              <li><a href="#" className="text-blue-700">New faculty members joined</a></li>
              <li><a href="#" className="text-blue-700">Workshop on Number Theory</a></li>
            </ul>
            <div className="mt-4">
              <a href="/news" className="text-blue-800 hover:underline font-medium">
                View More
              </a>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center bg-white p-6 rounded-xl shadow-md">
          <div>
            <div className="text-3xl font-bold text-blue-900">45 +</div>
            <div className="text-sm text-gray-600">Ph.D. Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-900">35 +</div>
            <div className="text-sm text-gray-600">M.Sc. Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-900">19 +</div>
            <div className="text-sm text-gray-600">Faculty</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-900">100 +</div>
            <div className="text-sm text-gray-600">B.Tech. Students</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

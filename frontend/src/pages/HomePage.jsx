import HeroCarousel from '../components/HeroCarousel';
import abt_department from '../assets/images/abt_dept.jpg';
import HoD_img from '../assets/images/sanjeev_iiti.jpg';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
import { useEffect } from 'react';

const HomePage = () => {
  const [recentAnnouncements, setRecentAnnouncements] = useState([]);
  const { announcements, fetchAnnouncementsFn } = useAuthStore();

  useEffect(() => {
    fetchAnnouncementsFn();
  }, []);

  useEffect(() => {
    // Update when Zustand announcements changes
    if (announcements.length > 0) {
      setRecentAnnouncements(announcements.slice(0, 3));
    }
  }, [announcements]);

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Hero Section with Quick Links */}
      <section className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 pt-6">
        {/* Carousel */}
        <div className="lg:col-span-2 h-[50vh] rounded-xl overflow-hidden shadow-md">
          <HeroCarousel />
        </div>

        {/* Quick Links */}
        <div className="bg-white p-6 rounded-xl shadow-md h-[50vh] overflow-y-auto">
          <h2 className="text-2xl font-bold text-[#4c83bb] mb-3">
            QUICK LINKS
          </h2>
          <hr className="border-b-2 border-[#4c83bb] mb-4" />
          <ul className="list-disc list-inside text-sm space-y-2 text-[#1f4e79]">
            <li>
              <a href="#">Timetable</a>
            </li>
            <li>
              <a href="#">Syllabus</a>
            </li>
            <li>
              <a href="#">Faculty Login</a>
            </li>
            <li>
              <a href="#">Research Areas</a>
            </li>
            <li>
              <a href="#">Events</a>
            </li>
            <li>
              <a href="#">Notices</a>
            </li>
            <li>
              <a href="#">Admissions</a>
            </li>
            <li>
              <a href="#">Student Portal</a>
            </li>
          </ul>
        </div>
      </section>

      {/* Main Content */}
      <main className="px-6 py-10 max-w-7xl mx-auto space-y-12">
        {/* About + HoD + Stats */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* About the Department */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-[#4c83bb] mb-3">
              ABOUT THE DEPARTMENT
            </h2>
            <hr className="border-b-2 border-[#4c83bb] mb-4" />
            <p className="text-sm leading-relaxed">
              Since its inception in July 2009, the Department of Mathematics
              has evolved in several directions. The department presently offers
              M.Sc. and Ph. D. programs in Mathematics. In addition to these
              programs, the department teaches several Mathematics courses to
              the undergraduate and postgraduate students of various engineering
              and science departments. The department aims to focus on providing
              a comprehensive curriculum at undergraduate and postgraduate
              levels, relevant research and career opportunities in India and
              abroad.
            </p>
            <img
              src={abt_department}
              alt="Department Overview"
              className="w-full rounded-lg mt-4 object-cover shadow-sm"
            />
            <a
              href="#"
              className="text-[#4c83bb] hover:underline font-medium mt-4 inline-block"
            >
              READ MORE
            </a>
          </div>

          {/* Right column: HoD + Stats */}
          <div className="flex flex-col gap-6">
            {/* Message from HoD */}
            <div className="bg-white p-6 rounded-xl h-fit shadow-md hover:shadow-lg transition duration-300">
              <h2 className="text-2xl font-bold text-[#4c83bb] mb-3">
                MESSAGE FROM HOD
              </h2>
              <hr className="border-b-2 border-[#4c83bb] mb-4" />
              <div className="flex flex-col items-center space-y-4">
                <img
                  src={HoD_img}
                  alt="HoD"
                  className="w-40 h-40 object-cover rounded-full shadow-md"
                />
                <p className="text-sm text-center leading-relaxed">
                  Welcome to the Department of Mathematics at IIT Indore. Our
                  mission is to foster excellence in mathematical education and
                  research through dynamic programs and collaborations.
                </p>
                <div className="text-center text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    <a
                      href="mailto:hodmaths@iiti.ac.in"
                      className="text-[#4c83bb] hover:underline"
                    >
                      hodmaths@iiti.ac.in
                    </a>
                  </p>
                  <p>
                    <span className="font-medium">Phone:</span> +91-731-660-3283
                  </p>
                </div>
              </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white p-6 flex justify-center items-center rounded-xl shadow-md hover:shadow-lg transition duration-300 flex-grow">
              <div className="grid grid-cols-2 w-full h-full gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-[#4c83bb]">45 +</div>
                  <div className="text-sm text-gray-600">Ph.D. Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#4c83bb]">35 +</div>
                  <div className="text-sm text-gray-600">M.Sc. Students</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#4c83bb]">19 +</div>
                  <div className="text-sm text-gray-600">Faculty</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#4c83bb]">100 +</div>
                  <div className="text-sm text-gray-600">B.Tech. Students</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Announcements & News */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Announcements */}
          {/* Announcements */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-[#4c83bb] mb-3">
              ANNOUNCEMENTS
            </h2>
            <hr className="border-b-2 border-[#4c83bb] mb-4" />
            <ul className="list-disc list-inside text-sm space-y-2">
              {recentAnnouncements.length > 0 ? (
                recentAnnouncements.map((item) => (
                  <li key={item._id}>
                    <a
                      href={`http://localhost:1821/api/announcements/pdf/${item._id}`} // adjust path if needed
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 hover:underline"
                    >
                      {item.title}
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-500 text-sm">
                  No recent announcements
                </li>
              )}
            </ul>
            <a
              href="/announcements"
              className="text-[#4c83bb] hover:underline font-medium mt-4 inline-block"
            >
              View All
            </a>
          </div>

          {/* News */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-[#4c83bb] mb-3">NEWS</h2>
            <hr className="border-b-2 border-[#4c83bb] mb-4" />
            <ul className="list-disc list-inside text-sm space-y-2">
              <li>
                <a href="#" className="text-blue-700">
                  Prof. ABC wins INSA award
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-700">
                  Mathematics fest concluded
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-700">
                  New faculty members joined
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-700">
                  Workshop on Number Theory
                </a>
              </li>
            </ul>
            <a
              href="/news"
              className="text-[#4c83bb] hover:underline font-medium mt-4 inline-block"
            >
              View More
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;

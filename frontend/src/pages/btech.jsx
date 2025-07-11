const BTech = () => {
  return (
    <section className="bg-white p-6 rounded-xl shadow mt-6">
      {/* PROGRAM DETAILS */}
      <h2 className="text-3xl font-bold text-black mb-4 border-b pb-2">PROGRAM DETAILS</h2>
      <p className="text-gray-700 mb-4">
        Introduced in 2023, the B.Tech. in Mathematics and Computing at IIT Indore is a unique interdisciplinary program designed to meet the increasing demand for advanced mathematics in scientific research and modern technology.
      </p>
      <p className="text-gray-700 mb-4">
        The curriculum combines three core components — mathematics, computing, and financial engineering — in a balanced and integrated manner. Students develop strong mathematical foundations, analytical thinking, and technological proficiency, enabling them to tackle complex real-world problems in both industry and academia.
      </p>
      <p className="text-gray-700 mb-4">
        The program is run by a dedicated team of faculty members and has already shown promise in research engagement, internships, and higher education prospects. Students are admitted through JEE (Advanced).
      </p>
      <ul className="list-disc list-inside mb-8 text-gray-700">
        <li><strong>Duration:</strong> 4 years (8 semesters)</li>
        <li><strong>Year of Inception:</strong> 2023</li>
        <li><strong>Eligibility:</strong> JEE Advanced via JoSAA counselling</li>
        <li><strong>Degree Awarded:</strong> Bachelor of Technology (B.Tech.)</li>
      </ul>

      {/* COURSE DETAILS */}
      <h2 className="text-3xl font-bold text-black mb-4 border-b pb-2">COURSE DETAILS</h2>
      <p className="text-gray-700 mb-4">
        The semester-wise course structure includes a rich mix of core mathematical subjects, computer science fundamentals, and electives from interdisciplinary areas such as finance and data analytics.
      </p>
      <p className="text-gray-700 mb-4">
        You can download or view the full course structure below:
      </p>
      <a
        href="https://www.iiti.ac.in/newprog/assets/document/Course%20Structure_%20Mathematics%20and%20Computing_BTech.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-[#4c83bb] text-white rounded hover:bg-[#3a6fa1] transition"
      >
        📄 View Full Course Structure (PDF)
      </a>
    </section>
  );
};

export default BTech;

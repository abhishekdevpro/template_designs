import Link from "next/link";
import blog3 from './Images/blog3.jpg'
import Home_five from "./Home_five";

const Home_fourth = () => {

    const course = [
      {
        img: "https://blog.abroadium.com/wp-content/uploads/2024/08/What-are-the-alarming-signs-your-boss-wants-you-to-leave-the-job-2.jpg",
        title: "10 alarming signs why your wants you to leave the job",
        link: "https://blog.abroadium.com/2024/08/29/what-are-the-alarming-signs-your-boss-wants-you-to-leave-the-job/",
      },
      {
        img: "https://blog.abroadium.com/wp-content/uploads/2024/08/What-are-the-alarming-signs-your-boss-wants-you-to-leave-the-job-1.jpg",
        title: "10 must have HR professional skills required for your resume",
        link: "https://blog.abroadium.com/",
      },

      {
        img: "https://deanairbuildfe.vercel.app/assets/blog3-D70vj1o3.jpg",
        title: "Science behind AI-powered resume-scoring systems",
        link: "https://blog.abroadium.com/2024/08/29/7/",
      },

      {
        img: "https://blog.abroadium.com/wp-content/uploads/2024/08/What-are-the-alarming-signs-your-boss-wants-you-to-leave-the-job-3.jpg",
        title: "Why is it important to have resumes built by experts?",
        link: "https://blog.abroadium.com/2024/08/29/why-is-it-important-to-have-resumes-built-by-experts-in-2024/",
      },
    ];
    return (
      <>
        <div id="course" className="bg-gray-100 py-10 ">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl lg:text-5xl font-bold px-4 lg:px-0 py-5 text-center">
              Newest Strategies From Our Career Search Advisors
            </h1>
            <p className="mx-auto px-4 lg:px-0 text-lg lg:text-base text-gray-700 max-w-4xl text-center mb-8">
              You’re never alone in your job search. Whether you’re writing a
              cover letter, preparing for the interview, or negotiating your
              salary, our resource center has articles that will help you take
              the next step in your career.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {course.map((card, index) => (
                <a
                  key={index}
                  href={card.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-between h-full bg-white rounded-xl shadow-md overflow-hidden transition duration-300 transform hover:scale-105"
                >
                  <img
                    src={card.img}
                    alt="Course"
                    className="w-full h-auto border-2 rounded-t-md"
                  />
                  <div className="p-4">
                    <h2 className="text-lg lg:text-lg font-bold mb-2">
                      {card.title}
                    </h2>
                    {/* <p className="text-sm text-gray-600">{card.name}</p> */}
                  </div>
                </a>
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Link href={"https://blog.abroadium.com/"}>
                <button className="px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600">
                  Get More Career Advice
                </button>
              </Link>
            </div>
          </div>
        </div>

        <Home_five />
      </>
    );
  };
  
  export default Home_fourth;
  
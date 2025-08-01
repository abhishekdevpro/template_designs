import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tokenError, setTokenError] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showPopup, setShowPopup] = useState(true);
  const router = useRouter();
  const { result } = router.query; // Accessing result from query parameters

  // Function to fetch skills data
  const fetchSkills = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = "/login2";
      return;
    }

    try {
      const response = await axios.get('https://api.sentryspot.co.uk/api/user/user-skills', {
        headers: {
          Authorization: token,
        },
      });

      if (Array.isArray(response.data.data)) {
        const formattedSkills = response.data.data.map(skill => ({
          id: skill.id,
          name: skill.name,
          total_question: skill.skill_assessment?.results?.total_question || 0,
          right_answer: skill.skill_assessment?.results?.right_answer || 0,
          wrong_answer: skill.skill_assessment?.results?.wrong_answer || 0,
          Percentage: skill.skill_assessment?.results?.Percentage || '0.0',
        }));
        setSkills(formattedSkills);
      } else {
        throw new Error('API response data is not an array');
      }
      setLoading(false);
    } catch (error) {
      console.error('There was an error fetching the skills data!', error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        setTokenError('Unauthorized access. Please log in again.');
        window.location.href = "/login2";
      } else {
        setError(error);
      }
      setLoading(false);
    }
  };

  // Handle new results and add to skills list
  useEffect(() => {
    if (result) {
      setSkills((prevSkills) => [
        ...prevSkills,
        {
          id: result.skillId,
          name: result.skillName,
          total_question: result.totalQuestions,
          right_answer: result.rightAnswers,
          wrong_answer: result.wrongAnswers,
          Percentage: result.percentage,
        },
      ]);
    }
  }, [result]);

  const handleTakeTest = (skillId, skillName) => {
    setSelectedSkill({ id: skillId, name: skillName });
    setShowInstructions(true);
  };

  const proceedToTest = () => {
    if (selectedSkill) {
      setShowInstructions(false);
      router.push(`Skilltest/${selectedSkill.id}/${encodeURIComponent(selectedSkill.name)}`);
    }
  };

  const closeInstructions = () => {
    setShowInstructions(false);
  };

  const handleContinue = () => {
    setShowPopup(false);
    fetchSkills();
  };

  if (tokenError) {
    return <div>{tokenError}</div>;
  }

  if (error) {
    return <div className="py-16 px-5 text-center text-3xl">🎮 Retry again or update your Skills, So you can take the test</div>;
  }

  return (
    <div className="py-1 bg-gray-100 w-full">
      {/* Popup screen */}
      {showPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold mb-3">Welcome to Skills Assessment</h2>
            <p className="text-lg mb-4">
              Please take a moment to read the instructions carefully before proceeding.
            </p>
            <button
              onClick={handleContinue}
              className="bg-gray-400 text-black px-4 py-2 rounded-lg shadow-xl font-semibold"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Main content after the popup */}
      {!showPopup && (
        <>
          <h1 className="text-3xl text-center md:text-5xl font-bold text-gray-700 p-3">👨‍💻 Take Skill Assessment</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 py-5 text-center">
            {skills.length > 0 ? (
              skills.map((skill, index) => (
                <div key={index} className="bg-indigo-900 rounded-xl shadow-2xl border-2 border-slate-600 px-5 py-4 text-center">
                  <h3 className="text-2xl sm:text-3xl text-white font-semibold py-3">{skill.name || 'Add skill from CV'}</h3>
                  <p className="text-center text-white py-1">❓ Total Questions: {skill.total_question || '15'}</p>
                  <p className="text-center text-white py-1">📌 Right Answers: {skill.right_answer || '0'}</p>
                  <p className="text-center text-white py-1">⚠️ Wrong Answers: {skill.wrong_answer || '0'}</p>
                  <p className="text-center text-white py-1">📈 Percentage: {Math.floor(skill.Percentage) || '0'}</p>
                  <div className="flex justify-center py-6">
                    <button
                      onClick={() => handleTakeTest(skill.id, skill.name)}
                      className="px-8 py-2 rounded-xl shadow-xl bg-gray-400 text-black font-semibold"
                    >
                      ✍ Take Test
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-gray-700">No skills data available.</div>
            )}
          </div>
        </>
      )}

      {/* Modal for instructions */}
      {showInstructions && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg text-center relative">
            <button
              onClick={closeInstructions}
              className="absolute top-0 right-0 m-4 text-red-600 hover:text-red-800 font-semibold"
            >
              close
            </button>
            <h2 className="text-2xl font-bold mb-3">📜 Instructions</h2>
            <p className="text-lg mb-3 text-start">
              <strong>Following instructions are common for all User.</strong><br/><br/>
              1. The duration of the test is 10 minutes*. Your answer gets automatically submitted after 10 minutes*.<br/>
              2. This test consists of 15* multiple-choice questions.<br/>
              3. You may attempt the questions in any order.<br/>
              4. Please select the correct answer and click the Save and next button.<br/>
              5. Please click skip if you wish to skip a question. You may come back and answer the question later.<br/>
              6. Please click on the Submit Assessment button after answering all the questions.<br/>
              7. Do not close the window before submitting the test.<br/>
              8. Tests will be automatically submitted after the given time limit.<br/>
            </p>
            <button
              onClick={proceedToTest}
              className="bg-gray-400 text-black px-4 py-2 rounded-xl shadow-xl font-semibold"
            >
              Proceed to Test
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;

// pages/testpaper/[skillId]/[skillName].js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

function Testpaper() {
  const router = useRouter();
  const { skillId, skillName } = router.query; // Access dynamic route params

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({});
  const [skillAssessmentId, setSkillAssessmentId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.push('/login2'); // Redirect to login if no token is found
      return;
    }

    if (skillId && skillName) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(
            `https://api.sentryspot.co.uk/api/user/skill-assessment?skill_id=${parseInt(skillId)}&skill_name=${encodeURIComponent(skillName)}`,
            {
              headers: {
                Authorization: token,
                'Content-Type': 'application/json',
              },
            }
          );
          const { questions, skill_assessment_id } = response.data.data;
          setQuestions(questions);
          setSkillAssessmentId(skill_assessment_id);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching questions:', error);
          setError(error.message || 'Error fetching questions');
          setLoading(false);
        }
      };

      fetchQuestions();
    }
  }, [skillId, skillName, router]);

  const handleAnswerChange = (questionId, answer) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId ? { ...question, user_answer: answer } : question
      )
    );
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    const jobSeekerId = 1; // Replace with the actual JobSeekerId if needed

    if (!token) {
      router.push('/login2');
      return;
    }

    try {
      const response = await axios.put(
        `https://api.sentryspot.co.uk/api/user/skill-assessment/${skillAssessmentId}`,
        {
          user_id: parseInt(jobSeekerId, 10),
          skill_id: parseInt(skillId, 10),
          skill_name: skillName,
          questions: questions.map((question) => ({
            ...question,
            user_answer: question.user_answer || '',
          })),
        },
        {
          headers: {
            Authorization: token,
            'Content-Type': 'application/json',
          },
        }
      );

      const { results } = response.data.data;
      setResults(results);
      setShowResults(true);

      // Store results in local storage
      localStorage.setItem('testResults', JSON.stringify({
        skillName,
        totalQuestions: results.total_question,
        rightAnswers: results.right_answer,
        wrongAnswers: results.wrong_answer,
        percentage: results.Percentage,
      }));
    } catch (error) {
      console.error('Error submitting answers:', error);
      setError(error.message || 'Error submitting answers');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleBack = () => {
    router.back(); // Navigate back to the previous page
  };

  if (loading) {
    return (
      <div className="font-bold mx-auto text-xl">
        <div className="w-100 d-flex flex-row justify-content-center align-items-center bg-white p-5">
          <div className="w-75 d-flex flex-column align-items-center" style={{ gap: "7px" }}>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
              <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-900 h-64 w-64 pt-20 ps-16">
                Please Wait..
              </div>
            </div>
            <h2 className="text-violet-950">Hold On A Second! We re Processing your request...!</h2>
            <p className="p-0 m-0" style={{ color: "red", fontWeight: "500" }}>
              Don t Shut or Back Your Window!
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen w-full">
      <div className="flex-1 py-24 bg-slate-200 px-5">
        {showResults ? (
          <div className="w-100 bg-white d-flex justify-content-center align-items-center text-center">
            <div className="w-75 d-flex flex-column align-items-center p-20 font-bold border-2 rounded-lg" style={{ gap: '12px' }}>
              <h3>Total Questions: {results.total_question}</h3>
              <h3 className="m-2">Right Answer: {results.right_answer}</h3>
              <h3>Wrong Answer: {results.wrong_answer}</h3>
              <h3 className="m-2">Percentage: {Math.floor(results.Percentage)}%</h3>
              <button
                className="p-2 bg-violet-950 rounded-md text-white hover:bg-violet-950 mt-4"
                onClick={handleBack}
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-2xl mb-4 ms-20">{questions[currentQuestionIndex].question}</h1>
            <ul className="mb-4">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <li key={index} className="mb-2 ms-20">
                  <input
                    type="radio"
                    id={`option-${index}`}
                    name="option"
                    value={option}
                    checked={questions[currentQuestionIndex].user_answer === option}
                    onChange={() => handleAnswerChange(questions[currentQuestionIndex].id, option)}
                    className="mr-2"
                  />
                  <label htmlFor={`option-${index}`}>{option}</label>
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <button
                className={`p-2 bg-violet-950 rounded-md text-white hover:bg-violet-950 mt-4 ${
                  currentQuestionIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
              >
                ↩️ Previous
              </button>
              {currentQuestionIndex === questions.length - 1 ? (
                <button
                  className="p-2 bg-green-500 rounded-md text-white hover:bg-green-700"
                  onClick={handleSubmit}
                >
                  🎓 Submit
                </button>
              ) : (
                <button
                  className="p-2 bg-violet-950 rounded-md text-white hover:bg-violet-950 mt-4"
                  onClick={handleNext}
                >
                  ↪️ Next
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Testpaper;

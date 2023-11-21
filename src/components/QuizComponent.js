import React, { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import he from 'he';

const QuizComponent = () => {

  const [submitted, setSubmitted] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// Function to shuffle an array using the Fisher-Yates algorithm
  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };
  
  // ...
  
  const fetchQuestions = async () => {
    try {
      const response = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
      const data = await response.json();
    
  
      if (data.results && data.results.length > 0) {
  
      const decodedQuestions = data.results.map((question) => {
        return {
          ...question,
          question: he.decode(question.question),
          correct_answer: he.decode(question.correct_answer),
          answers: shuffleArray([
            ...question.incorrect_answers.map((answer) => ({ text: he.decode(answer), isHeld: false })),
            { text: he.decode(question.correct_answer), isHeld: false, backgroundColor: '', border: "", color:"" },
          ]),
        };
      });
  
      // Add unique IDs to each answer
      const questionsWithIDs = decodedQuestions.map((question) => {
        return {
          ...question,
          answers: question.answers.map((answer) => ({
            ...answer,
            id: nanoid(),
          })),
        };
      });
  
      setQuestions(questionsWithIDs);
  
    } else {
      console.warn('No questions found in the API response.');
    }
  
  
  
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
   


    
    

    fetchQuestions();

    const intervalId = setInterval(fetchQuestions, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  const handleAnswerSelect = (questionIndex, selectedAnswerId) => {
    if (submitted) {
      return;
    }
    setUserAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[questionIndex] = selectedAnswerId;
      return updatedAnswers;
    });
  
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
  
      // Deselect the previously selected answer in the same question
      if (updatedQuestions[questionIndex].selectedAnswerId !== undefined) {
        const prevSelectedAnswer = updatedQuestions[questionIndex].answers.find(
          (answer) => answer.id === updatedQuestions[questionIndex].selectedAnswerId
        );
  
        if (prevSelectedAnswer) {
          prevSelectedAnswer.isHeld = false;
        }
      }
  
      // Update the selected answer for the current question
      updatedQuestions[questionIndex].selectedAnswerId = selectedAnswerId;
  
      const selectedAnswer = updatedQuestions[questionIndex].answers.find(
        (answer) => answer.id === selectedAnswerId
      );
  
      if (selectedAnswer) {
        // Toggle the 'isHeld' property for the selected answer
        selectedAnswer.isHeld = !selectedAnswer.isHeld;
  
        // Force React to re-render by updating the state with a shallow copy
        setQuestions([...updatedQuestions]);
      }
  
      return updatedQuestions;
    });
  };
  
  
  

  const handleSubmit = () => {

    // Check if all questions have been answered
  if (userAnswers.length !== questions.length || userAnswers.includes(undefined)) {
    alert("Please complete all questions before submitting.");
    return;
  }

    // Calculate the score based on user's answers
    const calculatedScore = questions.reduce((acc, question, index) => {
      const correctAnswer = question.answers.find(answer => answer.text === question.correct_answer);
      const userAnswerId = userAnswers[index];
      const userAnswer = question.answers.find(answer => answer.id === userAnswerId);
  
      if (userAnswer && userAnswer.isHeld && userAnswer.text === correctAnswer.text) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);
  
    // Update the state with the calculated score
    setScore(calculatedScore);
    setSubmitted(true);

    setQuestions((prevQuestions) => {
      return prevQuestions.map((question) => {
        const correctAnswer = question.answers.find((answer) => answer.text === question.correct_answer);
        const selectedAnswerId = userAnswers[prevQuestions.indexOf(question)];
        const selectedAnswer = question.answers.find((answer) => answer.id === selectedAnswerId);
    
        if (correctAnswer) {
          correctAnswer.backgroundColor = '#94D7A2';
          correctAnswer.border = 'none';
        }
    
        if (selectedAnswer && selectedAnswer.isHeld && selectedAnswer.text !== correctAnswer.text) {
          selectedAnswer.backgroundColor = '#F8BCBC';
          selectedAnswer.border = 'none';
          // selectedAnswer.color = "#DBDEF0"
        }
    
        return question;
      });
    });
  };

  



  const handlePlayAgain = () => {
    // Reset state for a new round
    setQuestions([]);
    setUserAnswers([]);
    setScore(null);
    setSubmitted(false);

    // Fetch new questions
    fetchQuestions();
  };
  
  
  

  return (
    <div className='quiz-container'>
      {loading && <p>Loading questions...</p>}
      {error && <p>Error fetching questions: {error.message}</p>}

      {questions?.length > 0 ? (
       questions.map((question, index) => (
        <div key={index}>
          <p className='question'>{question.question}</p>
          <div className="answers-container">
            {question.answers.map((answer) => (
              <button
                key={answer.id}
                className={`answer ${answer.isHeld ? 'selected' : ''}`}
                style={{ backgroundColor: answer.backgroundColor , border: answer.border }}
                onClick={() => handleAnswerSelect(index, answer.id)}
              >
                {answer.text}
              </button>
            ))}
          </div>
        </div>
      ))
      
        

      ) 
      
      : (
        <p>No questions available</p>
      )}

{questions?.length > 0 && (
      <div className="score-container">
        {submitted && <p className="score">You scored {score} / {questions?.length} correct answers</p>}
        <button className= "submit--btn" onClick={submitted ? handlePlayAgain : handleSubmit}>
          {submitted ? 'Play Again!' : 'Check Answers'}
        </button>
      </div>
    )}
  </div>
);
};


export default QuizComponent;

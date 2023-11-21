import React, { useState } from 'react';
import QuizComponent from './components/QuizComponent';

export default function App() {
  const [quizStarted, setQuizStarted] = useState(false);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  return (
    <div>
      <img src={`${process.env.PUBLIC_URL}/images/yellow.png`} className="img--yellow" alt="Yellow Image" />

      {!quizStarted && (
        <div className='start--page'>
          <h2 className='title'>Quizzical</h2>
          <p className='quiz--des'>Embark on a journey of knowledge and fun! Test your wits with a diverse range of questions, challenge yourself, and discover fascinating facts in our interactive quiz adventure.</p>
          <button className='start--btn' onClick={startQuiz}>Start quiz</button>
        </div>
      )}

      {quizStarted && <QuizComponent />}

      <img src={`${process.env.PUBLIC_URL}/images/blobs.png`} className="img--blobs"alt="blue Image" />
    </div>
  );
}

Quizzical
Quizzical is an interactive quiz application that seamlessly combines knowledge and fun, offering an engaging quiz adventure for users of all levels. The app is built using React, making it dynamic and user-friendly.

Features
Diverse Questions: Explore a wide array of questions covering different subjects and difficulty levels.
Responsive Design: Enjoy a seamless experience on various devices with a responsive and user-friendly interface.
Score Tracking: Receive instant feedback on your quiz performance and track your score.
Play Again: After completing a quiz, take the opportunity to play again and improve your knowledge.
How Quizzical Works
Fetching Questions
Quizzical fetches its questions from the Open Trivia Database, ensuring a diverse and ever-expanding set of quiz content. The app utilizes the fetch API to make asynchronous requests to the database, fetching a set number of questions based on user preferences, such as the number of questions and question type.

React State Management
Quizzical leverages the power of React state to manage various aspects of the application. The state includes:

Questions: Stored in the state, questions are dynamically rendered, allowing users to progress through the quiz seamlessly.
User Answers: The app keeps track of user-selected answers using state, providing real-time feedback during the quiz.
Score: Quizzical calculates the user's score based on correct answers, and the score is updated in the state.
useEffect for Continuous Fetching
The useEffect hook plays a crucial role in ensuring a continuous supply of questions. By incorporating the useEffect hook, Quizzical triggers the fetching of new questions at regular intervals. This ensures that users always have fresh and interesting content to engage with.

Technologies Used
React: Built with the React library for a dynamic and efficient user interface.
Open Trivia Database API: Fetches questions from the Open Trivia Database to provide a diverse set of quiz content.
Getting Started
To get started with Quizzical, follow these simple steps:

Clone the repository to your local machine.
Install dependencies using npm install.
Run the app locally with npm start.
Start quizzing and enjoy the learning experience with Quizzical!

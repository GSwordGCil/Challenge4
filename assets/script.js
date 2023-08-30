// script.js
const startButton = document.getElementById('start-button');
const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const TimerEL = document.getElementById('timer');
const timerElement = document.getElementById('time-left');
const endScreen = document.getElementById('end-screen');
const finalScore = document.getElementById('final-score');
const initialsInput = document.getElementById('initials');
const saveScoreButton = document.getElementById('save-score');
const highScores = document.getElementById('high-scores');
const highScoreList = document.getElementById('high-score-list');
const backButton = document.getElementById('back-button');
const viewTopScores = document.getElementById('view-top-scores');
const resetScoresButton = document.getElementById('reset-scores-button');


let currentQuestionIndex = 0;
let timeLeft = 90;
let score = 0;

const questions = [
  {
    question: 'What is the correct way to declare a variable in JavaScript?',
    answers: [
      { text: 'var myVar = 10;', correct: false },
      { text: 'variable myVar = 10;', correct: false },
      { text: 'let myVar = 10;', correct: true },
      { text: 'const myVar = 10;', correct: false },
    ],
  },
  {
    question: 'What is the result of 5 + "5" in JavaScript?',
    answers: [
      { text: '10', correct: false },
      { text: '55', correct: true },
      { text: 'NaN', correct: false },
      { text: 'Error', correct: false },
    ],
  },
  {
    question: 'Which built-in method is used to convert a string to lowercase in JavaScript?',
    answers: [
      { text: 'toLowerCase()', correct: true },
      { text: 'toLower()', correct: false },
      { text: 'lowerCase()', correct: false },
      { text: 'stringLower()', correct: false },
    ],
  },
  {
    question: 'What does the "DOM" stand for in web development?',
    answers: [
      { text: 'Document Object Model', correct: true },
      { text: 'Design Oriented Markup', correct: false },
      { text: 'Data Object Model', correct: false },
      { text: 'Dynamic Output Manager', correct: false },
    ],
  },
  {
    question: 'What is an example of an event in JavaScript?',
    answers: [
      { text: 'mouseClick', correct: false },
      { text: 'keyPress', correct: false },
      { text: 'click', correct: true },
      { text: 'buttonPress', correct: false },
    ],
  },
  {
    question: 'What is the purpose of the "this" keyword in JavaScript?',
    answers: [
      { text: 'It refers to the current function being executed.', correct: false },
      { text: 'It refers to the global object.', correct: false },
      { text: 'It refers to the DOM element that triggered an event.', correct: false },
      { text: 'It refers to the object that is currently executing the function.', correct: true },
    ],
  },
  {
    question: 'Which method is used to add an element at the end of an array?',
    answers: [
      { text: 'array.shift()', correct: false },
      { text: 'array.unshift()', correct: false },
      { text: 'array.push()', correct: true },
      { text: 'array.pop()', correct: false },
    ],
  },
  {
    question: 'What is a closure in JavaScript?',
    answers: [
      { text: 'A method that allows variables to be accessed only within a specific function.', correct: false },
      { text: 'A way to create private methods and variables in an object.', correct: false },
      { text: 'A function that returns another function, allowing access to its parent scope.', correct: true },
      { text: 'A type of data structure for storing multiple values.', correct: false },
    ],
  },
  {
    question: 'What does JSON stand for in JavaScript?',
    answers: [
      { text: 'JavaScript Original Notation', correct: false },
      { text: 'JavaScript Object Notation', correct: true },
      { text: 'JavaScript Ordered Notation', correct: false },
      { text: 'JavaScript Overridden Notation', correct: false },
    ],
  },
  {
    question: 'Which built-in method is used to convert a string to an array of characters?',
    answers: [
      { text: 'stringToArray()', correct: false },
      { text: 'split()', correct: true },
      { text: 'charArray()', correct: false },
      { text: 'parseArray()', correct: false },
    ],
  },
];


let highScoreData = JSON.parse(localStorage.getItem('highScores')) || [];

function displayHighScores() {
  highScoreList.innerHTML = '';
  highScoreData.sort((a, b) => b.score - a.score);
  highScoreData.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${index + 1}. ${entry.initials} - ${entry.score}`;
    highScoreList.appendChild(li);
  });
}



function saveHighScore(initials, score) {
  highScoreData.push({ initials, score });
  localStorage.setItem('highScores', JSON.stringify(highScoreData));
}


TimerEL.style.display = 'none';


function startQuiz() {
  startButton.classList.add('hidden');
  highScores.classList.add('hidden');
  questionContainer.innerHTML = '';
  answerButtons.innerHTML = '';
  endScreen.classList.add('hidden');
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 60;
  setNextQuestion();
  startTimer();

  // Show the timer element when the quiz starts
  TimerEL.style.display = 'block';

  // Hide the "Back" link when the quiz starts
  backButton.style.display = 'none';
  resetScoresButton.classList.add('hidden');
}

function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0 || currentQuestionIndex >= questions.length) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function setNextQuestion() {
  if (currentQuestionIndex < questions.length && timeLeft > 0) {
    const question = questions[currentQuestionIndex];
    questionContainer.textContent = question.question;
    answerButtons.innerHTML = '';

    question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.textContent = answer.text;
      button.classList.add('answer-button');
      button.addEventListener('click', () => selectAnswer(answer));
      answerButtons.appendChild(button);
    });
  } else {
    questionContainer.textContent = ''; // Clear question container when no more questions
    answerButtons.innerHTML = '';
  }
}

function selectAnswer(answer) {
  if (answer.correct) {
    score++;
  } else {
    timeLeft -= 10;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
  }
  currentQuestionIndex++;
  answerButtons.innerHTML = '';
  setNextQuestion();
}


function endQuiz() {
  endScreen.classList.remove('hidden');
  score = Math.max(0, timeLeft);
  finalScore.textContent = score;
  saveScoreButton.disabled = false;
  displayHighScores();

  // Show the high scores section
  highScores.classList.remove('hidden');

  // Show the "Back" link
  backButton.style.display = 'block';

  // Hide the timer element after the quiz ends
  TimerEL.style.display = 'none';
  resetScoresButton.classList.remove('hidden');
}


function saveScore() {
  const initials = initialsInput.value.trim();
  if (initials !== '') {
    saveHighScore(initials, score);
    initialsInput.value = '';
    endScreen.classList.add('hidden');
    saveScoreButton.disabled = true;
    displayHighScores();
  }
}

// Load high scores and display them when the page loads
displayHighScores();


startButton.addEventListener('click', startQuiz);
saveScoreButton.addEventListener('click', () => saveScore());
backButton.addEventListener('click', () => {
  window.location.reload();
});
viewTopScores.addEventListener('click', () => {
  timeLeft = 0;
  endQuiz(); // Terminate the quiz
  highScores.classList.remove('hidden');
  startButton.classList.add('hidden'); // Show the high scores
});



resetScoresButton.addEventListener('click', () => {
  localStorage.removeItem('highScores');
  highScoreData = []; // Clear highScoreData array
  displayHighScores();
});

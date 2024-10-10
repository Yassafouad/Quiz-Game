const questions = [
    {
        category: "Science",
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    },
    {
        category: "History",
        question: "Who was the first President of the United States?",
        options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
        answer: 1
    },
    {
        category: "General Knowledge",
        question: "Which company is known for the iPhone?",
        options: ["Microsoft", "Apple", "Google", "Samsung"],
        answer: 1
    },
    {
        category: "Geography",
        question: "Which is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        answer: 0
    },
    {
        category: "Entertainment",
        question: "Which movie won the Oscar for Best Picture in 2020?",
        options: ["Parasite", "1917", "Joker", "Ford v Ferrari"],
        answer: 0
    },
    {
        category: "Sports",
        question: "Which country won the FIFA World Cup in 2018?",
        options: ["Germany", "Argentina", "France", "Brazil"],
        answer: 2
    },
    {
        category: "Technology",
        question: "What does HTTP stand for?",
        options: ["HyperText Transfer Protocol", "HyperText Transfer Program", "Hyper Transfer Protocol", "HyperText Transport Program"],
        answer: 0
    },
    {
        category: "Literature",
        question: "Who wrote 'Pride and Prejudice'?",
        options: ["Emily Brontë", "George Eliot", "Jane Austen", "Charles Dickens"],
        answer: 2
    },
    {
        category: "Science",
        question: "What is the chemical symbol for Gold?",
        options: ["Au", "Ag", "Gd", "Pt"],
        answer: 0
    },
    {
        category: "Mathematics",
        question: "What is the value of Pi (π) to two decimal places?",
        options: ["3.12", "3.14", "3.16", "3.18"],
        answer: 1
    },
    {
        category: "Space",
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Mercury", "Jupiter"],
        answer: 0
    },
    {
        category: "History",
        question: "When did World War II end?",
        options: ["1939", "1941", "1945", "1950"],
        answer: 2
    },
    {
        category: "Science",
        question: "What gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        answer: 1
    }
];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;
let progress = 0;

const categoryElem = document.getElementById('category');
const questionElem = document.getElementById('question');
const answerButtons = document.querySelectorAll('.answer');
const scoreElem = document.getElementById('score');
const highScoreElem = document.getElementById('high-score');
const timeElem = document.getElementById('time');
const progressElem = document.getElementById('progress');
const startButton = document.getElementById('start');

if (localStorage.getItem('highScore')) {
    highScoreElem.innerText = localStorage.getItem('highScore');
}

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    scoreElem.innerText = score;
    startButton.disabled = true;
    timeLeft = 60;
    timeElem.innerText = timeLeft;
    shuffledQuestions = [...questions];
    shuffle(shuffledQuestions); 
    timerInterval = setInterval(updateTimer, 1000);
    loadQuestion();
}

function loadQuestion() {
    const questionData = shuffledQuestions[currentQuestionIndex];
    categoryElem.innerText = `Category: ${questionData.category}`;
    questionElem.innerText = questionData.question;

    const shuffledAnswers = [...questionData.options];
    shuffle(shuffledAnswers);

    answerButtons.forEach((btn, index) => {
        btn.innerText = shuffledAnswers[index];
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });

    progress = ((currentQuestionIndex + 1) / shuffledQuestions.length) * 100;
    progressElem.style.width = `${progress}%`;
}

function updateTimer() {
    timeLeft--;
    timeElem.innerText = timeLeft;
    if (timeLeft === 0) {
        clearInterval(timerInterval);
        endGame();
    }
}

function checkAnswer(selectedIndex) {
    const questionData = shuffledQuestions[currentQuestionIndex];
    const correctAnswerText = questionData.options[questionData.answer];

    if (answerButtons[selectedIndex].innerText === correctAnswerText) {
        answerButtons[selectedIndex].classList.add('correct');
        score++;
    } else {
        answerButtons[selectedIndex].classList.add('incorrect');
    }

    scoreElem.innerText = score;
    answerButtons.forEach(btn => btn.disabled = true); 
    setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < shuffledQuestions.length) {
        loadQuestion();
    } else {
        endGame();
    }
}

function endGame() {
    clearInterval(timerInterval);
    alert(`Game Over! Your score: ${score}`);
    const highScore = localStorage.getItem('highScore') || 0;
    if (score > highScore) {
        localStorage.setItem('highScore', score);
        highScoreElem.innerText = score;
    }
    startButton.disabled = false;
}

startButton.addEventListener('click', startGame);
answerButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => checkAnswer(index));
});
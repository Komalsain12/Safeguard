const quizData = [
    {
        question: "What is the first step in disaster management?",
        options: ["Preparedness", "Response", "Recovery", "Mitigation"],
        correct: "Preparedness"
    },
    {
        question: "Which organization in India is responsible for disaster management?",
        options: ["NITI Aayog", "ISRO", "NDMA", "DRDO"],
        correct: "NDMA"
    },
    {
        question: "What does NDMA stand for?",
        options: ["National Disaster Management Authority", "National Defense Management Authority", "National Development Management Authority", "National Disaster Mitigation Authority"],
        correct: "National Disaster Management Authority"
    },
    {
        question: "Which natural disaster is most common in India?",
        options: ["Tornadoes", "Earthquakes", "Hurricanes", "Floods"],
        correct: "Floods"
    },
    {
        question: "What is the key to effective disaster response?",
        options: ["Panic", "Preparedness", "Ignoring the warnings", "Evacuation"],
        correct: "Preparedness"
    },
    {
        question: "Which of the following is a man-made disaster?",
        options: ["Earthquake", "Flood", "Chemical Spill", "Cyclone"],
        correct: "Chemical Spill"
    },
    {
        question: "What should you do first in the event of an earthquake?",
        options: ["Run outside", "Hide under a table", "Stand in a doorway", "Call emergency services"],
        correct: "Hide under a table"
    },
    {
        question: "Which scale is used to measure the intensity of earthquakes?",
        options: ["Richter scale", "Beaufort scale", "Mercalli scale", "Fujita scale"],
        correct: "Richter scale"
    },
    {
        question: "What should be included in an emergency kit?",
        options: ["Water and food", "Flashlight and batteries", "First aid kit", "All of the above"],
        correct: "All of the above"
    },
    {
        question: "What is the primary purpose of disaster drills?",
        options: ["To scare people", "To disrupt daily routines", "To ensure preparedness", "To waste time"],
        correct: "To ensure preparedness"
    }
];

let currentQuestionIndex = 0;
let score = 0;
const answerResults = [];

const questionContainer = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const popup = document.getElementById('popup');
const totalScoreText = document.getElementById('total-score');
const answerSummary = document.getElementById('answer-summary');
const restartBtn = document.getElementById('restartBtn');

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option');
        button.addEventListener('click', () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });

    prevBtn.style.display = currentQuestionIndex === 0 ? 'none' : 'inline';
    nextBtn.style.display = currentQuestionIndex === quizData.length - 1 ? 'none' : 'inline';
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizData[currentQuestionIndex];
    const isCorrect = selectedOption === currentQuestion.correct;

    if (isCorrect) score++;

    answerResults.push({
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.correct,
        isCorrect: isCorrect
    });

    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showPopup();
    }
}

function showPopup() {
    totalScoreText.textContent = score;

    answerSummary.innerHTML = answerResults.map(result => `
        <p class="${result.isCorrect ? 'correct' : 'incorrect'}">
            Q: ${result.question}<br>
            Your Answer: ${result.selected}<br>
            ${result.isCorrect ? '' : `Correct Answer: ${result.correct}`}
        </p>
    `).join('');

    popup.classList.remove('hidden');
}

restartBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
    currentQuestionIndex = 0;
    score = 0;
    answerResults.length = 0;
    loadQuestion();
});

prevBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
});

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
});

loadQuestion();

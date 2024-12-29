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

const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');

function buildQuiz() {
    const output = [];
    quizData.forEach((currentQuestion, questionNumber) => {
        const options = [];
        for (let option in currentQuestion.options) {
            options.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${currentQuestion.options[option]}" onclick="checkAnswer(this, ${questionNumber})">
                    ${currentQuestion.options[option]}
                </label>`
            );
        }
        output.push(
            `<div class="question">
                <h3>${currentQuestion.question}</h3>
                <div class="options">${options.join('')}</div>
            </div>`
        );
    });
    quizContainer.innerHTML = output.join('');
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const questions = document.querySelectorAll('.question');
    questions.forEach((question, questionIndex) => {
        question.classList.remove('active');
        if (questionIndex === index) {
            question.classList.add('active');
        }
    });
}

function showNextQuestion() {
    const questions = document.querySelectorAll('.question');
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion(currentQuestionIndex);
    }
}

function showPreviousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion(currentQuestionIndex);
    }
}

function checkAnswer(selectedOption, questionNumber) {
    const labels = selectedOption.parentElement.parentElement.querySelectorAll('label');
    const userAnswer = selectedOption.value;
    labels.forEach(label => {
        label.classList.remove('correct', 'incorrect');
        if (label.textContent.trim() === quizData[questionNumber].correct) {
            label.classList.add('correct');
        } else if (label.textContent.trim() === userAnswer) {
            label.classList.add('incorrect');
        }
    });
}

function submitQuiz() {
    let numCorrect = 0;
    quizData.forEach((currentQuestion, questionNumber) => {
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (document.querySelector(selector) || {}).value;
        if (userAnswer === currentQuestion.correct) {
            numCorrect++;
        }
    });
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${quizData.length} questions correct.`;
}

buildQuiz();

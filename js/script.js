'strict mode';

// storing html elements into variables.
let configContainer = document.querySelector('.config-container');
let quizContainer = document.querySelector('.quiz-container');
let resultContainer = document.querySelector('.result-container');
let questionOption = document.querySelectorAll('.question-option');
let startBtn = document.querySelector('.start-quiz-btn');
let questionText = document.querySelector('.question-text');
let answerOptions = document.querySelectorAll('.answer-option');
let nextQuestion = document.querySelector('.next-question-btn')

// 👉 Transition from start screen to quiz
function starttoNextPage() {
    configContainer.style.display = 'none';
    quizContainer.style.display = 'block';
}

startBtn.addEventListener("click", starttoNextPage);

let counterIndex = 0;

// 🧠 Render question and options on the screen
function displayQuestion(index) {
    questionText.textContent = questions[index].question;

    for (i = 0; i<answerOptions.length; i++) {
        let p = answerOptions[i].querySelector('p');
        let span = answerOptions[i].querySelector('span');
        p.textContent = questions[index].options[i];

         // Reset visual state
        answerOptions[i].classList.remove('correct', 'incorrect');
        span.style.display = 'none';
        answerOptions[i].style.pointerEvents = 'auto';
    }
      
}

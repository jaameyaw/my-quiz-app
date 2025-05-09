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

// ✅ Handle user answer selection and show feedback
function checkAnswer() {
    for (i = 0; i < answerOptions.length; i++) {
        answerOptions[i].addEventListener("click", function handleClick() {
            let selectedText = this.querySelector('p').textContent;
            let span = this.querySelector('span');

            // 🔒 Disable further clicks
            for (j = 0; j < answerOptions.length; j++) {
                answerOptions[j].style.pointerEvents = 'none';
            }

            // 🟢 If correct
            if (selectedText === questions[counterIndex].answer) {
                this.classList.add('correct');
                span.textContent = 'check_circle';
                span.style.display = 'inline';
            } else {
                // 🔴 If incorrect, show selected as wrong and find correct
                this.classList.add('incorrect');
                span.textContent = 'cancel';
                span.style.display = 'inline';

                for (k = 0; k < answerOptions.length; k++) {
                    let correctAns = answerOptions[k].querySelector('p').textContent;
                    let correctSpan = answerOptions[k].querySelector('span');
                    if (correctAns === questions[counterIndex].answer) {
                        answerOptions[k].classList.add('correct');
                        correctSpan.textContent = 'check_circle';
                        correctSpan.style.display = 'inline';
                        break;
                    }
                }
            }

            // 🔁 Prevent multiple event bindings
            this.removeEventListener("click", handleClick);
        });
    }
}

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

// Transition from start screen to quiz
function starttoNextPage() {
    configContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    displayQuestion(counterIndex);
    updateStatus();
}

startBtn.addEventListener("click", starttoNextPage);


// Render question and options on the screen
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

// Handle user answer selection and show feedback
for (i = 0; i < answerOptions.length; i++) {
    answerOptions[i].addEventListener("click", function () {
        let selectedText = this.querySelector('p').textContent;
        let span = this.querySelector('span');

        //Disable further clicks
        for (j = 0; j < answerOptions.length; j++) {
            answerOptions[j].style.pointerEvents = 'none';
        }

        // If correct
        if (selectedText === questions[counterIndex].answer) {         
        this.classList.add('correct');
        span.textContent = 'check_circle';
        span.style.display = 'inline';
        correctCounter ++;
        } else {
            // If incorrect, show selected as wrong and find correct
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
    });
}

// display results to the user
function displayResults() {
    resultContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    let resultsMsg = resultContainer.querySelector('p'); 

    if (correctCounter === 5) {
        resultsMsg.innerHTML = `🏆<b>${correctCounter}</b> out of <b>${questions.length}</b>. Ah, you be my twin or what? 😂`
    } else if (correctCounter < 5 && correctCounter > 2) {
        resultsMsg.innerHTML = `👏 <b>${correctCounter}</b> out of <b>${questions.length}</b>. Not bad! You know me quite well.`
    } else {
        resultsMsg.innerHTML = `<b>${correctCounter}</b> out of <b>${questions.length}</b>. Ei! Do you even know me at all? 😂`
    } 
}


// Move to next question and update status
nextQuestion.addEventListener("click", function () {
    counterIndex++;
    if (counterIndex < questions.length) {
        displayQuestion(counterIndex);
        checkAnswer();
        updateStatus();
    }
});

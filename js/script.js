'strict mode';

// storing html elements into variables.
let configContainer = document.querySelector('.config-container');
let startWrapper = document.querySelector('.start-wrapper');
let startBlocker = document.querySelector('#start-blocker');
let tooltip = document.querySelector('#tooltip');
let quizContainer = document.querySelector('.quiz-container');
let resultContainer = document.querySelector('.result-container');
let questionOption = document.querySelectorAll('.question-option');
let startBtn = document.querySelector('.start-quiz-btn');
let questionText = document.querySelector('.question-text');
let answerOptions = document.querySelectorAll('.answer-option');
let nextQuestion = document.querySelector('.next-question-btn');
let nextBlocker = document.querySelector('#next-blocker');
let resultsContainer = document.querySelector('.result-container')
let tryAgainBtn = resultContainer.querySelector('button');
let aboutAuthor = document.querySelector('.about-author');

let counterIndex = 0;
let questionNumberCounter = 0;
let correctCounter = 0;
let selectedQuestions;

// Shuffles the questions array randomly using the Fisher-Yates algorithm.
function fisherYatesShuffle(questionsArr) {

  for (i = questionsArr.length - 1; i > 0; i--) {

    const j = Math.floor(Math.random() * (i + 1));

    [questionsArr[i], questionsArr[j]] = [questionsArr[j], questionsArr[i]];    
  }
}

// Call the function to shuffle the questions array.
fisherYatesShuffle(questions);


// Transition from start screen to quiz
function startQuiz() {
    configContainer.style.display = 'none';
    quizContainer.style.display = 'block'; 
    displayQuestion(counterIndex);
    updateStatus();
}

startBtn.addEventListener("click", startQuiz)


// Fake Disabled Button Using Overlay and display tooltip
startBlocker.addEventListener("click", fakeDisableBtn);

function fakeDisableBtn () {
    tooltip.style.display = 'block';
    setTimeout(() => {
        tooltip.style.display = 'none';
    }, 2000);
}


// When question count is selected, remove the blocker
function enableButton(blockerName) {
    blockerName.style.display = 'none';
}

// add disable overlay when the question count/option is not selected
function disableButton(NameOfBlocker) {
    NameOfBlocker.style.display = 'block';
}


// Highlight selected button and slice questions accordingly
questionOption.forEach (button => {
    button.addEventListener("click", function (){
        let selectedOption = button.textContent;
        questionOption.forEach(btn => {
            btn.classList.remove('active');
        });    

        button.classList.add('active');
        
        if (selectedOption === '5') {
            selectedQuestions = questions.slice(0, 5);
        } else if (selectedOption === '10') {
            selectedQuestions = questions.slice(0, 10);
        } else {
            selectedQuestions = questions.slice(0);
        }
        
        enableButton(startBlocker);
    })
})



// Render question and options on the screen
function displayQuestion(index) {
    questionNumberCounter++
    questionText.textContent = `${questionNumberCounter}. ${selectedQuestions[index].question}`;


    for (i = 0; i<answerOptions.length; i++) {
        let p = answerOptions[i].querySelector('p');
        let icon = answerOptions[i].querySelector('i');
        p.textContent = selectedQuestions[index].options[i];

         // Reset visual state
        answerOptions[i].classList.remove('correct', 'incorrect');
        icon.style.display = 'none';
        answerOptions[i].style.pointerEvents = 'auto';
    }  
    
    disableButton(nextBlocker);

}

// Handle user answer selection and show feedback
for (let i = 0; i < answerOptions.length; i++) {
    answerOptions[i].addEventListener("click", function () {
        let selectedText = this.querySelector('p').textContent.trim();
        let icon = this.querySelector('i');

        // Disable all answer options after a selection
        for (let j = 0; j < answerOptions.length; j++) {
            answerOptions[j].style.pointerEvents = 'none';
        }

        // Check if selected answer is correct
        if (selectedText === selectedQuestions[counterIndex].answer) {
            this.classList.add('correct');
            icon.style.display = 'inline';
            icon.classList.replace('fa-circle-xmark','fa-circle-check' );
            correctCounter ++;
        } else {
            this.classList.add('incorrect');
            icon.style.display = 'inline';
            icon.classList.replace('fa-circle-check','fa-circle-xmark');

            // Show correct answer
            for (let k = 0; k < answerOptions.length; k++) {
                let correctText = answerOptions[k].querySelector('p').textContent.trim();
                let correctIcon = answerOptions[k].querySelector('i');
                if (correctText === selectedQuestions[counterIndex].answer) {
                    answerOptions[k].classList.add('correct');
                    correctIcon.style.display = 'inline';
                    correctIcon.classList.replace('fa-circle-xmark','fa-circle-check' );
                    break;
                }
            }
        }

        enableButton(nextBlocker);
    });
}


// Fake Disabled Button Using Overlay and display tooltip
nextBlocker.addEventListener("click", function() {
    let nextBtnTooltip = document.querySelector('.next-tooltip');
    nextBtnTooltip.style.display = 'block';
    setTimeout(() => {
        nextBtnTooltip.style.display = 'none';
    }, 2000);
});



// display results to the user
function displayResults() {
    resultContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    let resultsMsg = resultContainer.querySelector('p'); 
    let score = correctCounter / selectedQuestions.length;

    if (score === 1) {
        resultsMsg.innerHTML = `🔥 <b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. 100%?!  You’re literally my clone! 😍`;
    } else if (score === 0) {
        resultsMsg.innerHTML = `😅 <b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. Ei! You no know me kraa 😭`;
    } else if (score >= 0.8) {
        resultsMsg.innerHTML = `🏆 <b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. You really know me! I’m impressed. 🙌🏽`;
    } else if (score >= 0.6) {
        resultsMsg.innerHTML = `👏 <b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. Not bad! You know me quite well. 😊`;
    } else if (score >= 0.4) {
        resultsMsg.innerHTML = `🤔 <b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. Hmm... We definitely need to hang out more! 😉`;
    } else {
        resultsMsg.innerHTML = `😬 <b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. Wow... are we even friends? 😂`;
    }

}

// Move to next question and update status
nextQuestion.addEventListener("click", function () {
    counterIndex++;
    if (counterIndex < selectedQuestions.length) {
        displayQuestion(counterIndex);
        updateStatus(); 
    } else {
        displayResults();
    }
});

// allow the user to try again
tryAgainBtn.addEventListener ("click", function (){
    resultContainer.style.display = 'none';
    configContainer.style.display = 'block';
    counterIndex = 0;
    questionNumberCounter = 0;
    correctCounter = 0;    
    fisherYatesShuffle(questions);
    disableButton(startBlocker);

    questionOption.forEach(btn => {
        btn.classList.remove('active');
    });      
});


// Update question number display
function updateStatus() {
    let questionStatus = document.querySelector('.question-status');
    questionStatus.innerHTML = `<b>${counterIndex + 1}</b> of <b>${selectedQuestions.length}</b> Questions`;
}

// handling the keyboard keys (Enter)
document.addEventListener('keydown', function (e) {
    // START QUIZ: Enter on config screen
    if (e.key === 'Enter' && configContainer.style.display !== 'none') {
        if (startBlocker.style.display === 'none') {
            startQuiz();
        } else {
            fakeDisableBtn(); // show tooltip if not ready
        }
    }

    // NEXT QUESTION: Enter on quiz screen
    if (e.key === 'Enter' && quizContainer.style.display === 'block') {
        if (nextBlocker.style.display === 'none') {
            nextQuestion.click();
        } else {
            let nextBtnTooltip = document.querySelector('.next-tooltip');
            nextBtnTooltip.style.display = 'block';
            setTimeout(() => {
                nextBtnTooltip.style.display = 'none';
            }, 2000);
        }
    }
});


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
let userHasClicked = false;
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
function starttoNextPage() {
    configContainer.style.display = 'none';
    quizContainer.style.display = 'block';
    displayQuestion(counterIndex);
    updateStatus();
}

startBtn.addEventListener("click", starttoNextPage);


questionOption.forEach (button => {
    button.addEventListener("click", function (){
        let selectedOption = button.textContent;

        questionOption.forEach(btn => {
            btn.classList.remove('active');
        });    
        
        if (selectedOption === '5') {
            selectedQuestions = questions.slice(0, 5);
            button.classList.add ('active');
        } else if (selectedOption === '10') {
            selectedQuestions = questions.slice(0, 10);
            button.classList.add ('active');
        } else {
            selectedQuestions = questions.slice(0);
            button.classList.add ('active');
        }
    })
})


// check whether user has clicked an option or not.
function checkUserClicked() {
    if (userHasClicked) {
        nextQuestion.disabled = false;
    }
}



// Render question and options on the screen
function displayQuestion(index) {
    questionText.textContent = selectedQuestions[index].question;

    for (i = 0; i<answerOptions.length; i++) {
        let p = answerOptions[i].querySelector('p');
        let span = answerOptions[i].querySelector('span');
        p.textContent = selectedQuestions[index].options[i];

         // Reset visual state
        answerOptions[i].classList.remove('correct', 'incorrect');
        span.style.display = 'none';
        answerOptions[i].style.pointerEvents = 'auto';
    }
      
    }  
    
    // Reset click tracking and disable "Next" button
    userHasClicked = false;
    nextQuestion.disabled = true;
}


// Handle user answer selection and show feedback
for (let i = 0; i < answerOptions.length; i++) {
    answerOptions[i].addEventListener("click", function () {
        let selectedText = this.querySelector('p').textContent;
        let span = this.querySelector('span');

        //Disable further clicks
        for (j = 0; j < answerOptions.length; j++) {
            answerOptions[j].style.pointerEvents = 'none';
        }

        // If correct
        this.classList.add('correct');
        span.textContent = 'check_circle';
        span.style.display = 'inline';
        correctCounter ++;
        if (selectedText === selectedQuestions[counterIndex].answer) {
        } else {
            // If incorrect, show selected as wrong and find correct
            this.classList.add('incorrect');
            span.textContent = 'cancel';
            span.style.display = 'inline';

            for (k = 0; k < answerOptions.length; k++) {
                let correctAns = answerOptions[k].querySelector('p').textContent;
                let correctSpan = answerOptions[k].querySelector('span');
                if (correctAns === selectedQuestions[counterIndex].answer) {
                    answerOptions[k].classList.add('correct');
                    correctSpan.textContent = 'check_circle';
                    correctSpan.style.display = 'inline';
                    break;
                }
            }
        } 
        
        hasUserClicked(); 
    });
}


// display results to the user
function displayResults() {
    resultContainer.style.display = 'block';
    quizContainer.style.display = 'none';
    let resultsMsg = resultContainer.querySelector('p'); 

    if (correctCounter === 5) {
        resultsMsg.innerHTML = `🏆<b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. Ah, you be my twin or what? 😂`
    } else if (correctCounter < 5 && correctCounter > 2) {
        resultsMsg.innerHTML = `👏 <b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. Not bad! You know me quite well.`
    } else {
        resultsMsg.innerHTML = `<b>${correctCounter}</b> out of <b>${selectedQuestions.length}</b>. Ei! Do you even know me at all? 😂`
    } 
}


// Move to next question and update status
nextQuestion.addEventListener("click", function () {
    counterIndex++;
    if (counterIndex < selectedQuestions.length) {
        displayQuestion(counterIndex);
        checkAnswer();
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
    correctCounter = 0;        
    nextQuestion.disabled = true;
    fisherYatesShuffle(questions)
    questionOption.forEach(btn => {
        btn.classList.remove('active');
    });      
});

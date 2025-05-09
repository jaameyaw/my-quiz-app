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



// for (i = 0; i < questionOption.length; i++) {
//     questionOption[i].addEventListener("click", function(){
//         questionOption.forEach(btn => btn.classList.remove('active'));
//         this.classList.add('active');
//     })
// }


// function starttoNextPage() {
//     configContainer.style.display = 'none';
//     quizContainer.style.display = 'block';
// }

// startBtn.addEventListener("click", starttoNextPage);



// for (i = 0; i < answerOptions.length; i++) {
//     answerOptions[i].addEventListener("click", function() {
//         let selectedText = this.querySelector('p').textContent;

//         for (j = 0; j < answerOptions.length; j++) {
//             answerOptions[j].style.pointerEvents = 'none';
//         }

//         let span = this.querySelector('span');

//         if (selectedText === question1.answer) {
//             this.classList.add('correct');
//             span.style.display = 'inline';
//         } else {
//             this.classList.add('incorrect');
//             span.style.display = 'inline';

//             for (k = 0; k < answerOptions.length; k++) {
//                 let correctAns = answerOptions[k].querySelector('p').textContent;
//                 let correctSpan = answerOptions[k].querySelector('span');
//                 if (correctAns === question1.answer) {
//                     answerOptions[k].classList.add('correct');
//                     correctSpan.style.display = 'inline';
//                     break;
//                 }

//             }
//         }

//     })
// }




// function showNextQuestion () {
//     questionText.textContent = question2.question;
    
//     let optionsArr = [];
//     for (i=0; i<answerOptions.length; i++){
//         let options = answerOptions[i].querySelector('p').textContent;
//         optionsArr.push(options);
//     }

//     optionsArr = [...question2.options];

    
// }

// nextQuestion.addEventListener("click", showNextQuestion)
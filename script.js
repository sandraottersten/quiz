
document.addEventListener("DOMContentLoaded", function(){

var res;

fetch('https://opentdb.com/api.php?amount=03&category=11&difficulty=medium&type=multiple')
  .then(function(response) {
    return response.json();
  })
  .then(function(x) {
    console.log(x);
    res = x;
  })
  .then(function() {
    buildQuiz();
  })
  .then(function() {
    showSlide(0);
});


  function buildQuiz() {
    const output = [];                                                     // A place to store the HTML output

    res.results.forEach((currentQuestion, questionNumber) => {              // for each question...
      const answers = [];

      answers.push(                                                     // store the list of answer choices
        `<label>
           <input type="radio" name="question${questionNumber}">
            ${currentQuestion.correct_answer}
         </label>`
      );

      for (letter in currentQuestion.incorrect_answers) {                   // and for each available answer...
        answers.push(                                                       // ...add an HTML radio button
          `<label>
             <input type="radio" name="question${questionNumber}">
              ${currentQuestion.incorrect_answers[letter]}
           </label>`
        );
      }

      output.push(                                                          // add this question and its answers to the output
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");
      console.log(quizContainer);                                               // finally combine output list into one string of HTML and put it on the page
  };

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");        // gather answer containers from quiz

    let numCorrect = 0;                                                         // keep track of user's answers

    res.results.forEach((currentQuestion, questionNumber) => {                  // for each question...
      const answerContainer = answerContainers[questionNumber];                 // find selected answer
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector));
      console.log(userAnswer);

      if (userAnswer === currentQuestion.correct_answer) {                       // if answer is correct
        numCorrect++;                                                           // add to the number of correct answers
        answerContainers[questionNumber].style.color = "lightgreen";            // color the answers green
      } else {                                                                  // if answer is wrong or blank color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${res.results.length}`;  // show number of correct answers out of total
  }

  function showSlide(n) {

    const slides = document.querySelectorAll(".slide");
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");

    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  };

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }
  var currentSlide = 0;
  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);

});

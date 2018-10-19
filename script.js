document.addEventListener("DOMContentLoaded", function(){

  function buildQuiz() {
    const output = [];                                                     // A place to store the HTML output

    myQuestions.forEach((currentQuestion, questionNumber) => {              // for each question...
      const answers = [];                                                   // store the list of answer choices

      for (letter in currentQuestion.answers) {                             // and for each available answer...
        answers.push(                                                       // ...add an HTML radio button
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
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

    quizContainer.innerHTML = output.join("");                              // finally combine our output list into one string of HTML and put it on the page
  }

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll(".answers");        // gather answer containers from our quiz

    let numCorrect = 0;                                                         // keep track of user's answers

    myQuestions.forEach((currentQuestion, questionNumber) => {                  // for each question...
      const answerContainer = answerContainers[questionNumber];                 // find selected answer
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      if (userAnswer === currentQuestion.correctAnswer) {                       // if answer is correct
        numCorrect++;                                                           // add to the number of correct answers

        answerContainers[questionNumber].style.color = "lightgreen";            // color the answers green
      } else {                                                                  // if answer is wrong or blank color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;  // show number of correct answers out of total
  }

  function showSlide(n) {
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
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
});

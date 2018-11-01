
document.addEventListener("DOMContentLoaded", function(){

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
    var output = [];
    res.results.forEach((currentQuestion, questionNumber) => {                  //For every question extract the correct answer and the incorrect answers
      var mergeAnswers = [];                                                    //and put them in an array.
      var answers = [];

      mergeAnswers.push(currentQuestion.correct_answer);
      for (var j=0; j<currentQuestion.incorrect_answers.length; j++) {
        mergeAnswers.push(currentQuestion.incorrect_answers[j]);
      }
      mergeAnswers.sort();                                                      //Put the correct answer in different positions
      for (letter in mergeAnswers) {                                            //Make HTML of the questions and add radio buttons
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${mergeAnswers[letter]}">
              ${mergeAnswers[letter]}
           </label>`
        );
      };

      output.push(                                                              //Make HTML structure with questions and answers
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    quizContainer.innerHTML = output.join("");                                  //Add HTML to assigned container
  };

  function showResults() {                                                      //Function to be called by the submit button
    var slides = document.querySelectorAll(".slide");                           //Show the final score and remove all the buttons
    slides[currentSlide].classList.remove("active-slide");
    slides[0].classList.add("last-slide");
    currentSlide = 0;
    submitButton.style.display = "none";
    resultsContainer.innerHTML = `${numCorrect} out of ${res.results.length}`;
  };

  function showSlide(n) {                                                       //Function that shows a single question at a time by adding
    var slides = document.querySelectorAll(".slide");                           //and removing the class "active-slide" and showing/hiding the buttons.
    var nextButton = document.getElementById("next");

    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;

    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }

    var inputs=document.querySelectorAll("input[type=radio]"),                 //Add eventlistener to all radio buttons to trigger the function checkAnswer
    x=inputs.length;
    while(x--)
      inputs[x].addEventListener("click", checkAnswer);
    };

  function showNextSlide() {                                                   //Function called by "next button" to change question.
    showSlide(currentSlide + 1);                                               //The function calls previous function and adds a slide in it
    quizContainer.style.color = "black";
  };

  function checkAnswer() {                                                      //Function that checks if the checked radio button is the correct answer
    var correctAnswers = [];                                                    //Put all the correct answers in an array
    res.results.forEach((currentQuestion) => {
      correctAnswers.push(currentQuestion.correct_answer);
    });

    var answerContainer = document.querySelectorAll('input[type="radio"]:checked');   //Find the checked radio buttons and extract their value
    var userAnswer = (answerContainer[p].value);

    var theAnswer = correctAnswers.includes(userAnswer);                         //Check if chosen answer is in the array with correct answers

    if (theAnswer) {                                                            //If the answer is correct the color of the answers turns green
      numCorrect++;                                                             //if not it turns red
      changeColor[p].style.color = "lightgreen";
      p++;
    } else {
      changeColor[p].style.color = "red";
      p++;
    }
  };

  var res;
  var p = 0;
  var numCorrect = 0;
  var currentSlide = 0;

  var quizContainer = document.getElementById("quiz");
  var resultsContainer = document.getElementById("results");
  var submitButton = document.getElementById("submit");
  var nextButton = document.getElementById("next");
  var changeColor = document.getElementsByClassName("answers");
  submitButton.addEventListener("click", showResults);
  nextButton.addEventListener("click", showNextSlide);
});

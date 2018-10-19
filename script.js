var res;

document.addEventListener('DOMContentLoaded', function (){

  var req = new XMLHttpRequest();

  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      if (req.status == 200) {
        console.log(req.response);
        res = req.response;

        res.forEach(function(res) {

          let questionForm = document.createElement("form");
          question.classList.add("questionForm");
          //question.id = index;
          quesContainer.appendChild(questionForm);

          var tableContent = `
            <input type="radio" name="gender" value="male" checked> Male<br>
            <input type="radio" name="gender" value="female"> Female<br>
            <input type="radio" name="gender" value="other"> Other<br><br>
            <input type="submit">

          `;
          document.getElementById(theUser.id).innerHTML = questionForm;
        });
      }
    }
  };

    req.open("GET", "https://opentdb.com/api.php?amount=10&category=11&difficulty=medium&type=multiple");
    req.responseType = 'json';
    req.send();
});

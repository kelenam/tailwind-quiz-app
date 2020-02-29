const question_title_elem = document.getElementById("title");
const answers_elem = document.getElementById("answers");
const submit_btn = document.getElementById("submit_btn");
const next_btn = document.getElementById("next_btn");
const score_span = document.getElementById("score");
const question_elem = document.querySelector(".question");
const score_elem = document.querySelector(".score");
let questions,
  questionCount,
  currentQuestion,
  score = 0;

// GHPages static hosting likely preventing from making external calls
// Creating a mock- 
//
// function getQuestions() {
//   const request = new XMLHttpRequest();
//   request.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       questions = JSON.parse(this.responseText).questions;
//       questionsCount = questions.length;
//       currentQuestion = 0;
//     }
//   };
//   request.open("GET", "../api/questions.json", false);
//   request.send();
// }

function mockGetQuestions() {
  questions = {
    "questions": [
      {
        "id": "0",
        "title": "Did you use TailwindCSS for this project?",
        "answers": [
          {
            "id": "0",
            "answer": "Yes"
          },
          {
            "id": "1",
            "answer": "No"
          }
        ],
        "correct": "0"
      },
      {
        "id": "1",
        "title": "XML stands for?",
        "answers": [
          {
            "id": "0",
            "answer": "Xenophobic Mall Lizards"
          },
          {
            "id": "1",
            "answer": "Xenomorphs Making Lasagna"
          },
          {
            "id": "2",
            "answer": "eXtensible Markup Language"
          }
        ],
        "correct": "2"
      },
      {
        "id": "3",
        "title": "Which of the following are a few things that you can do with fetch and not with XHR?",
        "answers": [
          {
            "id": "0",
            "answer": "You can use the Cache API with the request and response objects"
          },
          {
            "id": "1",
            "answer": "You can perform no-cors requests, getting a response from a server that doesn't implement CORS. You can't access the response body directly from JavaScript, but you can use it with other APIs (e.g. the Cache API);"
          },
          {
            "id": "2",
            "answer": "Streaming responses (with XHR the entire response is buffered in memory, with fetch you will be able to access the low-level stream). This isn't available yet in all browsers, but will be soon."
          },
          {
            "id": "3",
            "answer": "All of the above"
          }
        ],
        "correct": "3"
      },
      {
        "id": "4",
        "title": "Should XMLHttpRequest.onreadystatechange be used with synchronous requests?",
        "answers": [
          {
            "id": "0",
            "answer": "Definitely not"
          },
          {
            "id": "1",
            "answer": "Definitely not"
          },
          {
            "id": "2",
            "answer": "Definitely not"
          },
          {
            "id": "3",
            "answer": "Definitely not, but we'll use it anyway!"
          }
        ],
        "correct": "3"
      }
    ]
  }.questions;      
  questionsCount = questions.length;
  currentQuestion = 0;
} 

function displayQuestion(question) {
  question_title_elem.innerHTML = "";
  answers_elem.innerHTML = "";

  const question_title = document.createTextNode(question.title);
  question_title_elem.appendChild(question_title);

  question.answers.forEach(answer => {
    const label = document.createElement("label");

    const answer_input = document.createElement("input");

    answer_input.setAttribute("type", "radio");
    answer_input.setAttribute("name", "answer");
    answer_input.setAttribute("value", answer.id);
    answer_input.classList.add("answer", "m-1");

    const answer_title = document.createTextNode(answer.answer);
    label.appendChild(answer_input);
    label.appendChild(answer_title);
    label.classList.add("p-2", "m-1", "rounded-lg", "bg-gray-400");

    answers_elem.appendChild(label);

    answer_input.addEventListener("click", () => {
      submit_btn.classList.add(
        "bg-green-600",
        "hover:bg-green-400",
        "cursor-pointer"
      );
      submit_btn.classList.remove("pointer-events-none");
    });
  });
}

function supplantElement(toHide, toShow) {
  toHide.classList.add("hidden");
  toShow.classList.remove("hidden");
}

/************ Initialize ***********/
//getQuestions();
mockGetQuestions();
displayQuestion(questions[currentQuestion]);

/************ Event Listeners ***********/

submit_btn.addEventListener("click", () => {
  const [...answers] = document.getElementsByClassName("answer");
  const question = questions[currentQuestion];

  answers.forEach(answer => {
    answer.disabled = true;
    if (!answer.checked) {
      return;
    } else if (answer.checked && question.correct === answer.value) {
      answer.parentElement.classList.add("correct", "bg-green-300");
      score++;
    } else if (answer.checked && answer.value !== question.correct) {
      answer.parentElement.classList.add("incorrect", "bg-red-300");
    }
    supplantElement(submit_btn, next_btn);
    currentQuestion += 1;
    submit_btn.classList.remove(
      "bg-green-600",
      "hover:bg-green-400",
      "cursor-pointer"
    );
    submit_btn.classList.add("pointer-events-none");
  });
});

next_btn.addEventListener("click", () => {
  if (currentQuestion >= questionsCount) {
    score_span.innerHTML = `${score}/${questionsCount}`;
    supplantElement(question_elem, score_elem);
    return;
  } else {
    displayQuestion(questions[currentQuestion]);
    supplantElement(next_btn, submit_btn);
  }
});

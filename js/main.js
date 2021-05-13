"use strict";
let form = document.forms.todoapp;

let taskNameInput = form.elements.nameTask;
let deskInput = form.elements.descTask;
let dateTask = form.elements.dateTask;
const addParticipantBtn = form.elements.addParticipant;
const participantInputs = document.querySelector(".participant-inputs");
let sumbitBtn = form.querySelector('[type="submit"]');

const tasks = [];
initLocalStorage();

function initLocalStorage() {
  if (localStorage.getItem("tasks") !== null) {
    const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));
    if (Array.isArray(tasksLocalStorage)) {
      tasks.push(...tasksLocalStorage);
    }
  } else {
    localStorage.setItem("tasks", JSON.stringify([]));
  }
}

form.addEventListener("submit", submitForm);
function submitForm(event) {
  event.preventDefault();

  const participantInputs = Array.from(
    form.querySelectorAll(".participant-input")
  );

  const arrValueParticipantInputs = participantInputs
    .map((item) => item.value)
    .filter((item) => item.length !== 0);

	const arrIdTasks = tasks.map(item => item.id);
	const unicalId = generateUnicalId(arrIdTasks);

  const task = {
    title: taskNameInput.value,
    description: deskInput.value,
    date: dateTask.value,
    participants: arrValueParticipantInputs,
		id: unicalId
  };

  tasks.push(task);
  console.log(tasks);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function generateUnicalId(arrId) {
  if (!Array.isArray(arrId)) return false;
	if (arrId.length === 0) return 0;
	const arrIdSort = arrId.slice().sort((a, b) => a - b);
	for (let i = 0; i < arrIdSort.length; i++) {
		if (arrIdSort[i] !== i) {
			return i;
		}
	}
	return arrIdSort.length;
}

// let tasksToArr = JSON.parse(localStorage.getItem("tasks"));
// console.log(tasksToArr);
// for (let todo in tasksToArr) {
//   document.write(JSON.stringify(tasksToArr[todo]));
// }

function generateInputParticipant(domContainer) {
  const InputParticipantContainer = document.createElement("div");
  InputParticipantContainer.classList.add("participant-inputs__item");

  const inputText = document.createElement("input");
  inputText.type = "text";
  inputText.placeholder = "Введите имя участника";
  inputText.classList.add("participant-input");

  const inputButton = document.createElement("input");
  inputButton.type = "button";
  inputButton.value = "X";

  inputButton.addEventListener("click", (e) => {
    InputParticipantContainer.remove();
  });

  InputParticipantContainer.append(inputText);
  InputParticipantContainer.append(inputButton);

  domContainer.append(InputParticipantContainer);
}

addParticipantBtn.addEventListener("click", (e) => {
  generateInputParticipant(participantInputs);
});

document.getElementById("butt").addEventListener("click", message);

function message(){
document.getElementById("message").innerHTML = 'Задача успешно добавлена';
}

// let sumbitBtn = form.querySelector('[type="submit"]')
// sumbitBtn.addEventListener('click', message)
// function message(event){
// 	console.log('Задача успешно добавлена');
// }
// generateInputParticipant(participantInputs);

"use strict";
const form = document.forms.todoapp;

const taskNameInput = form.elements.nameTask;
const deskInput = form.elements.descTask;
const dateTask = form.elements.dateTask;
const addParticipantBtn = form.elements.addParticipant;
const participantInputs = document.querySelector(".participant-inputs");
const sumbitBtn = form.querySelector('#butt');
const messageSuccessDom = document.getElementById("message");

const tasks = [];
initLocalStorage();
initFormDate();

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

function initFormDate() {
  console.log(convertDateIso(new Date()));
  dateTask.min = convertDateIso(new Date());
}

form.addEventListener("submit", submitForm);
function submitForm(event) {
  event.preventDefault(); // отменяем действие браузера по умолчанию

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

  localStorage.setItem("tasks", JSON.stringify(tasks));

  messageSuccessDom.innerText = 'Задача успешно добавлена';
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

function convertDate(date) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  return [
    pad(date.getFullYear()),
    pad(date.getMonth()+1),
    pad(date.getDate()),
  ].join('-');
  // return [pad(date.getDate()), pad(date.getMonth()+1), pad(date.getFullYear())].join('-');
}

function convertDateIso(date) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  const dateLeft = [
    pad(date.getFullYear()),
    pad(date.getMonth()+1),
    pad(date.getDate()),
  ].join('-');
  return `${dateLeft}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

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

// let sumbitBtn = form.querySelector('[type="submit"]')
// sumbitBtn.addEventListener('click', message)
// function message(event){
// 	console.log('Задача успешно добавлена');
// }
// generateInputParticipant(participantInputs);

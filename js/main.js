"use strict";
let form = document.forms.todoapp;

let taskNameInput = form.elements.nameTask;
let deskInput = form.elements.descTask;
let dateTask = form.elements.dateTask;
const addParticipantBtn = form.elements.addParticipant;
const participantInputs = document.querySelector('.participant-inputs');
let sumbitBtn = form.querySelector('[type="submit"]');

const tasks = [];
initLocalStorage();

function initLocalStorage() {
	if (localStorage.getItem('tasks') !== null) {
		const tasksLocalStorage = JSON.parse(localStorage.getItem('tasks'));
		if (Array.isArray(tasksLocalStorage)) {
			tasks.push(...tasksLocalStorage);
		}
	};
}

form.addEventListener("submit", submitForm);
function submitForm(event) {

	const participantInputs = Array.from(form.querySelectorAll('.participant-input'));
	let arrValueParticipantInputs = participantInputs.map(item => item.value).filter(item => item.length !== 0);

  const task = {
    title: taskNameInput.value,
    description: deskInput.value,
    date: dateTask.value,
	participants: arrValueParticipantInputs
  };

	tasks.push(task);
  console.log(tasks);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// let tasksToArr = JSON.parse(localStorage.getItem("tasks"));
// console.log(tasksToArr);
// for (let todo in tasksToArr) {
//   document.write(JSON.stringify(tasksToArr[todo]));
// }

function generateInputParticipant(domContainer) {
	const InputParticipantContainer = document.createElement('div');
	InputParticipantContainer.classList.add('participant-inputs__item');

	const inputText = document.createElement('input');
	inputText.type = 'text';
	inputText.placeholder = 'Введите имя участника';
	inputText.classList.add('participant-input');

	const inputButton = document.createElement('input');
	inputButton.type = 'button';
	inputButton.value = 'X';

	inputButton.addEventListener('click', (e) => {
		InputParticipantContainer.remove();
	});

	InputParticipantContainer.append(inputText);
	InputParticipantContainer.append(inputButton);

	domContainer.append(InputParticipantContainer);
}



addParticipantBtn.addEventListener('click', (e) => {
	generateInputParticipant(participantInputs);
});

// let sumbitBtn = form.querySelector('[type="submit"]')
// sumbitBtn.addEventListener('click', message)
// function message(event){
// 	console.log('Добавлено');
// }
// generateInputParticipant(participantInputs);
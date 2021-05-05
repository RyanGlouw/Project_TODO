"use strict"
let form = document.forms.todoapp;

let taskNameInput = form.elements.nameTask;
let deskInput = form.elements.descTask;
let dateTask = form.elements.dateTask;

let tasks = [];

form.addEventListener("submit", submitForm);
function submitForm(event) {
    event.preventDefault();

    let task = {
        title: taskNameInput.value,
        description: deskInput.value,
        date: dateTask.value
    };

    tasks = JSON.parse(localStorage.getItem(task));
    if (!tasks) tasks = [];

    localStorage.setItem("tasks", JSON.stringify(task));
    tasks.push(task);
    console.log(tasks);
}


let tasksToArr = JSON.parse(localStorage.getItem("tasks"));
console.log(tasksToArr);
for (let todo in tasksToArr){
    document.write(tasksToArr[todo]);
}



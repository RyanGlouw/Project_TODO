"use strict"
let form = document.forms.todoapp;

let taskNameInput = form.elements.nameTask;
let deskInput = form.elements.descTask;
let dateTask = form.elements.dateTask;

form.addEventListener("submit", submitForm);
function submitForm(event) {
    event.preventDefault();
    //console.log(taskNameInput.value);
    //console.log(deskInput = form.elements.descTask.value);
    //console.log(dateTask = form.elements.dateTask.value);

    let task = {
        title: taskNameInput.value,
        description: deskInput.value,
        date: dateTask.value
    };
    
    console.log(task);
    let tasks = localStorage.getItem("tasks");
    if (!tasks) {
        tasks = [];
    }
    tasks.push(task);

}

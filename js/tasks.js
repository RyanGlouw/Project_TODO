const list = document.querySelector('ul');
const deleteTaskBtn = document.querySelector('.deleteTasks');
let tasksActive = [];

function initLocalStorage() {
    if (localStorage.getItem("tasks") !== null) {
        const tasksToArr = JSON.parse(localStorage.getItem("tasks"));
        if (Array.isArray(tasksToArr)) {
            printTasks(tasksToArr, list);
        }
    }
}

function printTasks(tasks, container) {
    for (let i = 0; i < tasks.length; i++) {
        const taskObj = tasks[i];
        const taskDom = generateTaskDom(taskObj, i);
        container.append(taskDom);
    }
}

function generateTaskDom(task, id) {
    const domTask = document.createElement('div');
    domTask.classList.add('task');
    domTask.innerHTML = `
        <p class="task__title">${task.title}</p>
        <p class="task__description">${task.description}</p>
        <p class="task__date">${task.date}</p>
    `;
    domTask.setAttribute('data-id', id);

    if (task.participants.length !== 0) {

        const taskParticipantsDom = document.createElement('div');
        taskParticipantsDom.classList.add('task__participants');
        
        for (const participant of task.participants) {
            taskParticipantsDom.innerHTML += `<div class="task__participants-item">${participant}</div>`;
        }
        domTask.append(taskParticipantsDom);
    }

    domTask.addEventListener('click', (e) => {
        const dataId = Number(domTask.getAttribute('data-id'));

        if (domTask.classList.contains('active')) {
            const idFindRemoveId = tasksActive.find(item => item === dataId);
            if (idFindRemoveId !== undefined) {
                const idxRemoveId = tasksActive.findIndex(item => item === dataId);
                if (idxRemoveId !== -1) {
                    tasksActive.splice(idxRemoveId, 1);
                    console.log(tasksActive);
                }
            }
            domTask.classList.remove('active');
        } else {
            tasksActive.push(dataId);
            domTask.classList.add('active');
            const unicalIds = [...new Set([...tasksActive])];
            tasksActive = unicalIds;
            console.log(tasksActive);
        }

    });

    return domTask;
}

function deleteTasks(tasksActive, container) {

    if (localStorage.getItem("tasks") !== null) {
        const tasksToArr = JSON.parse(localStorage.getItem("tasks"));
        if (Array.isArray(tasksToArr)) {
            console.log(tasksActive, 'tasksActive');
            console.log(tasksToArr, 'tasksToArr');
            for (let i = 0; i < tasksActive.length; i++) {
                const taskId = tasksActive[i];
                if (tasksToArr[taskId] !== undefined) {
                    console.log(i);
                    tasksToArr.splice(taskId, 1);
                    i--;
                }
            }
            console.log(tasksToArr, 'tasksToArr delete');
            // localStorage.setItem('tasks', JSON.stringify(tasksToArr));
        }
    }

    const tasksActiveDom = tasksActive.map(item => {
        return container.querySelector(`.task[data-id="${item}"]`);
    });

    console.log(tasksActive, "tasksActive");
    console.log(tasksActiveDom);

    for (const taskActiveDom of tasksActiveDom) {
        taskActiveDom.remove();
    }

    tasksActive = [];
    console.log(tasksActive, "tasksActive []");
}

initLocalStorage();

deleteTaskBtn.addEventListener('click', (e) => {
    deleteTasks(tasksActive, list);
});

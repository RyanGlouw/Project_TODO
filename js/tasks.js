const list = document.querySelector("ul");
const deleteTaskBtn = document.querySelector(".deleteTasks");
let tasksActive = [];

function initLocalStorage() {
  if (localStorage.getItem("tasks") !== null) {
    const tasksToArr = JSON.parse(localStorage.getItem("tasks"));
    if (Array.isArray(tasksToArr)) {
      printTasks(tasksToArr, list);
    }
  } else {
    localStorage.setItem("tasks", JSON.stringify([]));
  }
}

function printTasks(tasks, container) {
  const copyTasks = JSON.parse(JSON.stringify(tasks));
  const copyTasksSort = copyTasks.slice()
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  console.log(tasks, 'tasks');
  console.log(copyTasksSort, 'copyTasksSort');

  for (const taskObj of copyTasksSort) {
    const taskDom = generateTaskDom(taskObj);
    container.append(taskDom);
  }
}

function generateTaskDom(task) {
  const domTask = document.createElement("div");
  domTask.classList.add("task");
  domTask.innerHTML = `
        <p class="task__title">${task.title}</p>
        <p class="task__description">${task.description}</p>
        <p class="task__date">${convertDate(new Date(task.date))}</p>
    `;
  domTask.setAttribute("data-id", task.id);

  if (task.participants.length !== 0) {
    const taskParticipantsDom = document.createElement("div");
    taskParticipantsDom.classList.add("task__participants");

    for (const participant of task.participants) {
      taskParticipantsDom.innerHTML += `<div class="task__participants-item">${participant}</div>`;
    }
    domTask.append(taskParticipantsDom);
  }

  domTask.addEventListener("click", (e) => {

    if (domTask.classList.contains("active")) {
      const idFindRemoveId = tasksActive.find((item) => item === task.id);
      if (idFindRemoveId !== undefined) {
        const idxRemoveId = tasksActive.findIndex((item) => item === task.id);
        if (idxRemoveId !== -1) {
          tasksActive.splice(idxRemoveId, 1);
        }
      }
      domTask.classList.remove("active");
    } else {
      tasksActive.push(task.id);
      domTask.classList.add("active");
      const unicalIds = [...new Set([...tasksActive])];
      tasksActive = unicalIds;
    }
		
  });

  return domTask;
}

function deleteTasks(container) {
  if (localStorage.getItem("tasks") !== null) {
    const tasksToArr = JSON.parse(localStorage.getItem("tasks"));
    if (Array.isArray(tasksToArr)) {
      console.log(tasksActive, "tasksActive");
      console.log(...tasksToArr, "tasksToArr");
      for (let i = 0; i < tasksActive.length; i++) {
        const taskId = tasksActive[i];
				const idxTask = tasksToArr.findIndex(item => item.id === taskId);
				if (idxTask !== -1) {
					tasksToArr.splice(idxTask, 1);
				}
      }
      console.log(tasksToArr, "tasksToArr delete");
      localStorage.setItem('tasks', JSON.stringify(tasksToArr));
    }
  }

  const tasksActiveDom = tasksActive.map((item) => {
    return container.querySelector(`.task[data-id="${item}"]`);
  });

  for (const taskActiveDom of tasksActiveDom) {
    taskActiveDom.remove();
  }

  tasksActive = [];
}

function convertDate(date) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  const dateLeft = [
    pad(date.getDate()),
    pad(date.getMonth()+1),
    pad(date.getFullYear())
  ].join('-');
  return `${dateLeft} ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

initLocalStorage();

deleteTaskBtn.addEventListener("click", (e) => {
  deleteTasks(list);
});

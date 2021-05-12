
let tasksToArr = JSON.parse(localStorage.getItem("tasks"));
    console.log(tasksToArr);
    for (let todo in tasksToArr) {
    document.write(JSON.stringify(tasksToArr[todo]));
    document.write('</br>')
    }

let list = document.querySelector('ul');

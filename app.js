//Defnine UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task.btn.black');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


loadAllEvents();

function loadAllEvents() {
    document.addEventListener('DOMContentLoaded', loadLSTasks);

    form.addEventListener('submit', addTask);

    taskList.addEventListener('click', removeTask);

    clearBtn.addEventListener('click', removeAllTasks);

    filter.addEventListener('keyup', filterTasks);

}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Please enter a task to add');
    } else {
        //creating an li element
        const li = document.createElement('li');
        //add class collection-item because of materialize
        li.className = 'collection-item';
        //add textnode as an child to li element
        li.appendChild(document.createTextNode(taskInput.value));
        //add a link to task
        const link = document.createElement('a');
        //add class to the link
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);
        //add li to taskList
        taskList.appendChild(li);
        //store the task in Local Storage
        storeInLS(taskInput.value);
        //make input clear again
        taskInput.value = '';
    }

    e.preventDefault();

}


function removeTask(e) {
    if (e.target.parentNode.classList.contains('delete-item')) {
        e.target.parentElement.parentElement.remove();
        removeTaskFromLS(e.target.parentElement.parentElement);
    }
    e.preventDefault();
}

function removeAllTasks(e) {
    while (taskList.firstChild) {
        taskList.removeChild(taskList.firstChild);
    }
    localStorage.clear();
    e.preventDefault();
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(
        function (task) {
            const a = task.firstChild.textContent;
            if (a.toLowerCase().indexOf(text) != -1) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        }
    )
    e.preventDefault();
}

function storeInLS(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadLSTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        //creating an li element
        const li = document.createElement('li');
        //add class collection-item because of materialize
        li.className = 'collection-item';
        //add textnode as an child to li element
        li.appendChild(document.createTextNode(task));
        //add a link to task
        const link = document.createElement('a');
        //add class to the link
        link.className = 'delete-item secondary-content';
        //add icon html
        link.innerHTML = '<i class = "fa fa-remove"></i>';
        //append the link to li
        li.appendChild(link);
        //add li to taskList
        taskList.appendChild(li);
    })
}

function removeTaskFromLS(taskList) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task, index) {
        if (taskList.textContent === task) {
            tasks.splice(index, 1)
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
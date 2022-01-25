const tasksUL = document.getElementById('tasksUL')
const titleText = document.getElementById('titleText')
const priorityText = document.getElementById('priorityText')
const dateText = document.getElementById('dateText')
const idText = document.getElementById('idText')
const addTaskButton = document.getElementById('addTaskButton')


addTaskButton.addEventListener('click', () => {

    const taskTitle = titleText.value
    const priority = priorityText.value
    const date = dateText.value
    const id = idText.value

    fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: taskTitle,
            priority: priority,
            dateCreated: date,
            id: id
        })
    }).then(response => response.json())
        .then(result => {
            console.log(result)

            getAllTasks((tasks) => {
                displayTasks(tasks)
            })

        })

})


function getAllTasks(completion) {

    fetch('http://localhost:5000/tasks')
        .then(response => response.json())
        .then(tasks => {
            completion(tasks)
    })
}

function displayTasks(tasks) {

    const taskItems = tasks.map(task => {
        return `<li>${task.title} - ${task.priority} - ${task.dateCreated}
                <button onclick="deleteTask()">Delete</button>
                <button>Edit</button>
                </li>`
    })

    tasksUL.innerHTML = taskItems.join('')
}

getAllTasks((tasks) => {
    displayTasks(tasks)
})

function deleteTask() {

}
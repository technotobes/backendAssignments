const express = require("express");
const cors = require("cors");

const app = express()

app.use(express.json()); 
app.use(cors());

app.listen(5000, function () {
    console.log("Server is running...");
  });

  // genereate id using array length
let tasks = [
    {taskId: 1, title: "Feed Cat", priority: "High", dateCreated: "1/24/2022"},
    {title: "Feed Dog", priority: "High", dateCreated: "1/24/2022"}
  ];

app.get("/" ,(req, res) => {
    res.send("Test")
})  

app.get("/tasks/", (req, res) => {
    res.json(tasks);
})

app.get('/tasks/:id', (req, res) => {
    const id = req.params.id
    console.log(id)
})

app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.taskId)
    const updatedTitle = req.body.title //updated title
    
    // find the movie object, which has the same taskId
    let task = tasks.find(task => task.taskId == taskId)
    console.log(task)
    res.send("Hello World")

    DeviceMotionEvent.name = updatedTitle
    console.log(tasks)
    res.json(movie)

})

app.delete('/tasks/:taskId', (req, res) => {
    const taskId = parseInt(req.params.taskId)

    tasks = tasks.filter(task => task.taskId != taskId) //ignoring/filter out the id to be deleted
    res.json({message: 'Movie has been deleted', success: true})
})

app.post("/tasks", (req, res) => {
    const title = req.body.title
    const priority = req.body.priority
    const dateCreated = req.body.dateCreated

    const task = {title: title, priority: priority, dateCreated: dateCreated, taskId: tasks.length + 1}
    tasks.push(task)
    res.json({message:"Task Created"})

})
const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
let tasks = [];
router.get("/tasks", (req, res) => {
    res.send(tasks);
});
router.get("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const task = tasks.find((task) => {
        return task.id == id;
    });
    res.send(task);
});
router.post("/tasks", (req, res) => {
    const todoId = uuidv4();
    tasks.push({ id: todoId, title: req.body.title, description: req.body.description, status: req.body.status, dueDate: req.body.dueDate });
    res.status(201).json({ success: true });
})
router.put("/tasks/:id", (req, res) => {
    const id = req.params.id;
    const keys = Object.keys(req.body);
    const task = tasks.find((task) => {
        return task.id == id;
    });

    keys.forEach((key) => {
        if (key in task) {
            task[key] = req.body[key];
        }
    })
    res.status(200).json({ message: "succesfully updated" });
});
router.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;
    //Id that we get from params is in string format and if we are directly comparing that id with original Numeric id then it won't give correct result.
    tasks = tasks.filter((task) => {
        return task.id !=id;
    })
    res.status(204).json({ success: true });
});
module.exports = router;


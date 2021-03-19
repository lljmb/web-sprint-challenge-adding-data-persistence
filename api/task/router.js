// build your `/api/tasks` router here
const router = require('express').Router()
const db = require('../../data/dbConfig')
const Tasks = require('./model')

router.get('/', (req, res) => {
    Tasks.getTasks()
        .then(tasks => {
            res.json(tasks)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

router.post('/', (req, res) => {
    Tasks.addTask(req.body)
        .then(task => {
            res.status(201).json(task)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

module.exports = router
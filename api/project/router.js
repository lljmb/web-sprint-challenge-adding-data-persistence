// build your `/api/projects` router here
const router = require('express').Router()

const Projects = require('./model')

// [GET] /api/projects
router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.json(projects)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

// [POST] /api/projects
router.post('/', (req, res) => {
    const projectData = req.body
    Projects.create(projectData)
        .then(project => {
            res.status(201).json(project)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

module.exports = router;
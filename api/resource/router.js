// build your `/api/resources` router here
const router = require('express').Router()
const db = require('../../data/dbConfig')
const Resources = require('./model')

// [GET] /api/resources
router.get('/', (req, res) => {
    db('resources')
        .then(resources => {
            res.json(resources)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

// [POST] /api/projects
router.post('/', (req, res) => {
    const resourceData = req.body

    Resources.create(resourceData)
        .then(newResource => { 
            res.status(201).json(newResource)
        })
        .catch(err => {
            res.status(500).json({message: err.message})
        })
})

module.exports = router
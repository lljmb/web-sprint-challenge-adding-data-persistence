// build your `Task` model here
const db = require("../../data/dbConfig")

const getTaskById = (id) => {
    return db('tasks')
        .where('task_id', id)
}

module.exports = {
    getTasks() {
        return db('tasks as t')
            .join('projects as p', 'p.project_id', 't.project_id')
            .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description')
    },

    addTask(task) {
        return db('tasks').insert(task)
        .then(id=> { 
            return getTaskById(id)
        })
    }
}
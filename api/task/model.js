// build your `Task` model here
const db = require("../../data/dbConfig")

const getTaskById = (id) => {
    const tasks = db('tasks')
        .where('task_id', id)
        .select('task_completed', 'task_description', 'task_notes')

        tasks.task_completed === 0 ? tasks.task_completed = false : tasks.task_completed = true;

    return tasks
 
}

module.exports = {
    getTasks() {
        const tasks = db('tasks as t')
            .join('projects as p', 'p.project_id', 't.project_id')
            .select('t.task_id', 't.task_description', 't.task_notes', 't.task_completed', 'p.project_name', 'p.project_description')

        const result = tasks.map(task => {
            if(task.task_completed === 1){
                return { 
                    ...task,
                    task_completed: true }
            } else {
                return {
                ...task,
                task_completed: false
                }
            }
        });   

        return result     
    },

    addTask(task) {
        return db('tasks')
        .insert(task)
        .then(id=> { 
            return getTaskById(id)
        })
    }
}
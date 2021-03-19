// build your `Project` model here
const db = require('../../data/dbConfig')

const getProjects = async () => {
        const projects = await db('projects')

        const result = projects.map(project => {
            if(project.project_completed === 1){
                return { 
                    ...project,
                    project_completed: true }
            } else {
                return {
                ...project,
                project_completed: false
                }
            }
        })

        return result
    }

const getProjectById = async (id) => {
    const project = await db('projects')
    .where('project_id', id)

    project.project_completed === 1 ? project.project_completed = false : project.project_completed = true;

    return project
}

const create = project => {
    return db('projects')
        .insert(project)
        .then(id => {
            return getProjectById(id[0])
        })
}

module.exports = { getProjects, create }
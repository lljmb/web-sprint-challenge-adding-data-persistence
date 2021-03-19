// build your `Resource` model here
const db = require('../../data/dbConfig');

const getById = id => {
    return db('resources')
        .where('resource_id', id);
};

const create = resource => {
    return db('resources')
        .insert(resource)
        .then(id => {
            return getById(id);
        });
};

module.exports = {
    create
}
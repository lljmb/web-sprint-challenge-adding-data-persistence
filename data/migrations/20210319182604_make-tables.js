
exports.up = function(knex) {
  return knex.schema
  //  A project is what needs to be done and is stored in a projects table
  .createTable('projects', tbl => {
      tbl.increments('project_id')
      tbl.string('project_name').notNullable()
      tbl.string('project_description')
      tbl.boolean('project_completed').defaultTo(false)
  })
  //  A resource is anything needed to complete a project and is stored in a resources table
  .createTable('resources', tbl => {
      tbl.increments('resource_id')
      tbl.string('resource_name').notNullable().unique()
      tbl.string('resource_description')
  })
  //  A task is one of the steps needed to complete a project and is stored in a tasks table
  .createTable('tasks', tbl => {
      tbl.increments('task_id')
      tbl.string('task_description').notNullable()
      tbl.string('task_notes')
      tbl.boolean('task_completed').defaultTo(false)
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
  })
  //  A resource assignment connects a resource and a project, and is stored in a project_resources table
  .createTable('project_resources', tbl => {
      tbl.increments('project_resource_id')
      tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('project_id')
        .inTable('projects')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
      tbl.integer('resource_id')
        .unsigned()
        .notNullable()
        .references('resource_id')
        .inTable('resources')
        .onDelete('RESTRICT')
        .onUpdate('RESTRICT')
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('project_resources')
  .dropTableIfExists('tasks')
  .dropTableIfExists('resources')
  .dropTableIfExists('projects')
};

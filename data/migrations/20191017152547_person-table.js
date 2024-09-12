exports.up = function(knex) {
    return knex.schema.createTable('person', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable().unique();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('person');
};
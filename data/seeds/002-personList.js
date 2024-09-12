exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('person').truncate()
        .then(function() {
            // Inserts seed entries
            return knex('person').insert([
                { name: 'kyle' },
                { name: 'bill' },
                { name: 'chiara' }
            ]);
        });
};
const db = require('../data/dbConfig.js');

module.exports = {
    add,
    remove,
    getAll,
    getById

};



function add(newPerson) {
    return db('person')
        .insert(newPerson, 'id')
        .then(([id]) => {
            return getById(id);
        });
};

function getById(id) {
    return db('person')
        .where({ id })
        .first()
}

function remove(id) {
    return db('person')
        .where({ id })
        .del();
}

function getAll() {
    return db('person');
}
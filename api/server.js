const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const Person = require('../persons/person-model.js'); //gets database from this file

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.status(200).json({ message: 'good to go' });
});
//the get all function
server.get('/api/persons', (req, res) => {
    Person.getAll()
        .then(persons => {
            console.table(persons);
            res.status(200).json(persons)
        })
        .catch(({ message }) => {
            res.status(500).json(message);
        });
});

server.post('/api/persons', (req, res) => {
    const newthing = req.body;

    Person.add(newthing)
        .then(newP => {
            console.log(newP)
            res.status(200).json(newP);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ Message: 'could not add person' });
        });
});

server.get('/api/persons/:id', (req, res) => {
    const id = req.params.id;

    Person.getById(id)
        .then(theP => {
            res.status(200).json(theP);
        })
        .catch(error => {
            res.status(500).json(error)
        });
});

server.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id;
    Person.remove(id)
        .then(bye => {
            res.status(200).json({ message: 'they gone' });
        })
        .catch(error => {
            res.status(500).json(error);
        })
})




module.exports = server;
const express = require('express');
const users = require('../models/users');

const app = express.Router();

app
    .get('/', (req, res, next) => {
        users.getUsers()
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .get('/:name', (req, res, next) => {
        users.getUser(req.param.id)
        .then(product=> {
            if (product) {
                res.status(200).send(product);
            } else {
                res.status(404).send('User not found');
            }
        })
        .catch(next);
    })
    .post('/', (req, res, next) => {
        users.addUser(req.body)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .patch('/:email', (req, res, next) => {
        users.updateUser(req.params.id, req.body)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .delete('/:email', (req, res, next) => {
        users.deleteUser(req.params.id)
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
    .post('/seed', (req, res, next) => {
        users.seed()
        .then(x=> res.status(200).send(x))
        .catch(next);
    })
;

module.exports = app;
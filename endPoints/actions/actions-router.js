const express = require('express');
const Actions = require('../../data/helpers/actionModel');

const router = express.Router();

// GET      >>>     Working
router.get('/', (req, res) => {
    Actions.get(req.query)
    .then(actions => {
        res.status(200)
            .json(actions)
    })
    .catch(err => {
        console.log('error message', err)
        res.status(500)
            .json({ message: 'error message' })
    })
});

// GET      >>>     Working
router.get('/:id', (req, res) => {
    Actions.get(req.params.id)
    .then(action => {
        if (action) {
            res.status(200)
                .json(action)
        } else {
            res.status(404)
                .json({ message: 'The action with the specified ID does not exist' })
        }
    })
    .catch(err => {
        console.log('error message', err)
        res.status(500)
            .json({ message: 'error message' })
    })
});

// POST      >>>     Working
router.post('/', (req, res) => {
    Actions.insert(req.body)
    .then(action => {
        if (action) {
            res.status(201)
                .json(action)
        } else {
            res.status(400)
                .json({ message: 'Please provide required information for the action' })
        }
    })
    .catch(err => {
        console.log('error message', err)
        res.status(500)
            .json({ message: 'error message' })
    })
});

// PUT      >>>     Working
router.put('/:id', (req, res) => {
    const changes = req.body
    const text = req.body
    if (text) {
        Actions.update(req.params.id, changes)
        .then(action => {
            if (action) {
                res.status(200)
                    .json(action)
            } else {
                res.status(404)
                    .json({ message: 'The action with the specified ID does not exist' })
            }
        })
        .catch(err => {
            console.log('error message', err)
            res.status(500)
                .json({ message: 'The action information could not be entered' })
        })
    } else {
        res.status(400)
            .json({ message: 'Please provide information for the aciton' })
    }
});

// DELETE      >>>     Working
router.delete('/:id', (req, res) => {
    Actions.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200)
                .json({ message: 'The action was successfully removed' })
        } else {
            res.status(404)
                .json({ message: 'The action with the specified ID does not exist' })
        }
    })
    .catch(err => {
        console.log('error message', err)
        res.status(500)
            .json({ message: 'The action could not be deleted' })
    })
});

module.exports = router;
const express = require('express');
const Projects = require('../../data/helpers/projectModel');

const router = express.Router();

// GET      >>>     Test&Fix
router.get('/', (req, res) => {
    Projects.get(req.query)
    .then(projects => {
        res.status(200)
            .json(projects)
    })
    .catch(err => {
        console.log('error message', err)
        res.status(500)
            .json({ message: 'error message' })
    })
});

// GET      >>>     Working
router.get('/:id', (req, res) => {
    Projects.get(req.params.id)
    .then(project => {
        if (project) {
            res.status(200)
                .json(project)
        } else {
            res.status(404)
                .json({ message: 'The project with the specified ID does not exist' })
        }
    })
    .catch(err => {
        console.log('error message', err)
        res.status(500)
            .json({ message: 'error message' })
    })
});

// GET-sub action      >>>     Working
router.get('/:id/actions', (req, res) => {
    Projects.getProjectActions(req.params.id)
    .then(actions => {
        if (actions) {
            res.status(200)
                .json(actions)
        } else {
            res.status(404)
                .json({ message: 'The project with the specified ID does not exist' })
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
    Projects.insert(req.body)
    .then(project => {
        if (project) {
            res.status(201)
                .json(project)
        } else {
            res.status(400)
                .json({ message: 'Please provide required information for the project' })
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
        Projects.update(req.params.id, changes)
        .then(project => {
            if (project) {
                res.status(200)
                    .json(project)
            } else {
                res.status(404)
                    .json({ message: 'The project with the specified ID does not exist' })
            }
        })
        .catch(err => {
            console.log('error message', err)
            res.status(500)
                .json({ message: 'The project information could not be entered' })
        })
    } else {
        res.status(400)
            .json({ message: 'Please provide information for the aciton' })
    }
});

// DELETE      >>>     Working
router.delete('/:id', (req, res) => {
    Projects.remove(req.params.id)
    .then(count => {
        if (count > 0) {
            res.status(200)
                .json({ message: 'The project was successfully removed' })
        } else {
            res.status(404)
                .json({ message: 'The project with the specified ID does not exist' })
        }
    })
    .catch(err => {
        console.log('error message', err)
        res.status(500)
            .json({ message: 'The project could not be deleted' })
    })
});

module.exports = router;
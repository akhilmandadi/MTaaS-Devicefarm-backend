const express = require('express');
const router = express.Router();
const projects = require('../services/projects')

router.post('/projects/:id', projects.createProject)
router.get('/projects/:id', projects.getProjects)
router.get('/project/:id', projects.getProjectInfo)

router.get('/project/:id/testers',projects.getTestersOfAProject);
router.put('/project/:id/testers',projects.updateTestersForAProject);
router.delete('/project/:id/testers',projects.deleteTestersForAProject);
module.exports = router;

const express = require('express');
const router = express.Router();
const projects  = require('../services/projects')

router.get('/projects', projects.getProjects);

module.exports = router;

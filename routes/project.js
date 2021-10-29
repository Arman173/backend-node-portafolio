'use strict'
const express = require('express');
const ProjectController = require('../controllers/project');

const router = express.Router();

const multipart = require('connect-multiparty');
const multipartMiddleware = multipart({ uploadDir: './uploads' });

router.get('/home', ProjectController.home);
router.post('/test', ProjectController.test);
router.post('/save-project', ProjectController.saveProyect);
router.get('/project/:id?', ProjectController.getProyect);
router.get('/projects', ProjectController.getProjects);
// el metodo put sirve para actualizar datos
router.put('/project/:id', ProjectController.updateProject);
router.delete('/project/:id', ProjectController.deleteProject);
router.post('/upload-image/:id', multipartMiddleware, ProjectController.uploadImage);

module.exports = router;

'use strict'

const Project = require('../models/project');
const fs = require('fs');
const path = require('path');

const controller = {
    home: ( req, res ) => {
        return res.status(200).send({
            message: 'Soy la home'
        });
    },
    test: ( req, res ) => {
        return res.status(200).send({
            message: 'Soy el metodo o accion test del controlador de project'
        });
    },
    saveProyect: ( req, res ) => {
        let project = new Project();

        const params = req.body;
        project.name = params.name;
        project.description = params.description;
        project.category = params.category;
        project.year = params.year;
        project.langs = params.langs;
        project.image = null;

        project.save( ( err, proyectStored ) => {
            if( err ) return res.status(500).send({ message: 'Error al guardar el documento.' });

            if( !proyectStored ) return res.status(404).send({ message: 'No se ha podido guardar el proyecto.' });

            return res.status(200).send({ project: proyectStored });
        });

    },
    getProyect: ( req, res ) => {
        const projectId = req.params.id;

        if( projectId == null ) return res.status(404).send({ message: 'El proyecto no exite.' });
        
        Project.findById( projectId, ( err, project ) =>{
            
            if( err ) return res.status(500).send({ message: 'Error al devolver los datos.' });

            if( !project ) return res.status(404).send({ message: 'El proyecto no existe.' });

            return res.status(200).send({
                project
            });

        });
    },
    getProjects: ( req, res ) => {
        // en sort('-year') estamos pidiendo que se ordenen por el año del proyecto de mayor a menor
        Project.find({}).sort('-year').exec( ( err, projects ) => {
            if( err ) return res.status(500).send({ message: 'Error al devolver los datos.' });

            if( !projects ) return res.status(404).send({ message: 'No hay proyectos para mostrar.' });
            
            return res.status(200).send({ projects });
        });

    },
    updateProject: ( req, res ) => {
        const projectId = req.params.id;
        const update = req.body;

        Project.findByIdAndUpdate(projectId, update, {new: true}, ( err, projectUpdated ) => {
            if( err ) return res.status(500).send({ message: 'Error al actualizar.' });

            if( !projectUpdated ) return res.status(404).send({ message: 'No se ha podido encontrar/actualizar el proyecto' });

            return res.status(200).send({
                project: projectUpdated
            });
        });
    },
    deleteProject: ( req, res ) => {
        const projectId = req.params.id;

        Project.findByIdAndRemove(projectId, ( err, projectDeleted ) => {
            if( err ) return res.status(500).send({ message: 'No se a podido borrar el proyecto.' });

            if( !projectDeleted ) return res.status(404).send({ message: 'No se puede eliminar ese proyecto.' });

            return res.status(200).send({
                project: projectDeleted
            });
        })
    },
    uploadImage: ( req, res ) => {
        const projectId = req.params.id;
        const fileName = 'Imagen no subida...';

        if( req.file ) {
            const filePath = req.file.path;
            const fileSplit = filePath.split('/');
            const fileName = fileSplit[1];
            const extSplit = fileName.split('.');
            const fileExt = extSplit[1];

            if( fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif' ) {

                Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, ( err, projectUpdated ) => {
                    if( err ) return res.status(500).send({ message: 'La imagen no se ha subido' });

                    if( !projectUpdated ) return res.status(404).send({ message: 'El proyecto no existe.' });

                    return res.status(200).send({
                        project: projectUpdated
                    });
                });

            } else {
                fs.unlink( filePath, ( err ) => {
                    return res.status(200).send({ message: 'La extension no es valida.' })
                });
            }

        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },
    getImageFile: ( req, res ) => {
        let file = req.params.image;
        let path_file = './uploads/' + file;

        fs.exists(path_file, exists => {
            if( exists ) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: 'No existe la imagen...'
                });
            }
        });
    }
};

module.exports = controller;

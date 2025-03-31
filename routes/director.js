const { Router } = require("express");
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear un nuevo director
router.post('/', [
    check('name', 'invalid.name').notEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        next();
    }
], async (req, res) => {
    try {
        let director = new Director({
            name: req.body.name,
            state: req.body.state
        });

        await director.save();
        res.send(director);  
    } catch (error) {  
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener todos los directores
router.get('/', async (req, res) => {
    try {
        const directores = await Director.find();
        res.send(directores);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Actualizar un director existente
router.put('/:directorId', [
    check('name', 'invalid.name').notEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        next();
    }
], async (req, res) => {
    try {
        const { directorId } = req.params;
        let director = await Director.findById(directorId);

        if (!director) {
            return res.status(404).send('Director no encontrado');
        }

        // Actualizar datos
        director.name = req.body.name;
        director.state = req.body.state;

        await director.save();
        res.send(director);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;


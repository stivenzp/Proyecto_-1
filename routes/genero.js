const { Router } = require("express");
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear un nuevo género
router.post('/', [
    check('name', 'invalid.name').notEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('description', 'invalid.description').optional().isString(),
    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        next();
    }
], async (req, res) => {
    try {
        let genero = new Genero({
            name: req.body.name,
            state: req.body.state,
            description: req.body.description
        });

        await genero.save();
        res.send(genero);  
    } catch (error) {  
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener todos los géneros
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.send(generos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Actualizar un género existente
router.put('/:generoId', [
    check('name', 'invalid.name').notEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('description', 'invalid.description').optional().isString(),
    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        next();
    }
], async (req, res) => {
    try {
        const { generoId } = req.params;
        let genero = await Genero.findById(generoId);

        if (!genero) {
            return res.status(404).send('Género no encontrado');
        }

        // Actualizar datos
        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.description = req.body.description;

        await genero.save();
        res.send(genero);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;

const { Router } = require("express");
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear un nuevo tipo
router.post('/', [
    check('name', 'invalid.name').notEmpty(),
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
        const tipo = new Tipo({
            name: req.body.name,
            description: req.body.description || '', // Asigna un string vacío si no se envía.
        });

        await tipo.save();
        res.send(tipo);  
    
    } catch (error) {  
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener todos los tipos
router.get('/', async (req, res) => {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Actualizar un tipo existente
router.put('/:tipoId', [
    check('name', 'invalid.name').notEmpty(),
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
        const { tipoId } = req.params;
        let tipo = await Tipo.findById(tipoId);

        if (!tipo) {
            return res.status(404).send('Tipo no encontrado');
        }

        // Actualizar datos
        tipo.name = req.body.name;
        tipo.description = req.body.description || tipo.description;

        await tipo.save();
        res.send(tipo);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;

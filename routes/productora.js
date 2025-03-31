const { Router } = require("express");
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear una nueva productora
router.post('/', [
    check('name', 'invalid.name').notEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').notEmpty().isString(),
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
        const productora = new Productora({
            name: req.body.name,
            state: req.body.state,
            slogan: req.body.slogan,
            description: req.body.description || '', // Asigna un string vacío si no se envía.
        });

        await productora.save();
        res.send(productora);  
    
    } catch (error) {  
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener todas las productoras
router.get('/', async (req, res) => {
    try {
        const productoras = await Productora.find();
        res.send(productoras);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Actualizar una productora existente
router.put('/:productoraId', [
    check('name', 'invalid.name').notEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('slogan', 'invalid.slogan').notEmpty().isString(),
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
        const { productoraId } = req.params;
        let productora = await Productora.findById(productoraId);

        if (!productora) {
            return res.status(404).send('Productora no encontrada');
        }

        // Actualizar datos
        productora.name = req.body.name;
        productora.state = req.body.state;
        productora.slogan = req.body.slogan;
        productora.description = req.body.description || productora.description;

        await productora.save();
        res.send(productora);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;

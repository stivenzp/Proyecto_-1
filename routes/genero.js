const { Router } = require("express");
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');

const router = Router();


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
], async function (req, res) {
    try {
        let genero = new Genero({
            name: req.body.name,
            state: req.body.state,
            description: req.body.description
        });

        genero = await genero.save();
        res.send(genero);  
    
    } catch (error) {  
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

router.get('/', async function (req, res) {
    try {
        const generos = await Genero.find();
        res.send(generos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

module.exports = router;
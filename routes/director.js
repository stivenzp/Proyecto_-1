const { Router } = require("express");
const Director = require('../models/Director');
const { validationResult, check } = require('express-validator');

const router = Router();


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
], async function (req, res) {
    try {
        let director = new Director({
            name: req.body.name,
            state: req.body.state
        });

        director = await director.save();
        res.send(director);  
    
    } catch (error) {  
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

router.get('/', async function (req, res) {
    try {
        const directores = await Director.find();
        res.send(directores);
    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

module.exports = router;


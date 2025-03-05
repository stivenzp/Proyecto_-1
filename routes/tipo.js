const { Router } = require("express");
const Tipo = require('../models/Tipo');
const { validationResult, check } = require('express-validator');

const router = Router();


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
], async function (req, res) {
    try {
        let tipo = new Tipo({
            name: req.body.name,
            description: req.body.description,
        });

        tipo = await tipo.save();
        res.send(tipo);  
    
    } catch (error) {  
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

router.get('/', async function (req, res) {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

module.exports = router;

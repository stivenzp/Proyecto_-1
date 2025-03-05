const { Router } = require("express");
const Productora = require('../models/Productora');
const { validationResult, check } = require('express-validator');

const router = Router();


router.post('/', [
    check('name', 'invalid.name').notEmpty(),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
    check('slogan','invalid.slogan').notEmpty().isString(),
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
        let productora = new Productora({
            name: req.body.name,
            state: req.body.state,
            slogan: req.body.slogan,
            description: req.body.description,
        });

        productora = await productora.save();
        res.send(productora);  
    
    } catch (error) {  
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

router.get('/', async function (req, res) {
    try {
        const productoras = await Productora.find();
        res.send(productoras);
    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

module.exports = router;
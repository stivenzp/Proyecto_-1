const { Router } = require("express");
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').notEmpty(),
    check('email', 'invalid.email').isEmail(),
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
        const usuarioExist = await Usuario.findOne({ email: req.body.email });
        if (usuarioExist) {  
            return res.status(400).send('Exist Email');
        }

        let usuario = new Usuario({
            name: req.body.name,
            email: req.body.email,
            state: req.body.state
        });

        usuario = await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

router.get('/', async function (req, res) {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

module.exports = router;

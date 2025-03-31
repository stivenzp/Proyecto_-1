const { Router } = require("express");
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');

const router = Router();

// Crear usuario
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
], async (req, res) => {
    try {
        const usuarioExist = await Usuario.findOne({ email: req.body.email });
        if (usuarioExist) {  
            return res.status(400).send('Email ya en uso');
        }

        const usuario = new Usuario({
            name: req.body.name,
            email: req.body.email,
            state: req.body.state
        });

        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

// Actualizar usuario
router.put('/:userId', [
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
], async (req, res) => {
    try {
        const { userId } = req.params;
        let usuario = await Usuario.findById(userId);

        if (!usuario) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Verificar si el nuevo correo ya está en uso por otro usuario
        const usuarioExist = await Usuario.findOne({ email: req.body.email });
        if (usuarioExist && usuarioExist.id !== userId) {
            return res.status(400).send('Email ya en uso por otro usuario');
        }

        // Actualizar usuario existente
        usuario.name = req.body.name;
        usuario.email = req.body.email;
        usuario.state = req.body.state;

        await usuario.save();
        res.send(usuario);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

module.exports = router;


const { Router } = require("express");
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('serial','invalid.serial').notEmpty(),
    check('titulo','invalid.titulo').notEmpty().isString(),
    check('sinopsis','invalid.sinopsis').notEmpty().isString(),
    check('url', 'invalid.url').notEmpty().isURL(),
    check('photo','invalid.photo').notEmpty(),
    check('yearpremier','invalid.yearpremier').notEmpty(),
    check('genero','invalid.genero').notEmpty(),
    check('director','invalid.director').notEmpty(),
    check('productor','invalid.productor').notEmpty(),
    check('tipo','invalid.tipo').notEmpty(),

    (req, res, next) => { 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        next();
    }
], async function (req, res) {

    try {
        const mediaExist = await Media.findOne({ serial: req.body.serial });
        if (mediaExist) {  
            return res.status(400).send('Existe Serial');
        }

        let media = new Media({

            serial: req.body.serial,
            titulo: req.body.titulo,
            sinopsis: req.body.sinopsis,
            url: req.body.url,
            photo: req.body.photo,
            yearpremier: req.body.yearpremier,
            genero: req.body.genero_id,
            director: req.body.director_id,
            productor: req.body.productor_id,
            tipo: req.body.tipo_id,

        });

        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

router.get('/', async function (req, res) {
    try {
        const medias = await Media.find();
        res.send(medias);

    } catch (error) {
        console.log(error);
        res.status(500).send('Mensaje Error');
    }
});

module.exports = router;

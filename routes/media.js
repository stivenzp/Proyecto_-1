const { Router } = require("express");
const Media = require('../models/Media');
const { validationResult, check } = require('express-validator');

const router = Router();

// Validaciones reutilizables
const mediaValidation = [
    check('serial', 'invalid.serial').notEmpty(),
    check('titulo', 'invalid.titulo').notEmpty().isString(),
    check('sinopsis', 'invalid.sinopsis').notEmpty().isString(),
    check('url', 'invalid.url').notEmpty().isURL(),
    check('photo', 'invalid.photo').notEmpty(),
    check('yearpremier', 'invalid.yearpremier').notEmpty().isISO8601(),
    check('genero', 'invalid.genero').notEmpty(),
    check('director', 'invalid.director').notEmpty(),
    check('productora', 'invalid.productora').notEmpty(),
    check('tipo', 'invalid.tipo').notEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }
        next();
    }
];

// 📌 Crear una nueva media con populate
router.post('/', mediaValidation, async (req, res) => {
    try {
        const mediaExist = await Media.findOne({ serial: req.body.serial });
        if (mediaExist) {
            return res.status(400).json({ message: "El serial ya existe" });
        }

        const media = new Media(req.body);
        await media.save();

        const mediaSaved = await Media.findById(media._id)
            .populate({ path: 'genero', select: 'name' })
            .populate({ path: 'director', select: 'name' })
            .populate({ path: 'productora', select: 'name' })
            .populate({ path: 'tipo', select: 'name' });

        res.status(201).json(mediaSaved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// 📌 Obtener todas las medias con datos completos
router.get('/', async (req, res) => {
    try {
        const medias = await Media.find()
            .populate({ path: 'genero', select: 'name' })
            .populate({ path: 'director', select: 'name' })
            .populate({ path: 'productora', select: 'name' })
            .populate({ path: 'tipo', select: 'name' });

        res.json(medias);
    } catch (error) {
        console.error("Error en el servidor:", error.message, error.stack);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

// 📌 Actualizar una media existente
router.put('/:mediaId', mediaValidation, async (req, res) => {
    try {
        const { mediaId } = req.params;
        let media = await Media.findById(mediaId);

        if (!media) {
            return res.status(404).json({ message: "Media no encontrada" });
        }

        Object.assign(media, req.body);
        await media.save();

        const mediaUpdated = await Media.findById(mediaId)
            .populate({ path: 'genero', select: 'name' })
            .populate({ path: 'director', select: 'name' })
            .populate({ path: 'productora', select: 'name' })
            .populate({ path: 'tipo', select: 'name' });

        res.json(mediaUpdated);
    } catch (error) {
        console.error("Error en el servidor:", error.message, error.stack);
        res.status(500).json({ message: "Error en el servidor", error: error.message });
    }
});

router.get('/:mediaId', async function (req, res){
    try{
        const media = await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(404).send('No Existe Registros');
        }
        res.send(media);
    }catch(error){
        console.log(error);
        res.status(500).send('Mensaje Error')
    }  
});

module.exports = router;


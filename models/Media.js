const { Schema, model } = require('mongoose');

const MediaSchema = new Schema({
    serial: { type: String, required: true, unique: true },
    titulo: { type: String, required: true },
    sinopsis: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    photo: { type: String, required: true },
    yearpremier: { type: Date, required: true },
    genero: { type: Schema.Types.ObjectId, ref: 'Genero', required: true },
    director: { type: Schema.Types.ObjectId, ref: 'Director', required: true },
    productora: { type: Schema.Types.ObjectId, ref: 'Productora', required: true },
    tipo: { type: Schema.Types.ObjectId, ref: 'Tipo', required: true },
}, { timestamps: true });

module.exports = model('Media', MediaSchema);

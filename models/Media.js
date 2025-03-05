const { Timestamp } = require("bson");
const { type } = require("os");
const { stringify } = require("querystring");
const Genero = require("./Genero");

const { Schema, model} = require('mongoose');

const MediaSchema = Schema ({

    serial: {type: String, required: true, unique: true },
    titulo: {type: String, required: true},
    sinopsis: {type: String, required: true},
    url: {type: String, required: true, unique: true},
    photo: {type: String, required: true},
    yearpremier: {type: Date, required: true},
    genero:{type: Schema.Types.ObjectId, ref: 'Genero', require: true},
    director: {type: Schema.Types.ObjectId, ref: 'Director', require: true},
    productora: {type: Schema.Types.ObjectId, ref: 'Productora', require: true},
    tipo: {type: Schema.Types.ObjectId, ref: 'Tipo', require: true},
},  {timestamps: true});
  
module.exports = model('Media',MediaSchema);
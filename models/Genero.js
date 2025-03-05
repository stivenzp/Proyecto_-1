const { Timestamp } = require("bson");

const { Schema, model} = require('mongoose');

const GeneroSchema = Schema ({

    name: {type: String, required: true},
    state: {type: String, required: true, enum: [ 'Activo','Inactivo' ]},
    description: {type: String, required: true},
},  {timestamps: true});
  
module.exports = model('Genero',GeneroSchema);
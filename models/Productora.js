const { Timestamp } = require("bson");

const { Schema, model} = require('mongoose');

const ProductoraSchema = Schema ({

    name: {type: String, required: true},
    state: {type: String, required: true, enum: [ 'Activo','Inactivo' ]},
    slogan: {type: String, required: true},
    description: {type: String, required: true},
},  {timestamps: true});
  
module.exports = model('Productora',ProductoraSchema);
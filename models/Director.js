const { Timestamp } = require("bson");

const { Schema, model} = require('mongoose');

const DirectorSchema = Schema ({

    name: {type: String, required: true},
    state: {type: String, required: true, enum: [ 'Activo','Inactivo' ]},
},  {timestamps: true});
  
module.exports = model('Director',DirectorSchema);
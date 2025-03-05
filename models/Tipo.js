const { Timestamp } = require("bson");

const { Schema, model} = require('mongoose');

const TipoSchema = Schema ({

    name: {type: String, required: true},
    description: {type: String},
},  {timestamps: true});
  
module.exports = model('Tipo',TipoSchema);
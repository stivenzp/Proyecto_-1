const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: ['Activo', 'Inactivo'] },
    email: { type: String, required: true, unique: true }
}, { timestamps: true }); 

module.exports = model('Usuario', UsuarioSchema);

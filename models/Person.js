const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Person = mongoose.model("Person", new Schema({ 
    nombre: String,
    direccion: String,
    descripcion: String,
    date: String,
    edad: String,
    contacto: String,
    role: { type: String, default: 'person'}
}))

module.exports = Person;
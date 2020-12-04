const express = require("express");
const connectDB = require('./DB/connection');
const app = express();

const crypto = require('crypto')

const server = require('http').createServer(app);
const Users = require('./models/Users')
const Person = require('./models/Person')
//const ListPerson = require('./DB/listPerson')

const socketIO = require("socket.io")
let io = socketIO(server);
const port = 3000;


io.on("connection",  async (socket) => {

    await Person.find().exec().then(x =>{ 
        
        socket.emit('listPerson', {x})
    })
    
    socket.on('regUser', (req, callback) => {
        
        //------------------------------
        const {email, password} = req;
        crypto.randomBytes(16, (err, salt) => {
            const newSalt = salt.toString('base64')
            crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
                const encryptedPassword = key.toString('base64')
                Users.findOne({email}).exec()
                .then(user => {
                    if(user){
                        return callback({
                            resp: 'el usuario ya existe'
                        })
                    }
                    Users.create({
                        email,
                        password: encryptedPassword,
                        salt: newSalt,
                    }).then(() => {
                        callback({
                            resp: 'Usuario creado '
                        })
                    })
                })
            } )
        })
        //--------------------
    })
    socket.on('validateUser', (req, callback) => {
       
        const {email, password} = req;
        Users.findOne({email}).exec()
        .then(user => {
            if(!user){
                return callback({
                    resp: 'error'
                })
            }
            crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                const encryptedPassword = key.toString('base64')
                if(user.password === encryptedPassword){
                    
                    return callback({
                        resp: 'success'
                    })
                } 
                console.log('usuario y/o contraseña incorrecta 2')
                  
        })
    })
    })
    socket.on('agregarPersona', (req, callback) => {
        console.log(req)
       const {nombre, direccion, descripcion,edad,date,contacto} = req;
       Person.create({
        nombre,
        direccion,
        descripcion,
        date,
        edad,
        contacto
    }).then(() => {
        callback({
            resp: 'Usuario creado '
        })
    })
    })
    console.log("a user connected")
})


connectDB();
server.listen(port, () => console.log("server running on port:"+ port))




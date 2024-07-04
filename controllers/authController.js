const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/userModels');
const config = require('../config/config');
const bd = require('../db/db')

exports.register = (req, res) => {
   
    const {username, password} = req.body

    const hashedPassword = bcrypt.hashSync(password, 8)

    console.log("1")

    bd.query('INSERT INTO Users (nombre, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
        if(err) return res.status(500).send({message: 'error en el servidor: register user', error: err})
        console.log("hola")
        //const user = bd.query('SELECT * FROM users WHERE nombre = ?', username)
        
        const token = jwt.sign({id: results.id_user}, config.secretKey, {expiresIn: config.tokenExpiresIn} )
        
        res.status(201).send({auth: true, token})
    })
        
        
}

exports.login = (req, res) => {
    const {username, password} = req.body;

    bd.query('SELECT * FROM Users WHERE nombre = ?', username, (err, result)=> {
        if (err) {
            return res.status(500).send({message: 'error en el servidor: login user', error: err});
          }
        if (result.length === 0) {
        return res.status(404).send('usuario no encontrado');
        }

        const user = result[0];
        const isPassValid = bcrypt.compareSync(password, user.password)

        if(!isPassValid) return res.status(401).send({auth:false, token: null})

        const token = jwt.sign({id:user.id}, config.secretKey, {expiresIn: config.tokenExpiresIn})
    
        res.status(200).send({auth: true, token})
    })

}
const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../models/userModels');
const config = require('../config/config');
const bd = require('../db/db')

exports.register = (req, res) => {
    try{
        const {username, password} = req.body

        const hashedPassword = bcrypt.hashSync(password, 8)

        bd.query('INSERT INTO users (nombre, password) VALUES (?, ?)', [username, hashedPassword])

        
        const token = jwt.sign({id: results.insertId}, config.secretKey, {expiresIn: config.tokenExpiresIn} )

        res.status(201).send({auth: true, token})
    }catch(error){
        res.status(500).send('error en el servidor')
    }
}

exports.login = (req, res) => {
    const {username, password} = req.body;

    //const user = users.find(u => u.username === username);

    bd.query('SELECT * FROM users WHERE nombre = ?', username, (err, res)=> {
        if (err) {
            return res.status(500).send('error en el servidor');
          }
        if (results.length === 0) {
        return res.status(404).send('usuario no encontrado');
        }

        const user = res[0];
        const isPassValid = bcrypt.compareSync(password, user.password)

        if(!isPassValid) return res.status(401).send({auth:false, token: null})

        const token = jwt.sign({id:user.id}, config.secretKey, {expiresIn: config.tokenExpiresIn})
    
        res.status(200).send({auth: true, token})
    })

}
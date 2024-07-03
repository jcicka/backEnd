const jwt =  require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require('../modules/userModels');
const config = require('../config/config');

exports.register = (req, res) => {
    const {username, password} = req.body

    const hashedPassword = bcrypt.hashSync(password, 8)

    const newUser = {id: users.length + 1, username, password: hashedPassword}

    users.push(newUser)

    const token = jwt.sign({id: newUser.id}, config.secretKey, {expiresIn: config.tokenExpiresIn} )
}
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


//ruta para crear el usuario
router.post("/registro", userController.createUser)



module.exports = router
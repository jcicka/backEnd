const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


//ruta para usuario
router.post("/usuario/registro", userController.createUser)
router.get("/usuario/:id", userController.getUserById);
router.post("/usuario/update/:id", userController.updateUser);
router.post("/usuario/delete/:id", userController.deleteUser);

module.exports = router
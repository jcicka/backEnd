const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')


//ruta para usuario
router.post("/usuario", userController.createUser);
router.get("/usuario/:id", userController.getUserById);
router.get("/usuario", userController.getAllUsers);
router.put("/usuario/:id", userController.updateUser);
router.delete("/usuario/:id", userController.deleteUser);

module.exports = router
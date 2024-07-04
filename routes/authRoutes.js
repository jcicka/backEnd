const express = require('express');
const authController = require(`../controllers/authController`);
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', authController.register);

// Ruta para iniciar sesión de un usuario

router.post('/login', authController.login);

// Ruta protegida de ejemplo
router.get(`/protected`, authMiddleware, (req, res) => {
    res.status(200).send(`Hello user ${req.userId}`);
});

module.exports = router;

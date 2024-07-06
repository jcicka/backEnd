const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController.js')
const prodController = require('../controllers/prodController.js')


//ruta para usuario
router.post("/usuario", userController.createUser);
router.get("/usuario/:id", userController.getUserById);
router.get("/usuario", userController.getAllUsers);
router.put("/usuario/:id", userController.updateUser);
router.delete("/usuario/:id", userController.deleteUser);

router.post("/producto", prodController.createProd);
router.get("/productos/:id", prodController.getProdById);
router.get("/productos", prodController.getAllProducts);
router.put("/productos/:id", prodController.updateProd);
router.delete("/productos/:id", prodController.deleteProd);

router.post("/pedido", pedidosController.createPedido);
router.get("/pedido/:id", pedidosController.getPedidoById);
router.get("/pedido", pedidosController.getAllPedidos);
router.put("/pedido/:id", pedidosController.updatePedido);
router.delete("/pedido/:id", pedidosController.deletePedido);

module.exports = router
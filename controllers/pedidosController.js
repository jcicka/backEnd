const db = require('../db/db')

//aca van todos los metodos de user
const createPedido = (req, res) => {
    //logica de BD para cargar el usuario...
    const { id_usuario, fecha, total, items } = req.body;

    // Insertar el pedido en la tabla 'pedidos'
    const insertPedidoQuery = 'INSERT INTO pedido (id_usuario, fecha, total) VALUES (?, ?, ?)';
    // El total tiene que venir calculado del front (suma de los precios_unit de todos los items)
    db.query(insertPedidoQuery, [id_usuario, fecha, total], (error, result) => {
      if (error) {
        console.error('Error al crear el pedido:', error);
        return res.status(500).json({ message: 'Error interno del servidor al crear el pedido', error: error });
      }
  
      const id_pedido = result.insertId; // ID del pedido recién insertado
  
      // Insertar los ítems del pedido en la tabla 'item_pedido'
        if (items && items.length > 0) {
            const insertItemsQuery = 'INSERT INTO item_pedido (id_pedido, id_producto, cantidad, precio_unit, subtotal) VALUES ?';
            // el subtotal del item tiene que venir calculado del front (cantidad * precio_unit)
            const itemsData = items.map(item => [id_pedido, item.id_producto, item.cantidad, item.precio_unit, item.subtotal]);
  
            db.query(insertItemsQuery, [itemsData], (err, results) => {
                if (err) {
                    console.error('Error al crear los ítems del pedido:', err);
                    return res.status(500).json({ message: 'Error interno del servidor al crear los ítems del pedido', error: err });
                }
  
                res.status(201).json({ message: 'Items creado correctamente', results });
            });
        } else {
            res.status(201).json({ message: 'Pedido creado correctamente', result });
      }

    });
    
    
}

const updatePedido = (req, res) => {
    const {id} = req.params;
    const {id_usuario, fecha, total} = req.body;
    const sql = `UPDATE pedido SET id_usuario = ?, fecha = ?, total = ?, WHERE id_pedido = ?`;
    let data = [id_usuario, fecha, total, id];
    db.query(sql, data, (err, result) =>{
        if(err) throw err;
        if(result.affectedRows === 0) return res.status(404).send('Pedido no encontrado');
        res.json({message:' actualizado con exito'});
    });

}

const deletePedido = (req, res) =>{
    let {id} = req.params;
    let sql = `DELETE FROM productos WHERE id_producto = ?`
    db.query(sql, [id], (err, result)=>{
        if(err) throw err;
        if(result.affectedRows === 0) return res.status(404).send('Producto no encontrado');
        res.json({message:'Producto eliminado con exito'});
    })
}

const getPedidoById = (req, res) =>{
    let {id} = req.params;
    let sql = `SELECT * FROM productos WHERE id_producto = ?`
    db.query(sql, [id], (err, result)=>{
        if(err) throw err;
        if(result.length === 0) return res.status(404).send('Producto no encontrado');
        res.json(result);
    })
}

const getAllPedidos = (req, res) =>{
    const sql = `SELECT nombre, descripcion, precio, stock, categoria, ambientacion, estacion FROM productos`;
    db.query(sql, (err, results) =>{
        if(err) throw err;
        res.json(results);
    });
}

module.exports = {
    createPedido, 
    updatePedido, 
    getPedidoById, 
    deletePedido,
    getAllPedidos
}
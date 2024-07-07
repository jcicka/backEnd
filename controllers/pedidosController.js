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
  
                res.status(201).json({ message: 'Items creado correctamente'});
            });
        } else {
            res.status(201).json({ message: 'Pedido creado correctamente'});
      }

    });
    
    
}

/* no se van a realizar modificaciones de pedidos por ahora
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
    */

const deletePedidoById = (req, res) =>{
    const id_p = req.params.id; // ID del pedido desde los parámetros de la URL

  // Comienza la transacción para eliminar el pedido y sus ítems de manera segura
  db.beginTransaction(function(err) {
    if (err) {
      console.error('Error al iniciar la transacción:', err);
      return res.status(500).json({ message: 'Error al iniciar la transacción', error: err });
    }

    // Consulta para eliminar los ítems del pedido
    const deleteItemsQuery = `DELETE FROM item_pedido WHERE id_pedido = ?`;
    db.query(deleteItemsQuery, [id_p], function(err, results) {
      if (err) {
        db.rollback(function() {
          console.error('Error al eliminar los ítems del pedido:', err);
          return res.status(500).json({ message: 'Error al eliminar los ítems del pedido', error: err });
        });
      }

      // Consulta para eliminar el pedido
      const deletePedidoQuery = `DELETE FROM pedido WHERE id_pedido = ?`;
      db.query(deletePedidoQuery, [id_p], function(err, results) {
        if (err) {
          db.rollback(function() {
            console.error('Error al eliminar el pedido:', err);
            return res.status(500).json({ message: 'Error al eliminar el pedido', error: err });
          });
        }

        // Commit de la transacción si todas las consultas fueron exitosas
        db.commit(function(err) {
          if (err) {
            db.rollback(function() {
              console.error('Error al hacer commit de la transacción:', err);
              return res.status(500).json({ message: 'Error al hacer commit de la transacción', error: err });
            });
          }

          console.log('Pedido eliminado correctamente.');
          res.status(200).json({ message: 'Pedido eliminado correctamente.' });
        });
      });
    });
  });
}

const getPedidoById = (req, res) =>{
    const id_p = req.params.id; // ID del pedido desde los parámetros de la URL

  // Consulta SQL usando JOIN para obtener el pedido y sus ítems
  const query = `SELECT p.fecha, p.id_pedido, p.id_usuario, p.total, ip.id_producto, ip.cantidad, ip.precio_unit, ip.subtotal
    FROM pedido p
    LEFT JOIN item_pedido ip ON p.id_pedido = ip.id_pedido
    WHERE p.id_pedido = ?`;

  db.query(query, [id_p], (error, results) => {
    if (error) {
      console.error('Error al obtener el pedido por ID:', error);
      return res.status(500).json({ message: 'Error interno del servidor al obtener el pedido por ID', error: error });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Pedido no encontrado' });
    }
    
    // Estructura de datos para almacenar el resultado final (pedido con sus ítems)
    const pedido = {
      id_pedido: results[0].id_pedido,
      id_usuario: results[0].id_usuario,
      fecha: results[0].fecha,
      total: results[0].total,
      items: [] // Array para almacenar los ítems del pedido
    };

    // Iterar sobre los resultados para agregar los ítems al pedido
    results.forEach(row => {
        pedido.items.push({
                            id_producto: row.id_producto,
                            cantidad: row.cantidad,
                            precio_unit: row.precio_unit, 
                            subtotal: row.subtotal
        });
        //console.log('items', row);
    });

    res.status(200).json(pedido);
  });
}

const getAllPedidos = (req, res) =>{
    const query = `
    SELECT p.id_pedido, p.id_usuario, p.fecha, p.total, ip.id_producto, ip.cantidad, ip.precio_unit, ip.subtotal
    FROM pedido p
    LEFT JOIN item_pedido ip ON p.id_pedido = ip.id_pedido`;

  db.query(query, (error, results) => {
    if (error) {
      console.error('Error al obtener los pedidos:', error);
      return res.status(500).json({ message: 'Error interno del servidor al obtener los pedidos', error: error });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encontraron pedidos' });
    }

    // Objeto para almacenar todos los pedidos con sus ítems
    const pedidos = [];

    // Map para agrupar los resultados por id_pedido
    const pedidosMap = new Map();

    results.forEach(row => {
      const { id_pedido, id_usuario, fecha, total, id_item, id_producto, cantidad, precio_unit, subtotal } = row;

      if (!pedidosMap.has(id_pedido)) {
        // Si es la primera vez que encontramos este id_pedido, creamos un nuevo objeto de pedido
        pedidosMap.set(id_pedido, {
          id_pedido,
          id_usuario,
          fecha,
          total,
          items: []
        });
      }

      // Agregamos el ítem al pedido correspondiente
      pedidosMap.get(id_pedido).items.push({
        id_item,
        id_producto,
        cantidad,
        precio_unit,
        subtotal
      });
    });

    // Convertimos el mapa en un array de pedidos
    pedidosMap.forEach(value => {
      pedidos.push(value);
    });

    res.status(200).json(pedidos);
  });
}

module.exports = {
    createPedido, 
    getPedidoById, 
    deletePedidoById,
    getAllPedidos
}
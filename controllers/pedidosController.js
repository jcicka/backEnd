const db = require('../db/db')

//aca van todos los metodos de user
const createPedido = (req, res) => {
    //logica de BD para cargar el usuario...
    let sql = `INSERT INTO pedido(id_usuario, fecha, total) VALUES(?,?,?)` 
   
    let data = [req.body.id_usuario, req.body.fecha, req.body.total]

    db.query(sql, data, (err, results) => {
        if (err) {
            console.error('Error al crear el pedido:', err);
            res.status(500).json({ error: 'Error al crear el pedido' });
            return;
        }
        res.json({ status: 200, message: 'Pedido created', userId: results.insertId});
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
        res.json({message:'Pedido actualizado con exito'});
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
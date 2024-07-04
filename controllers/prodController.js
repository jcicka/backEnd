const db = require('../db/db')

//aca van todos los metodos de user
const createProd = (req, res) => {
    //logica de BD para cargar el usuario...
    let sql = `INSERT INTO productos(nombre, description, precio, stock, categoria, ambientacion, estacion) VALUES(?,?,?,?,?,?,?)` 
   
    let data = [req.body.nombre, req.body.description, req.body.precio, req.body.stock, req.body.categoria, req.body.ambientacion, req.body.estacion]

    db.query(sql, data, (err, results) => {
        if (err) {
            console.error('Error al crear el producto:', err);
            res.status(500).json({ error: 'Error al crear el producto' });
            return;
        }
        res.json({ status: 200, message: 'Producto created', userId: results.insertId});
    });

    
}

const updateProd = (req, res) => {
    const {id} = req.params;
    const {nombre, description, precio, stock, categoria, ambientacion, estacion} = req.body;
    const sql = `UPDATE productos SET nombre = ?, description = ?, precio = ?, stock = ?, categoria =?, ambientacion=?, estacion=? WHERE id_producto = ?`;
    let data = [nombre, description, precio, stock, categoria, ambientacion, estacion, id];
    db.query(sql, data, (err, result) =>{
        if(err) throw err;
        if(result.affectedRows === 0) return res.status(404).send('Producto no encontrado');
        res.json({message:'Producto actualizado con exito'});
    });

}

const deleteProd = (req, res) =>{
    let {id} = req.params;
    let sql = `DELETE FROM productos WHERE id_producto = ?`
    db.query(sql, [id], (err, result)=>{
        if(err) throw err;
        if(result.affectedRows === 0) return res.status(404).send('Producto no encontrado');
        res.json({message:'Producto eliminado con exito'});
    })
}

const getProdById = (req, res) =>{
    let {id} = req.params;
    let sql = `SELECT * FROM productos WHERE id_producto = ?`
    db.query(sql, [id], (err, result)=>{
        if(err) throw err;
        if(result.length === 0) return res.status(404).send('Producto no encontrado');
        res.json(result);
    })
}

const getAllProducts = (req, res) =>{
    const sql = `SELECT nombre, description, precio, stock, categoria, ambientacion, estacion FROM productos`;
    db.query(sql, (err, results) =>{
        if(err) throw err;
        res.json(results);
    });
}

module.exports = {
    createProd, 
    updateProd, 
    getProdById, 
    deleteProd,
    getAllProducts
}
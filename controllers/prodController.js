const db = require('../db/db')

//aca van todos los metodos de user
const createProd = (req, res) => {
    //logica de BD para cargar el usuario...
    let sql = `INSERT INTO productos(nombre, descripcion, precio, stock, categoria, ambientacion, estacion) VALUES(?,?,?,?,?,?,?)` 
   
    let data = [req.body.nombre, req.body.descripcion, req.body.precio, req.body.stock, req.body.categoria, req.body.ambientacion, req.body.estacion]

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
    const sql = `UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria =?, ambientacion=?, estacion=? WHERE id_productos = ?`;
    let data = [req.body.nombre, req.body.descripcion, req.body.precio, req.body.stock, req.body.categoria, req.body.ambientacion, req.body.estacion, '3']
    db.query(sql, data, (err, result) =>{
        if(err) throw res.status(500).send({message:'error del servidor', error: err});
        if(result.affectedRows === 0) return res.status(404).send('Producto no encontrado');
        res.json({message:'Producto actualizado con exito', producto: result});
    });

}

const deleteProd = (req, res) =>{
    let {id} = req.params.id;
    let sql = `DELETE FROM productos WHERE id_producto = ?`
    db.query(sql, [id], (err, result)=>{
        if(err) throw err;
        if(result.affectedRows === 0) return res.status(404).send('Producto no encontrado');
        res.json({message:'Producto eliminado con exito'});
    })
}

const getProdById = (req, res) =>{
    let {id} = req.params;
    let sql = `SELECT * FROM productos WHERE id_productos = ?`
    console.log(id)
    console.log("id")

    db.query(`SELECT * FROM productos WHERE id_productos = ?`, id, (err, result)=>{
        if(err) throw err;
        if(result.length === 0) return res.status(404).send({message: 'Producto no encontrado', error: err});
        console.log(id)
        res.json(result);
    })
}

const getAllProducts = (req, res) =>{
    const sql = `SELECT nombre, descripcion, precio, stock, categoria, ambientacion, estacion FROM productos`;
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
const db = require('../db/db')
const bcrypt = require('bcryptjs');

//aca van todos los metodos de user
const createUser = (req, res) => {
    //logica de BD para cargar el usuario...
    let sql = `INSERT INTO users(nombre, apellido, email, password, direccion, telefono) VALUES(?,?,?,?,?,?)` 
    const hashedPassword = bcrypt.hashSync(req.body.password, 8)
    let data = [req.body.nombre, req.body.apellido, req.body.email, hashedPassword, req.body.direccion, req.body.telefono]

    db.query(sql, data, (err, results) => {
        if (err) {
            console.error('Error al crear el usuario:', err);
            res.status(500).json({ error: 'Error al crear el usuario' });
            return;
        }
        res.json({ status: 200, message: 'usuario created', userId: results.insertId});
    });

    
}

const updateUser = (req, res) => {
    const {id} = req.params;
    const {nombre, apellido, password, direccion, telefono} = req.body;
    const sql = `UPDATE users SET nombre = ?, apellido = ?, password = ?, direccion = ?, telefono =? WHERE id_user = ?`;
    let data = [nombre, apellido, password, direccion, telefono, id];
    db.query(sql, data, (err, result) =>{
        if(err) throw err;
        if(result.affectedRows === 0) return res.status(404).send('Usuario no encontrado');
        res.json({message:'Usuario actualizada con exito'});
    });

}

const deleteUser = (req, res) =>{
    let {id} = req.params;
    let sql = `DELETE FROM users WHERE id_user = ?`
    db.query(sql, [id], (err, result)=>{
        if(err) throw err;
        if(result.affectedRows === 0) return res.status(404).send('Usuario no encontrado');
        res.json({message:'Usuario eliminado con exito'});
    })
}

const getUserById = (req, res) =>{
    let {id} = req.params;
    let sql = `SELECT * FROM users WHERE id_user = ?`
    db.query(sql, [id], (err, result)=>{
        if(err) throw err;
        if(result.length === 0) return res.status(404).send('Usuario no encontrado');
        res.json(result);
    })
}

const getAllUsers = (req, res) =>{
    const sql = `SELECT nombre, apellido, email, direccion, telefono FROM users`;
    db.query(sql, (err, results) =>{
        if(err) throw err;
        res.json(results);
    });
}

module.exports = {
    createUser, 
    updateUser, 
    getUserById, 
    deleteUser,
    getAllUsers
}
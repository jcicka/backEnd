const db = require('../db/db')

//aca van todos los metodos de user
const createUser = (req, res) => {
    //logica de BD para cargar el usuario...
    let sql = `INSERT INTO usuarios(nombre, apellido, email, password) VALUES(?,?,?,?)` 
    let data = [req.body.nombre, req.body.apellido, req.body.email, req.body.password]
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
    let sql = `UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, password = ?`
    let data = [req.body.nombre, req.body.apellido, req.body.email, req.body.password]
    db.query(sql, data, (err, res) =>{
        if(err){
            console.error('error al actualizar usuario: ', err);
            res.status(500).json({error: "error al actualizar usuario"});
            return;
        }
        res.json({ message: "usuario actualizado"});
    });

}

const deleteUser = (req, res) =>{
    let {id} = req.params;
    let sql = `DELETE FROM usuario WHERE id = ?`
    db.query(sql, [id], (err, res)=>{
        if(err){
            console.error('error al eliminar el usuario: ', err);
            res.status(500).json({error: "error al eliminar el usuario"});
            return;
        }
        res.json({ message: "usuario eliminado"});
    })
}

const getUserById = (req, res) =>{
    let {id} = req.params;
    let sql = `SELECT * FROM usuarios WHERE id = ?`
    db.query(sql, [id], (err, res)=>{
        if(err){
            console.error('error al obtener todos los usuarios: ', err);
            res.status(500).json({error: "error al obtener todos los usuarios"});
            return;
        }
        res.json({ message: "usuarios obtenidos"});
    })
}

module.exports = {
    createUser, 
    updateUser, 
    getUserById, 
    deleteUser
}
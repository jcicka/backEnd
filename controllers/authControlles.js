const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const db = require("../db/db");

exports.register = (req, res) => {
  const { nombre, apellido, email, password, direccion, telefono } = req.body;

  // Hash del password
  const hashedPassword = bcrypt.hashSync(password, 8);

  // Insertar el nuevo usuario en la base de datos
  const insertUserQuery =
    "INSERT INTO users (nombre, apellido, email, password, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    insertUserQuery,
    [nombre, apellido, email, hashedPassword, direccion, telefono],
    (err, result) => {
      //console.log("resultado del nuevo usuario", result);
      if (err) {
        //console.error("Error al registrar el usuario:", err);
        return res.status(500).send(err.message);
      }

      // Obtener el ID del usuario insertado
      const userId = result.insertId;

      // Generar token JWT
      const token = jwt.sign({ id: userId }, config.secretKey, {
        expiresIn: config.tokenExpiresIn,
      });

      // Devolver respuesta exitosa con el token
      res.status(201).send({ auth: true, token });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Validación de datos de entrada
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Email y contraseña son obligatorios" });
  }

  // Consulta para obtener el usuario por email
  const getUserQuery = "SELECT * FROM users WHERE email = ?";
  db.query(getUserQuery, [email], (err, results) => {
    if (err) {
      console.error("Error al buscar el email:", err);
      return res.status(500).send("Error interno del servidor");
    }

    // Verificar si el usuario existe
    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const user = results[0];
    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) {
      return res
        .status(401)
        .json({ auth: false, token: null, message: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign({ id: user.id }, config.secretKey, {
      expiresIn: config.tokenExpiresIn,
    });

    // Devolver respuesta exitosa con el token
    res.status(200).json({ auth: true, token });
  });
};

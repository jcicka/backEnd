const jwt = require('jsonwebtoken');
//se importa la clave secreta y duracion del token
const config = require('../config/config');

//Middleware de autenticacion
module.exports = (req, res, next) => {
    // se obtiene el token del encabezado de autorizacion
    const authHeader = req.headers[`authorization`];
    //mensaje si no hay token en el enzabezado
    if (!authHeader) return res.status(403).send({auth: false, message:'No token provided'});
    // se extrae el token del encabezado (formato tipo Bearer)
    const token = authHeader.split(' ')[1];

    //si el token no esta bien formado se envia una respuesta de error 403
    if (!token) return res.status(403).send({auth: false, message: 'Malformed token'});
    // se verifica el token
    jwt.verify(token, config.secretKey, (err, decoded) => {
        // si hay un error en la verificacion se envia una respuesta de error 500
        if (err) return res.status(500).send({auth: false, message: 'Failed to authenticate token.'});
        // si el token es valido, almacena el id del usuario decodificado en la solicitud, se proporciona acceso al recurso
        req.userId = decoded.id;
        next();
    });
};

const axios = require("axios");

function obtenerUsuarios() {
    axios({
        url:"/auth/usuario",
        method:"GET",
        params:{
            _limit:2
        }

    }).then(respuesta=> console.log(respuesta))

}

obtenerUsuarios()
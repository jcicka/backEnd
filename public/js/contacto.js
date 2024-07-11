//Probablemente este arcihco se podria renombrar cono validaciones.js o algo asi
const formulario = document.getElementById('registro')
const pass = document.getElementById('password')

function validarEmail() {
    let mail = document.getElementById('email').value
    if (!(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(mail))) {
        emergenteError("Email: no es válido")
    }
}

function validarPassword() {

}

function validarLogin() {
    validarEmail()
}

function validarContacto() {

    validarEmail()
    //validacion telefono





}

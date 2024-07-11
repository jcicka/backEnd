const email = document.getElementById('email')
const password = document.getElementById('contrasenia')
const iniciarSesion = document.getElementById('iniciar')
const formulario = document.getElementById('formulario')

const logueo = () => {
    const data = {
        email: email.value,
        password: password.value
    }
    axios.post('auth/login', data).then((response) => {
        const {nombre,apellido}= response.data.user
        const e = document.createElement('H1')
        e.classList.add('error','error--exito')
        e.innerText = `Bienvenido de nuevo ${nombre} ${apellido}`
        formulario.appendChild(e)
        setTimeout(()=>{
            window.location.href='/'
        },2000)
    }).catch((error) => {
        const e = document.createElement('H1')
        e.classList.add('error')
        e.innerText = `${error.response.data.message}`
        setTimeout(()=>{
        e.innerText=''
        formulario.removeChild(e)
        },2000)
        formulario.appendChild(e)
    })
}

iniciarSesion.addEventListener('click', (ev) => {
    ev.preventDefault()
    logueo()
})
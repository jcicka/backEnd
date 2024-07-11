const nombre = document.getElementById('nombre')
const apellido = document.getElementById('apellido')
const email = document.getElementById('email')
const password = document.getElementById('password')
const direccion = document.getElementById('dir')
const telefono = document.getElementById('telefono')
const registrar = document.querySelector('.btn_agregar')
const formulario = document.getElementById('registro')
const pass = document.getElementById('password')

const registrarse = () => {
  if (nombre.value === '') {
    emergenteError('Nombre: No puede estar vacio')
    return
  }
  if (apellido.value === '') {
    emergenteError('Apellido: No puede estar vacio')
    return
  }

  if (!(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(email.value))) {
    emergenteError('Email: no es válido')
    return
  }
  if (pass.value === '') {
    emergenteError('Password: No puede estar vacio')
    return
  } else if (pass.value.length < 5) {
    emergenteError('Password: debe ser mayor a 5 caracteres')
    return
  }
  if (!(/^(\d{10}|\d{11})$/.test(telefono.value.replace(/ /g, '')))) {
    emergenteError('Telefono: Por favor ingrese un numero de 10 u 11 digitos')
    return
  }
  const nuevoUser = {
    nombre: nombre.value,
    apellido: apellido.value,
    email: email.value,
    password: password.value,
    direccion: direccion.value,
    telefono: telefono.value,
  }
  axios.post('auth/register', nuevoUser).then((response) => {
    const {nombre,apellido}= response.data
    const e = document.createElement('H1')
    e.classList.add('error','error--exito')
    e.innerText = `Bienvenido a nuestra comunidad ${nombre} ${apellido}`
    formulario.appendChild(e)
    setTimeout(()=>{
      window.location.href='/login.html'
    },3000)

  }).catch((error) => {
    console.log(error)
  })
}
registrar.addEventListener('click', (ev) => {
  ev.preventDefault()
  registrarse()
})

const emergenteError = (texto) => {
  const e = document.createElement('H1')
  e.classList.add('error')
  e.innerText = texto
  formulario.appendChild(e)
  setTimeout(() => {
    formulario.removeChild(e)
  }, 3000)
}

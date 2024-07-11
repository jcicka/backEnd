const galeria = document.querySelector('#galeria')

axios.get('auth/productos').then((response) => {
  const productos = response.data
  productos.filter((producto) =>
    producto.categoria === 'Plantas').forEach((planta) => {

      galeria.innerHTML += `
        <article class="card">
            <img src=${planta.imagen} alt=${planta.nombre}>
            <h2 class="subTgaleria card-title">${planta.nombre}</h2>
            <p>${planta.description}</p>
            <button class="btn_agregar" type="button">Agregar</button>
        </article>
    `
    }
  )
})

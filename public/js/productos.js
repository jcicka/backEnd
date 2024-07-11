const galeria = document.querySelector('#galeria')

axios.get('auth/productos').then((response) => {
  const productos = response.data
  productos.filter((producto) =>
    producto.categoria === 'Herramientas').forEach((herramienta) => {

      galeria.innerHTML += `
      <article>
            <div class="card" style="width: 18rem;">
                <img src=${herramienta.imagen} class="card-img-top" alt=${herramienta.nombre}>
                <div class="card-body">
                    <h5 class="card-title">${herramienta.nombre}</h5>
                    <p class="card-text">${herramienta.description}</p>
                </div>
                    <button class="btn_agregar">Agregar</button>
            </div>
        </article>
    `
    }
  )
})

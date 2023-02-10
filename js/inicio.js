fetch('./stock/stock.json')
    .then((resp) => resp.json())
    .then(data => {
        mostrarInicio(data)
    })
    
const mostrarInicio = (data) => {
    const contenedor = document.getElementById('producto-contenedor')
        
    data.forEach(producto => {
        const div = document.createElement('div')
        div.classList.add('card')
        div.innerHTML += `<div class="card-image">
                          <img src=${producto.imagen} class="img-juegos">
                          <a class="btn-floating halfway-fab wabes-effect waves-light red"><i id=${producto.id} class="material-icons sumar alerta-agregar">add_shopping_cart</i></a>
                        </div>
                        <div class="card-content">
                            <span class="card-title">${producto.nombre}</span>
                            <p>Genero: ${producto.genero}</p>
                            <p>$:${producto.precio}</p>
                        </div>
                       `
        contenedor.appendChild(div)
    })
}
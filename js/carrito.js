let carrito = []
const productos = []

fetch('./stock/stock.json')  
    .then((resp) => resp.json())
    .then((data) => obtenerStock(data))


const obtenerStock = (data) =>{
    data.forEach(stock => productos.push(stock))
}

const prodContenedor = document.getElementById('producto-contenedor')

prodContenedor.addEventListener('click', (e) => {
    if (e.target.classList.contains('sumar')) {
        validarProductoEnCarrito(e.target.id)
        Toastify({
            text: 'Se a Añadido al carrito',
            duration: 1000,
            gravity: 'top',
            position: 'right',
            style: {
                background: ' #000c18'
            }
        }).showToast()
    }
})

const validarProductoEnCarrito = (productoId) => {
    const productoRepetido = carrito.find(producto => producto.id == productoId)

    if (!productoRepetido) {
        const producto = productos.find(producto => producto.id == productoId)
        carrito.push(producto)
        mostrarProducto(producto)
        actualizarTotalesCarrito(carrito)
    } else {
        productoRepetido.cantidad++
        const cantidadProducto = document.getElementById(`cantidad${productoRepetido.id}`)
        cantidadProducto.innerText = `Cantidad: ${productoRepetido.cantidad}`
        actualizarTotalesCarrito(carrito)
    }

}

const mostrarProducto = (producto) => {
    const contenedor = document.getElementById("carrito-contenedor")
    const div = document.createElement("div")
    div.classList.add("productoEnCarrito")
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio: ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
    actualizarTotalesCarrito(carrito)
}

const mostrarProducto2 = (carrito) => {
    const contenedor = document.getElementById("carrito-contenedor")

    contenedor.innerHTML = ""

    carrito.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("productoEnCarrito")
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio: ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div)
    })
}

const eliminarProductoCarrito = (productoId) => {

    const productoIndex = carrito.findIndex(producto => producto.id == productoId)

    if (carrito[productoIndex].cantidad > 1) {
        carrito[productoIndex].cantidad--
        Toastify({
            text: 'Se a eliminado un producto del carrito',
            duration: 1000,
            gravity: 'top',
            position: 'right',
            style: {
                background: ' #000c18'
            }
        }).showToast()
    } else {
        carrito.splice(productoIndex, 1)
        Toastify({
            text: 'Se elimino del carrito',
            duration: 1000,
            gravity: 'top',
            position: 'right',
            style: {
                background: ' #000c18'
            }
        }).showToast()
    }

    mostrarProducto2(carrito)
    actualizarTotalesCarrito(carrito)
}

const actualizarTotalesCarrito = (carrito) => {

    const totalCantidad = carrito.reduce((acc, item) => acc + item.cantidad, 0)

    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    const totalCompraIva = (totalCompra * 0.21) + totalCompra

    mostrarTotalCarrito(totalCantidad, totalCompraIva)
    guardarCarritoStorage(carrito)
}

const mostrarTotalCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById("contador-carrito")
    const precioTotal = document.getElementById("precioTotal")

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra
}

const guardarCarritoStorage = (carritoDeCompras) => {
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))
}

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    return carritoStorage
}

const cargarCarrito = () => {
    if (localStorage.getItem("carrito")) {
        carrito = obtenerCarritoStorage()
        mostrarProducto2(carrito)
        actualizarTotalesCarrito(carrito)
    }
}
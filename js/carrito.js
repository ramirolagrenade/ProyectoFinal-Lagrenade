let carrito = []
const productos = []

// Se utiliza el fetch para pasar los objetos que se encuentran en el archivo JSON y trasladarlo a un array.

fetch('./stock/stock.json')  
    .then((resp) => resp.json())
    .then((data) => obtenerStock(data))


const obtenerStock = (data) =>{
    data.forEach(stock => productos.push(stock))
}

const prodContenedor = document.getElementById('producto-contenedor')

// Se crea un evento click para agregar al carrito si el elemento clickeado posee la clase 'sumar', y este elemento posee un id que se utiliza para agregar un elemento determinado al carrito.

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

// En esta función recibe el Id del producto a agregar al carrito, con el find recorre los objetos dentro del carrito y si no se encuentra el mismo id se lo agrega, de lo contrario si la propiedad id coincida aumenta en 1 la propiedad de cantidad.

const validarProductoEnCarrito = (productoId) => {
    const productoRepetido = carrito.find(producto => producto.id == productoId)
    const producto = productos.filter(producto => producto.id == productoId)

    if (!productoRepetido) {
        carrito.push(producto[0])
        mostrarProducto(producto[0])
        actualizarTotalesCarrito(carrito)
    } else {
        producto[0].cantidad++
    
        actualizarTotalesCarrito(carrito)
        mostrarProducto2(carrito)
    }
}

// Esta función permite visualizar los productos que se encuentras dentro del array de objetos de 'carrito' y añade el botón 'boton-eliminar' que permite eliminar un producto anteriormente añadido al carrito.

const mostrarProducto = (producto) => {
    const contenedor = document.getElementById("carrito-contenedor")
    const div = document.createElement("div")
    div.classList.add("productoEnCarrito")
    div.innerHTML = `
        <p>${producto.nombre}</p>
        <p>Precio:$ ${producto.precio}</p>
        <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
        <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
    `
    contenedor.appendChild(div)
    actualizarTotalesCarrito(carrito)
}

// Esta función actualiza el DOM luego de eliminar un producto del carrito.

const mostrarProducto2 = (carrito) => {
    const contenedor = document.getElementById("carrito-contenedor")

    contenedor.innerHTML = ""

    carrito.forEach(producto => {
        const div = document.createElement("div")
        div.classList.add("productoEnCarrito")
        div.innerHTML = `
            <p>${producto.nombre}</p>
            <p>Precio:$ ${producto.precio}</p>
            <p id=cantidad${producto.id}>Cantidad: ${producto.cantidad}</p>
            <button class="btn waves-effect waves-ligth boton-eliminar" value="${producto.id}">X</button>
        `
        contenedor.appendChild(div)
    })
}

// Luego de finalizar la compra con esta función elimina todos los productos del DOM del carrito.

const mostrarProducto3 = () => {
    const contenedor = document.getElementById("carrito-contenedor")

    contenedor.innerHTML = ""
}

// Atreves de un evento click esta función elimina un producto del carrito, en caso de ser mayor a 1 lo decrece en 1 y en caso contrario (<=1) lo elimina del array de objetos del carrito.

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

// Esta función atreves de la función reduce suma todos los valores de la propiedad cantidad para actualizar la cantidad de productos en el carrito y realiza la ecuación de las propiedades precio * cantidad para luego sumarlas todas y multiplicarlo por el Iva.

const actualizarTotalesCarrito = (carrito) => {

    const totalCantidad = carrito.reduce((acc,item) =>acc + item.cantidad,0)

    const totalCompra = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

    const totalCompraIva = (totalCompra * 0.21) + totalCompra

    mostrarTotalCarrito(totalCantidad, totalCompraIva)
    guardarCarritoStorage(carrito)
}

// Esta función permite visualizar en el DOM tanto la cantidad de productos dentro del carrito como la sumatoria total de los productos mas iva dentro del carrito.

const mostrarTotalCarrito = (totalCantidad, totalCompra) => {
    const contadorCarrito = document.getElementById("contador-carrito")
    const precioTotal = document.getElementById("precioTotal")

    contadorCarrito.innerText = totalCantidad
    precioTotal.innerText = totalCompra
}

// Esta función luego de finalizar la compra reestablece los valores a 0 tanto de la cantidad de productos dentro del carrito y el total de la sumatoria de los precios del carrito mas iva.

const mostrarTotalCarrito2 = () => {
    const contadorCarrito = document.getElementById("contador-carrito")
    const precioTotal = document.getElementById("precioTotal")
    
    contadorCarrito.innerText = 0
    precioTotal.innerText = 0
}

// Esta función guarda el  array de objetos del 'carrito' al localStorage.

const guardarCarritoStorage = (carritoDeCompras) => {
    localStorage.setItem("carrito", JSON.stringify(carritoDeCompras))
}

// Esta función carga si hay algo guardado dentro del localStorage.

const obtenerCarritoStorage = () => {
    const carritoStorage = JSON.parse(localStorage.getItem("carrito"))
    return carritoStorage
}

// Esta función atreves de un if verifica si hay algo almacenado en el localStorage y en caso de ser así los muestra dentro del carrito y actualiza la cantidad de productos dentro del carrito y el precio total de la sumatoria de productos mas iva.

const cargarCarrito = () => {
    if (localStorage.getItem("carrito")) {
        carrito = obtenerCarritoStorage()
        mostrarProducto2(carrito)
        actualizarTotalesCarrito(carrito)
    }
}

// Al finalizar la Compra se vacía tanto el carrito como el local storage y se le modifica la propiedad de 'cantidad' a los objetos del carrito.

const finalizarCompra = (carrito) =>{
    if (carrito.length>0){
        Swal.fire({
            icon: 'success',
            title: 'Compra Realizada',
            text: 'Su compra se realizo correctamente.',
            background: '#0d2033',
            color: '#fff'
        })
    }

    productos.map(item => item.cantidad = 1) 
    
    carrito.splice(0,carrito.length)
    localStorage.clear()

    mostrarProducto3()
    mostrarTotalCarrito2()
}
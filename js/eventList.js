const menuCarrito = document.querySelector('.modal-contenedor');
const abrirCarrito = document.getElementById('cesta-carrito');

abrirCarrito.addEventListener('click', () => {
    menuCarrito.classList.toggle('modal-active')
});

const cerrarCarrito = document.getElementById('btn-cerrar-carrito');

cerrarCarrito.addEventListener('click', () => {
    menuCarrito.classList.toggle('modal-active')
});

menuCarrito.addEventListener('click', () => {
    cerrarCarrito.click()
});

const actualizarCarrito = document.querySelector('.modal-carrito')

actualizarCarrito.addEventListener("click", (e) => {
    e.stopPropagation();
    if (e.target.classList.contains("boton-eliminar")) {
        eliminarProductoCarrito(e.target.value);
    };
});
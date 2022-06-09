let modalCarrito = document.getElementById("contenedorModalCarrito");

let botonCarrito = document.getElementById("botonCarrito");

let botonCerrar = document.getElementById("botonCerrar");


botonCarrito.addEventListener("click", () => {

    modalCarrito.style.display = "flex";

});


botonCerrar.addEventListener("click", () => {

    modalCarrito.style.display = "none";

})
let buscador = document.getElementById("inputBuscador");

let contenedorCards = document.getElementById("contenedorCards");

let card = document.getElementsByClassName("card");

let contenedorTicketsAComprar = document.getElementById("contenedorTicketsAComprar");

let contenedorListaItems = document.getElementById("contenedorListaItems");

let precioTotal = document.getElementById("precioTotal");

let botonConfirmacionCompra = document.getElementById("botonConfirmacionCompra");

let totalCompra;

let shows;

let botonesComprar;

let botonesEliminar;

let carrito = JSON.parse(localStorage.getItem("storageCarrito"));


class Compra {

    constructor(artistaSeleccionado,precioShowSeleccionado,idShowSeleccionado){
        this.artistaSeleccionado = artistaSeleccionado;
        this.precioShowSeleccionado = precioShowSeleccionado;
        this.idShowSeleccionado = idShowSeleccionado;
    };

};

// Obteniendo los eventos del archivo local "eventos.json"

const obtenerEventos = async () => {

    const responseShows = await fetch("https://my-json-server.typicode.com/santirojo/shufflestageapi/shows");

    shows = await responseShows.json();

    shows.forEach(evento => agregarCardAHTML(evento));

    asignarEventoBotonComprar();

};

const asignarEventoBotonComprar = () => {

    botonesComprar = document.querySelectorAll(".botonComprar");

    botonesComprar.forEach((boton) => {

        boton.addEventListener("click",(e)=> {
            

            const showSeleccionado = shows.find((el) => {
                return el.id == e.target.id;
            });

            let compra = new Compra (showSeleccionado.artista,showSeleccionado.precio,showSeleccionado.id);

            let yaExiste = carrito.some((el) => {

                return el.artistaSeleccionado === compra.artistaSeleccionado;

            })
            
            
            if(yaExiste){

                Toastify({
                    text: "Ya añadiste este show a tu carrito",
                    duration: 2500,
                    gravity: "bottom",
                    position: "center",
                    style: {
                        background: "#FFD93D",
                        color:"#000000"
                    }
                }).showToast();

                console.log("Ya existe");

            } else {

                carrito.push(compra);

                actualizarCarrito()

            };

        });

    });
};

const agregarCardAHTML = (evento) => {

    let card = document.createElement("div");
    card.setAttribute("class","card");

    contenedorCards.appendChild(card);

    let imagen = document.createElement("img");
    imagen.setAttribute("class","imgCard");
    imagen.setAttribute("src",evento.img);
    imagen.setAttribute("alt",evento.artista);

    card.appendChild(imagen);

    let tituloCard = document.createElement("p");
    tituloCard.setAttribute("class","nombreShow")
    tituloCard.innerText = evento.artista;
    
    card.appendChild(tituloCard);

    let botonesCard = document.createElement("div");
    botonesCard.setAttribute("class","botonesCards");

    card.appendChild(botonesCard);

    let contenedorPrecio = document.createElement("div");
    contenedorPrecio.setAttribute("class","contenedorPrecio");

    botonesCard.appendChild(contenedorPrecio);

    let precio = document.createElement("p");
    precio.setAttribute("class", "precioShow")
    precio.innerText = "$" + evento.precio;

    contenedorPrecio.appendChild(precio);

    let botonComprar = document.createElement("button");

    botonComprar.setAttribute("class","botonComprar");
    botonComprar.setAttribute("id",evento.id);
    botonComprar.innerText = "Comprar";

    botonesCard.appendChild(botonComprar);

};


const mostrarMensajeSinResultados = () => {

    let mensajeError = document.createElement("p");
    mensajeError.setAttribute("id","errorBusqueda");
    mensajeError.innerText = "No encontramos el evento que buscas :("

    contenedorCards.appendChild(mensajeError);

};

const buscar = () => {

    let busqueda = buscador.value.toLowerCase();

    let comparacion;

    contenedorCards.innerHTML = "";


    for(let show of shows){
        
        comparacion = show.artista.toLowerCase();

        if(comparacion.includes(busqueda)){
            
            agregarCardAHTML(show);
            
        };

    };

    if(contenedorCards.innerHTML == ""){

        mostrarMensajeSinResultados();

    };

    asignarEventoBotonComprar();

};

const asignarEventoBotonEliminar = () => {

   botonesEliminar = document.querySelectorAll(".botonEliminar");

   botonesEliminar.forEach((boton) => {

        boton.addEventListener("click",(e) =>{

            let ticketAEliminar = e.path[1].id;

            let indiceAEliminar = carrito.map( el => el.idShowSeleccionado == ticketAEliminar).indexOf(true)

            carrito.splice(indiceAEliminar,1);

            actualizarCarrito()

        })

   })
   

   
};

const contadorCarrito = () => {

    let contador = document.getElementById("contadorCarrito");

    contador.innerText = carrito.length;

}

const actualizarCarrito = () => {

    contenedorTicketsAComprar.innerHTML = "";

    contenedorListaItems.innerHTML = "";

    totalCompra = 0;
    
    if(localStorage.getItem("storageCarrito") == "null" || carrito === "undefined"){
    carrito = [];
    };

    localStorage.setItem("storageCarrito", JSON.stringify(carrito));
    
    if(carrito.length == 0){
        
        let mensajeCarritoVacio = document.createElement("p");
        mensajeCarritoVacio.setAttribute("id","mensajeCarritoVacio")
        mensajeCarritoVacio.innerText = "Carrito vacío";

        contenedorTicketsAComprar.appendChild(mensajeCarritoVacio);

        precioTotal.innerText = `$${totalCompra}`

    }else{

        carrito.forEach(ticket => mostrarTicketsEnCarrito(ticket));

        asignarEventoBotonEliminar();

    }

    contadorCarrito();

    

};

const mostrarTicketsEnCarrito = (ticket) => {

    let contenedorTicket = document.createElement("div");
    contenedorTicket.setAttribute("class","contenedorTicket");

    contenedorTicketsAComprar.appendChild(contenedorTicket);

    let item = document.createElement("div");
    item.setAttribute("class","ticket");

    contenedorTicket.appendChild(item);

    let nombreTicket = document.createElement("p");
    nombreTicket.setAttribute("class","nombreTicket");
    nombreTicket.innerText = ticket.artistaSeleccionado;

    item.appendChild(nombreTicket);

    let botonEliminar = document.createElement("button");
    botonEliminar.setAttribute("class","botonEliminar");
    botonEliminar.setAttribute("id",ticket.idShowSeleccionado);

    contenedorTicket.appendChild(botonEliminar);

    let iconoEliminar = document.createElement("img");

    iconoEliminar.setAttribute("src","./media/design/icono_eliminar_amarillo_1.png");
    iconoEliminar.setAttribute("alt","eliminar");

    botonEliminar.appendChild(iconoEliminar);

    let contenedorDetalleItem = document.createElement("div");

    contenedorDetalleItem.setAttribute("class","item");

    contenedorListaItems.appendChild(contenedorDetalleItem);

    let nombreItem = document.createElement("p");

    nombreItem.setAttribute("class","nombreItem");
    nombreItem.innerText = ticket.artistaSeleccionado;

    contenedorDetalleItem.appendChild(nombreItem);

    let precioItem = document.createElement("p");

    precioItem.setAttribute("class","precioItem")
    precioItem.innerText = `$${ticket.precioShowSeleccionado}`;

    contenedorDetalleItem.appendChild(precioItem);

    totalCompra = totalCompra + ticket.precioShowSeleccionado;

    precioTotal.innerText = `$${totalCompra}`;

};

const confirmarCompra = () =>
{
    if(carrito.length > 0){

        Swal.fire({
            title: `Compra realizada con éxito`,
            color: "#000000",
            icon: "success",
            showConfirmButton: false,
            iconColor: "#5BB765",
            background: "#FFD93D",
            allowOutsideClick:   false,
            width: "500px",
            timer: 2500
        }).then(() => {

            carrito.splice(0,carrito.length);

            actualizarCarrito();

            let modalCarrito = document.getElementById("contenedorModalCarrito");

            modalCarrito.style.display = "none";
        });  
    }
};

obtenerEventos();

buscador.addEventListener("input", buscar);

botonConfirmacionCompra.addEventListener("click",confirmarCompra);

actualizarCarrito();

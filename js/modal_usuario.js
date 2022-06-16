let modalInicio = document.getElementById("contenedorModalInicio");

let inputNombreUsuario = document.getElementById("inputModalInicio");

let nombreMensajeBienvenida = document.getElementById("nombreMensajeBienvenida");

let nombreUsuario = localStorage.getItem("nombreUsuario");

localStorage.setItem("nombreUsuario", nombreUsuario);

if(localStorage.getItem("nombreUsuario") == "null" || nombreUsuario == "undefined" || nombreUsuario == " "){

    modalInicio.style.display = "flex";

}else if(nombreUsuario != null){

    modalInicio.style.display = "none";
    
    nombreMensajeBienvenida.innerText = `, ${nombreUsuario}`;

    Swal.fire({
        
        title: `Eres ${nombreUsuario}?`,
        color: "#000000",
        icon: "question",
        iconColor: "#000000",
        background: "#FFD93D",
        allowOutsideClick: false,
        showConfirmButton: true,
        confirmButtonText: "Si, soy yo.",
        confirmButtonColor: "#36AE7C",
        showDenyButton: true,
        denyButtonText: "No",
        denyButtonColor: "#EB5353"
    }).then((result) => {

        if(result.isDenied){

            localStorage.removeItem("nombreUsuario");
            
            localStorage.removeItem("storageCarrito");
            
            carrito = [];
            
            modalInicio.style.display = "flex";

        };

    });

};

inputNombreUsuario.addEventListener("change", () => {

    nombreUsuario = inputNombreUsuario.value;

    if(nombreUsuario != ""){
    
        modalInicio.style.display = "none";

        nombreMensajeBienvenida.innerText = `, ${nombreUsuario}`;
    
        localStorage.setItem("nombreUsuario", nombreUsuario);
    
    };

});


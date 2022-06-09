let carrusel = document.getElementById("carrusel");

let diapositiva = document.querySelectorAll(".contenedorImgCarrusel");

let contador = 1;

let intervalo = 3500;

setInterval(function(){

    slides();

},intervalo);

const slides = () => {

    carrusel.style.transform = "translate("+ (-800*contador)+"px)";

    carrusel.style.transition = "transform 1s";

    contador++;

    if(contador == diapositiva.length){

        setTimeout(function(){

            carrusel.style.transform = "translate(0px)";

            carrusel.style.transition = "transform 0s";

            
            contador = 1;

        }, 1000);

    }

};
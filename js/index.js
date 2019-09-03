let palabraElegida;
let letraElegida;
let cantidadDeLetrasDeLaPalabra;
let turnos;
let guiones = [];
let letrasErroneas = [];

$(document).ready(function () {

let inputLetra = $("#input-letra");
let textoLetra = $("#texto-letra");
let hueco = $("#contexto-palabra");
let principal = $("#principal");
let secundario = $("#secundario");
let terciario = $("#terciario");
let cuarto = $("#cuarto");
let footer = $("#footer");
let iniciar = $("#boton-iniciar");
let chequear = $("#boton-chequear");
let generar = $("#generar-palabra");
let spanCantidad = $("#span-cantidad");
let spanTurnos = $("#span-turnos");
let spanLetrasErroneas = $("#span-letras-ingresadas");

secundario.hide(), terciario.hide(), cuarto.hide(), footer.hide();

iniciar.click(function () {
    
    principal.hide();
    secundario.show(), terciario.show(), cuarto.show(), footer.show();
    iniciarJuego();
});

chequear.click(function () {

    letraElegida = inputLetra.val().toUpperCase()
    letraElegida = quitarTildes(letraElegida);
    chequearLetraIngresada(letraElegida);
    inputLetra.val('');
    chequearPartida();
});

generar.click(function() {

    textoLetra.html("Ingrese la letra que desea buscar:");
    inputLetra.val('');
    inputLetra.removeAttr('disabled');
    chequear.show();
    guiones = [];
    letrasErroneas = [];
    spanLetrasErroneas.html("");
    iniciarJuego();
})

function generaPalabra() 
{
    var aleatorio = Math.floor(Math.random() * (listado.length));
    palabraElegida = listado[aleatorio].toUpperCase();
    palabraElegida = quitarTildes(palabraElegida);
    console.log(palabraElegida);
}

function dibujarGuiones(tamanioPalabra)
{
    for (var i = 0; i < tamanioPalabra; i++)
    {
        guiones[i] = "_";
    }
    hueco.html(guiones.join(" "));
}

function insertarDatosEnFooter()
{
    spanCantidad.html(cantidadDeLetrasDeLaPalabra);
    spanTurnos.html(turnos);
}

function chequearLetraIngresada(letra)
{
    if(palabraElegida.indexOf(letra) === -1)
    {
        letrasErroneas.push(letra);
        spanLetrasErroneas.html(letrasErroneas.join("-"));

        turnos--;
        spanTurnos.html(turnos);

    }else{

        for (let  i= 0; i < palabraElegida.length; i++)
        {
            if(palabraElegida[i] === letra)
            {
                colocarLetras(i, letra);
            }
        }
    }
}

function colocarLetras(posicion, caracter)
{
    guiones[posicion] = caracter;
    hueco.html(guiones.join(" "));
}

function chequearPartida()
{
    if(  palabraElegida === guiones.join("")  )
    {
        mostrarDatosResultado("¡¡¡ GANASTE !!!");

    }else if(  turnos === 0  ){

        mostrarDatosResultado("¡¡¡ PERDISTE !!!");
    }
}

function mostrarDatosResultado(textoAMostrar)
{
    textoLetra.html(textoAMostrar);
    chequear.hide();
    inputLetra.attr('disabled','disabled');
}

function quitarTildes(cadena)
{
    let caracteres = {
        "á":"a", "é":"e", "í":"i", "ó":"o", "ú":"u",
        "Á":"A", "É":"E", "Í":"I", "Ó":"O", "Ú":"U"
    }

    let expresion = /[áéíóúÁÉÍÓÚ]/;

    let palabra = cadena.replace(expresion, function(e){
        return caracteres[e];
    });

    return palabra;
}

function iniciarJuego()
{    
    generaPalabra();
    cantidadDeLetrasDeLaPalabra = palabraElegida.length;
    turnos = cantidadDeLetrasDeLaPalabra + 1;
    dibujarGuiones(cantidadDeLetrasDeLaPalabra);
    insertarDatosEnFooter();
}

});
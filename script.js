// || VARIABLES GLOBALES ||
puntosA = 0;
sumaPuntosA = 0;
puntosB = 0;
sumaPuntosB = 0;
const reload = document.getElementById('reload');
const comenzarJuego = document.getElementById('comenzarJuego');

// || GENERADOR DE NUMEROS ||

function numGenA(){
    contenedorPuntosA = document.getElementById('puntosA').textContent;
    
    if (sumaPuntosA <= 20) {
        puntosA = Math.floor(Math.random()* 10) + 1;
        sumaPuntosA += puntosA;
        contenedorPuntosA = sumaPuntosA;
        document.getElementById('puntosA').textContent = 'Puntos: ' + contenedorPuntosA;
    }
    return sumaPuntosA
}

function numGenB(){
    contenedorPuntosB = document.getElementById('puntosB');
    let formateo;
    
    if (sumaPuntosB <= 20) {
        puntosB = Math.floor(Math.random()* 10) + 1;
        formateo = puntosB < 10 ? puntosB.toString().padStart(2, '0') : puntosB.toString();
        sumaPuntosB += puntosB;
        contenedorPuntos = sumaPuntosB;
        contenedorPuntosB.textContent = 'Puntos: ' + contenedorPuntos;
    }
    return sumaPuntosB
}

// || BOTON COMENZAR PARTIDA ||

comenzarJuego.addEventListener('click', function(){
    document.getElementById('tableroPrincipal').style.filter = 'none';
    comenzarJuego.style.display = 'none';
    numGenA();

})

// || BOTON REINICIAR PARTIDA ||

reload.addEventListener('click', (_) =>{
    location.reload();
});
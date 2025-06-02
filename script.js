// || VARIABLES GLOBALES ||
puntosA = 0;
sumaPuntosA = 0;
puntosB = 0;
sumaPuntosB = 0;


// || FUNCIONES ||

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
    contenedorPuntos = document.getElementById('puntosB').textContent;
    
    if (sumaPuntosB <= 20) {
        puntosB = Math.floor(Math.random()* 10) + 1;
        sumaPuntosB += puntosB;
        contenedorPuntos = sumaPuntosB;
        document.getElementById('puntosB').textContent = 'Puntos: ' + contenedorPuntos;
    }
    return sumaPuntosB
}

function gameFlow(){
    console.log(sumaPuntosA)
    console.log(sumaPuntosB)
}
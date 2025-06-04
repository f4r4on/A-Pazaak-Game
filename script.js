// || VARIABLES GLOBALES ||
const reload = document.getElementById('reload');
const comenzarJuego = document.getElementById('comenzarJuego');
const jugadores = {
    A: {
        suma: 0,
        elemento: document.getElementById('puntosA'),
        habilitado: false
    },

    B: {
        suma: 0,
        elemento: document.getElementById('puntosB'),
        habilitado: false
    }
};
let turnoActual = null;

// || GENERADOR DE NUMEROS ||

function numGen(jugador){
    const data = jugadores[jugador];
    // if (!data.habilitado){
    //     return false;
    // }
    if (data.suma <= 20){
        const puntos = Math.floor(Math.random()* 10) + 1;
        data.suma += puntos;
        if (data.suma <= 9){
            data.elemento.textContent = 'Puntos: 0' + data.suma;
        } else {
            data.elemento.textContent = 'Puntos: ' + data.suma;
        }
    }
    return data.suma;
}

// || BOTON COMENZAR PARTIDA ||

comenzarJuego.addEventListener('click', function(){
    document.getElementById('tableroPrincipal').style.filter = 'none';
    comenzarJuego.style.display = 'none';
    setTimeout(() => {
        numGen('A');
    }, 500);
})

// || BOTON REINICIAR PARTIDA ||

reload.addEventListener('click', (_) =>{
    location.reload();
});

// || GAMEFLOW ||


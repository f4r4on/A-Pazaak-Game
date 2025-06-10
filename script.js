// || VARIABLES GLOBALES ||
let turnoActual = null;
const reload = document.getElementById('reload');
const comenzarJuego = document.getElementById('comenzarJuego');
const pasarTurno = document.getElementById('pasarTurno');
const plantarse = document.getElementById('plantarse');
const jugadores = {
    A: {
        suma: 0,
        elemento: document.getElementById('puntosA'),
        habilitado: false,
        plantado: false,
        ganador: false,
        vidas: 3
    },

    B: {
        suma: 0,
        elemento: document.getElementById('puntosB'),
        habilitado: false,
        plantado: false,
        ganador: false,
        vidas: 3
    }
};

// || GENERADOR DE NUMEROS ||

function numGen(jugador){
    const data = jugadores[jugador];
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

// || BOTON REINICIAR PARTIDA ||

reload.addEventListener('click', (_) =>{
    location.reload();
});

// || BUCLE IA ||

function jugarIA(){
    if (!jugadores.B.habilitado || jugadores.B.plantado) return;
    const puntosB = numGen('B');

    if (puntosB > 20){
        finalizarPartida('A');
        return;
    }

    if (jugadores.A.plantado){
        if (puntosB > jugadores.A.suma) {
            finalizarPartida('B');
            return;
        } else {
            setTimeout(jugarIA, 500);
        }
        return;
    }

    if (puntosB === 20){
        jugadores.B.plantado = true;
        jugadores.B.habilitado = false;
        let textoGanador2 = document.getElementById('texto2');
        let ganador2 = document.getElementById('ganador2');
        ganador2.style.background = '#08392B';
        textoGanador2.hidden = false;
        textoGanador2.textContent = 'Plantado'
        setTimeout(turnoA, 500);
        return;
    }

    if (puntosB >= 17){
        jugadores.B.plantado = true;
        jugadores.B.habilitado = false;
        let textoGanador2 = document.getElementById('texto2');
        let ganador2 = document.getElementById('ganador2');
        ganador2.style.background = '#08392B';
        textoGanador2.hidden = false;
        textoGanador2.textContent = 'Plantado'
        setTimeout(turnoA, 500);
        return;
    }

    setTimeout(turnoA, 500);
}

// || TURNOS ||

function turnoA(){
    turnoActual = 'A';
    pasarTurno.disabled = true;
    plantarse.disabled = true;

    const puntosA = numGen('A')
    jugadores.A.habilitado = true;
    jugadores.B.habilitado = false;
    
    if (puntosA > 20){
        finalizarPartida('B');
        return;
    }

    if (puntosA === 20){
        jugadores.A.plantado = true;
        jugadores.A.habilitado = false;
        setTimeout(turnoB, 500);
        return;
    }

    pasarTurno.disabled = false;
    plantarse.disabled = false;
}

function turnoB(){
    turnoActual = 'B';
    jugadores.A.habilitado = false;
    jugadores.B.habilitado = true;
    if (jugadores.B.plantado) {
        if (jugadores.A.plantado) {
            if (jugadores.A.suma > jugadores.B.suma) {
                finalizarPartida('A');
            } else if (jugadores.A.suma < jugadores.B.suma) {
                finalizarPartida('B');
            } else {
                finalizarPartida('empate');
            }
            return;
        }
        setTimeout(turnoA, 500);
        return;
    }
    jugarIA();
}

// || BOTON PASAR TURNO ||

pasarTurno.addEventListener('click', function(){
    if (turnoActual !== 'A' || jugadores.A.habilitado === false) return;
    pasarTurno.disabled = true;
    plantarse.disabled = true;
    jugadores.A.habilitado = false
    turnoB();
});

// || BOTON PLANTARSE ||

plantarse.addEventListener('click', function(){
    if (turnoActual !== 'A' || jugadores.A.habilitado === false) return;
    jugadores.A.plantado = true;
    pasarTurno.disabled = true;
    plantarse.disabled = true;
    jugadores.A.habilitado = false;
    let textoGanador1 = document.getElementById('texto1');
    let ganador1 = document.getElementById('ganador1');
    ganador1.style.background = '#08392B';
    textoGanador1.hidden = false;
    textoGanador1.textContent = 'Plantado'
    turnoB();
});

// || BOTON COMENZAR PARTIDA ||

comenzarJuego.addEventListener('click', function(){
    document.getElementById('tableroPrincipal').style.filter = 'none';
    comenzarJuego.style.display = 'none';
    setTimeout(() => {
        turnoA();
    }, 500);
})

// || FINALIZAR PARTIDA ||

function finalizarPartida(ganador){
    jugadores.A.habilitado = false;
    jugadores.B.habilitado = false;
    pasarTurno.disabled = true;
    plantarse.disabled = true;
    switch (ganador) {
        case 'A':
            let ganador1 = document.getElementById('ganador1');
            let textoGanador1 = document.getElementById('texto1');
            ganador1.style.background = '#08392B';
            textoGanador1.textContent = '¡El Jugador 1 es el ganador!';
            textoGanador1.hidden = false;
            break;
        case 'B':
            let ganador2 = document.getElementById('ganador2');
            let textoGanador2 = document.getElementById('texto2');
            ganador2.style.background = '#08392B';
            textoGanador2.textContent = '¡El Jugador 2 es el ganador!';
            textoGanador2.hidden = false;
            break;
        case 'empate':
            let empate1 = document.getElementById('ganador1');
            let textoEmpate1 = document.getElementById('texto1');
            textoEmpate1.textContent = 'Empate'
            empate1.style.background = '#08392B';
            textoEmpate1.hidden = false;
            let empate2 = document.getElementById('ganador2');
            let textoEmpate2 = document.getElementById('texto2');
            textoEmpate2.textContent = 'Empate'
            empate2.style.background = '#08392B';
            textoEmpate2.hidden = false;
            break;
    }
}


// || VARIABLES GLOBALES ||
let turnoActual = null;
const reload = document.getElementById('reload');
const comenzarJuego = document.getElementById('comenzarJuego');
const pasarTurno = document.getElementById('pasarTurno');
const plantarse = document.getElementById('plantarse');
const listaHuecosCartas = document.querySelectorAll('.carta');
const listaHuecosCartasMano = document.querySelectorAll('.cartaMano');
const listaHuecosCartasA = document.querySelectorAll('.zcA');
const listaHuecosCartasB = document.querySelectorAll('.zcB');
const listaHuecosManoA = document.querySelectorAll('.cmA');
const listaHuecosManoB = document.querySelectorAll('.cmB');
let cartaSeleccionada1 = "";
let cartaSeleccionada2 = "";
let cartaSeleccionadaTemp = "";
const jugadores = {
    A: {
        suma: 0,
        elemento: document.getElementById('puntosA'),
        habilitado: false,
        plantado: false,
        ganador: false,
        vidas: 3,
        cartas: []
    },

    B: {
        suma: 0,
        elemento: document.getElementById('puntosB'),
        habilitado: false,
        plantado: false,
        ganador: false,
        vidas: 3,
        cartas: []
    }
};

// || RECUPERAR LOS HUECOS DE LAS CARTAS ||

listaHuecosCartas.forEach(card => {
    card.addEventListener('click', () => {

        if (cartaSeleccionada1 == "") {
            cartaSeleccionada1 = card.id;
        }
        else if (cartaSeleccionada2 == "") {
            cartaSeleccionada2 = card.id;
        } else {
            cartaSeleccionada1 = "";
            cartaSeleccionada2 = "";
        }
    });
});

// || GENERADOR DE NUMEROS ||

function numGen(jugador) {
    const data = jugadores[jugador];
    if (data.suma <= 20) {
        const puntos = Math.floor(Math.random() * 10) + 1;
        data.suma += puntos;
        let tempPuntos = 0;

        if (jugador == "A") {
            for (const card of listaHuecosCartasA) {
                if (card.textContent == "") {
                    card.textContent = puntos;
                    tempPuntos += parseInt(card.textContent, 10);
                    if (tempPuntos <= 9){
                        data.elemento.textContent = 'Puntos: 0' + tempPuntos;
                    } else {
                        data.elemento.textContent = 'Puntos: ' + tempPuntos;
                    }
                    return tempPuntos;
                } else {
                    tempPuntos += parseInt(card.textContent, 10);
                    if (tempPuntos < 0){
                        tempPuntos = 0;
                    }
                }
            }
        }

        if (jugador == "B") {
            for (const card of listaHuecosCartasB) {
                if (card.textContent == "") {
                    card.textContent = puntos;
                    tempPuntos += parseInt(card.textContent, 10);
                    if (tempPuntos <= 9){
                        data.elemento.textContent = 'Puntos: 0' + tempPuntos;
                    } else {
                        data.elemento.textContent = 'Puntos: ' + tempPuntos;
                    }
                    return tempPuntos;
                } else {
                    tempPuntos += parseInt(card.textContent, 10);
                }
            }
        }
    }

    return data.suma;
}

// || GENERAR CARTAS MANO ||

function handCarGen(jugador) {
    const data = jugadores[jugador];
    while (data.cartas.length < 4) {
        const signo = Math.random() < 0.5 ? 1 : -1;
        const valorCarta = (Math.floor(Math.random() * 6) + 1) * signo;
        data.cartas.push(valorCarta);
        
        if (jugador == 'A') {
            console.log("Jugador recibe:", valorCarta);
        }

        if (jugador == 'B') {
            console.log("IA recibe:", valorCarta);
        }
    }
}

// || ASIGNAR CARTAS TABLERO ||

function asignarImagenCartas() {
    for (const card of listaHuecosCartasA) {
        if (card.textContent != "" && card.children.length === 0) {
            const contenedor = document.getElementById(card.id);
            const img = document.createElement("img");
            const imgName = ("green-" + card.textContent + ".png");
            img.src = "img/green/" + imgName;
            img.alt = "";
            img.className = "cardImage";
            contenedor.appendChild(img);
        }
    }
    for (const card of listaHuecosCartasB) {
        if (card.textContent != "" && card.children.length === 0) {
            const contenedor = document.getElementById(card.id);
            const img = document.createElement("img");
            const imgName = ("green-" + card.textContent + ".png");
            img.src = "img/green/" + imgName;
            img.alt = "";
            img.className = "cardImage";
            contenedor.appendChild(img);
        }
    }
}

// || ASIGNAR CARTAS MANO ||

function asignarImagenCartasMano(){
    for (const card of listaHuecosManoA){
        if (card.textContent != "" && card.children.length === 0){
            const contenedor = document.getElementById(card.id);
            const valor = parseInt(card.textContent, 10);
            const color = valor > 0 ? 'blue' : 'red';
            const nombre = Math.abs(valor);
            const img = document.createElement('img');
            img.src = `img/${color}/${color}-${nombre}.png`;
            img.alt = '';
            img.className = 'cardImage';
            contenedor.appendChild(img);
        }
    }
}

function escribirCartasEnMano(jugador){
    if (jugador !== 'A') return;
    const lista = listaHuecosManoA;
    const cartas = jugadores[jugador].cartas;
    for (let i = 0; i < cartas.length; i++){
        lista[i].textContent = cartas[i];
    }
}

// || JUGAR CARTAS MANO ||

function jugarCartasMano(){
    listaHuecosManoA.forEach(card => {
        card.addEventListener('click', () =>{
            const valor = parseInt(card.textContent, 10);

            if (!jugadores.A.habilitado) return;
            if (card.textContent === '') return;
            if (isNaN(valor)) return;

            jugadores.A.suma += valor;

            if (jugadores.A.suma < 0){
                jugadores.A.suma = 0;
            }

            jugadores.A.elemento.textContent = jugadores.A.suma < 10
                ? 'Puntos: 0' + jugadores.A.suma
                : 'Puntos: ' + jugadores.A.suma;
            
            for (const hueco of listaHuecosCartasA){
                if (hueco.textContent === ''){
                    hueco.textContent = valor;
                    const color = valor > 0 ? 'blue' : 'red';
                    const nombre = Math.abs(valor);
                    const img = document.createElement("img");
                    img.src = `img/${color}/${color}-${nombre}.png`;
                    img.alt = "";
                    img.className = "cardImage";
                    hueco.appendChild(img);
                    break;
                }
            }
            card.textContent = "";
            card.innerHTML = "";

            const i = jugadores.A.cartas.indexOf(valor);
            if (i !== -1) {
                jugadores.A.cartas.splice(i, 1);
            }

            if (jugadores.A.suma > 20) {
                finalizarPartida('B');
                return;
            }

            if (jugadores.A.suma === 20) {
                jugadores.A.plantado = true;
                jugadores.A.habilitado = false;
                let textoGanador1 = document.getElementById('texto1');
                let ganador1 = document.getElementById('ganador1');
                ganador1.style.background = '#08392B';
                ganador1.style.display = 'flex';
                textoGanador1.textContent = 'Plantado';
                setTimeout(turnoB, 500);
            }

            listaHuecosManoA.forEach(c => {
                c.style.pointerEvents = 'none';
            })

            setTimeout(turnoB, 500);
        });
    });
}

// || BUCLE IA ||

function jugarIA() {
    if (!jugadores.B.habilitado || jugadores.B.plantado) return;
    const puntosB = numGen('B');
    asignarImagenCartas()

    if (puntosB > 20) {
        finalizarPartida('A');
        return;
    }

    if (jugadores.A.plantado) {
        if (puntosB > jugadores.A.suma) {
            finalizarPartida('B');
            return;
        } else {
            setTimeout(jugarIA, 500);
        }
        return;
    }

    if (puntosB === 20) {
        jugadores.B.plantado = true;
        jugadores.B.habilitado = false;
        let textoGanador2 = document.getElementById('texto2');
        let ganador2 = document.getElementById('ganador2');
        ganador2.style.background = '#08392B';
        ganador2.style.display = 'flex';
        textoGanador2.textContent = 'Plantado'
        setTimeout(turnoA, 500);
        return;
    }

    if (puntosB >= 17) {
        jugadores.B.plantado = true;
        jugadores.B.habilitado = false;
        let textoGanador2 = document.getElementById('texto2');
        let ganador2 = document.getElementById('ganador2');
        ganador2.style.background = '#08392B';
        ganador2.style.display = 'flex';
        textoGanador2.textContent = 'Plantado'
        setTimeout(turnoA, 500);
        return;
    }
    setTimeout(turnoA, 500);
}

// || TURNOS ||

function turnoA() {
    turnoActual = 'A';
    pasarTurno.disabled = true;
    plantarse.disabled = true;

    const puntosA = numGen('A')
    asignarImagenCartas()
    jugadores.A.habilitado = true;
    jugadores.B.habilitado = false;

    if (puntosA > 20) {
        finalizarPartida('B');
        return;
    }

    if (puntosA === 20) {
        jugadores.A.plantado = true;
        jugadores.A.habilitado = false;
        let textoGanador1 = document.getElementById('texto1');
        let ganador1 = document.getElementById('ganador1');
        ganador1.style.background = '#08392B';
        ganador1.style.display = 'flex';
        textoGanador1.textContent = 'Plantado'
        setTimeout(turnoB, 500);
        return;
    }

    pasarTurno.disabled = false;
    plantarse.disabled = false;

    listaHuecosManoA.forEach(c => {
        c.style.pointerEvents = 'auto';
    })
}

function turnoB() {
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

pasarTurno.addEventListener('click', function () {
    if (turnoActual !== 'A' || jugadores.A.habilitado === false) return;
    pasarTurno.disabled = true;
    plantarse.disabled = true;
    jugadores.A.habilitado = false
    turnoB();
});

// || BOTON PLANTARSE ||

plantarse.addEventListener('click', function () {
    if (turnoActual !== 'A' || jugadores.A.habilitado === false) return;
    jugadores.A.plantado = true;
    pasarTurno.disabled = true;
    plantarse.disabled = true;
    jugadores.A.habilitado = false;
    let textoGanador1 = document.getElementById('texto1');
    let ganador1 = document.getElementById('ganador1');
    ganador1.style.background = '#08392B';
    ganador1.style.display = 'flex';
    textoGanador1.textContent = 'Plantado'
    turnoB();
});

// || BOTON REINICIAR PARTIDA ||

reload.addEventListener('click', (_) => {
    location.reload();
});

// || BOTON COMENZAR PARTIDA ||

comenzarJuego.addEventListener('click', function () {
    handCarGen('A');
    handCarGen('B');
    escribirCartasEnMano('A');
    escribirCartasEnMano('B');
    asignarImagenCartasMano();
    jugarCartasMano();
    document.getElementById('tableroPrincipal').style.filter = 'none';
    comenzarJuego.style.display = 'none';
    setTimeout(() => {
        turnoA();
    }, 500);
})

// || FINALIZAR PARTIDA ||

function finalizarPartida(ganador) {
    jugadores.A.habilitado = false;
    jugadores.B.habilitado = false;
    pasarTurno.disabled = true;
    plantarse.disabled = true;
    switch (ganador) {
        case 'A':
            let ganador1 = document.getElementById('ganador1');
            let textoGanador1 = document.getElementById('texto1');
            ganador1.style.display = 'flex';
            ganador1.style.background = '#08392B';
            textoGanador1.textContent = '¡El Jugador 1 es el ganador!';

            console.log("Ganador A")
            break;
        case 'B':
            let ganador2 = document.getElementById('ganador2');
            let textoGanador2 = document.getElementById('texto2');
            ganador2.style.display = 'flex';
            ganador2.style.background = '#08392B';
            textoGanador2.textContent = '¡El Jugador 2 es el ganador!';

            console.log("Ganador B")
            break;
        case 'empate':
            let empate1 = document.getElementById('ganador1');
            let textoEmpate1 = document.getElementById('texto1');
            empate1.style.display = 'flex';
            textoEmpate1.textContent = 'Empate'
            empate1.style.background = '#08392B';
            let empate2 = document.getElementById('ganador2');
            let textoEmpate2 = document.getElementById('texto2');
            empate2.style.display = 'flex';
            textoEmpate2.textContent = 'Empate'
            empate2.style.background = '#08392B';


            console.log("Ganador E")
            break;
    }
}
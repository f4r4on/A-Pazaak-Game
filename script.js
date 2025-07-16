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

function asignarImagenCartasMano() {
    listaHuecosManoA.forEach((card, i) => {
        if (card.textContent !== "" && card.children.length === 0) {
            const valor = parseInt(card.textContent, 10);
            const color = valor > 0 ? 'blue' : 'red';
            const nombre = Math.abs(valor);
            const img = document.createElement('img');
            img.src = `img/${color}/${color}-${nombre}.png`;
            img.alt = '';
            img.className = 'cardImage';
            card.appendChild(img);
        }
    });

    listaHuecosManoB.forEach((card) => {
        if (card.textContent !== "" && card.children.length === 0) {
            const img = document.createElement('img');
            img.src = 'img/enemy/grey.png';
            img.alt = '';
            img.className = 'cardImage';
            card.appendChild(img);
        }
    });
}

function escribirCartasEnMano(jugador) {
    const lista = jugador === 'A' ? listaHuecosManoA : listaHuecosManoB;
    const cartas = jugadores[jugador].cartas;

    for (let i = 0; i < lista.length; i++) {
        lista[i].textContent = "";
        lista[i].innerHTML = "";

        if (cartas[i] !== undefined) {
            lista[i].textContent = cartas[i];
        }
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
        });
    });
}

// || BUCLE IA ||

function aplicarCartaIA(valorCarta){
    jugadores.B.suma += valorCarta;

    if (jugadores.B.suma < 0){
        jugadores.B.suma = 0;
    }

    jugadores.B.elemento.textContent = jugadores.B.suma < 10
        ? 'Puntos: 0' + jugadores.B.suma
        : 'Puntos: ' + jugadores.B.suma;

    for (const hueco of listaHuecosCartasB){
        if (hueco.textContent === ''){
            hueco.textContent = valorCarta;
            const color = valorCarta > 0 ? 'blue' : 'red';
            const nombre = Math.abs(valorCarta);
            const img = document.createElement('img');
            img.src = `img/${color}/${color}-${nombre}.png`;
            img.alt = "";
            img.className = "cardImage";
            hueco.appendChild(img);
            break
        }
    }

    const index = jugadores.B.cartas.indexOf(valorCarta);
    if (index !== -1){
        jugadores.B.cartas.splice(index, 1);
    }
}

function jugarIA() {
    if (!jugadores.B.habilitado || jugadores.B.plantado) return;
    const puntosB = numGen('B');
    asignarImagenCartas()

    if (jugadores.A.plantado && puntosB > jugadores.A.suma && puntosB <= 20) {
        jugadores.B.plantado = true;
        jugadores.B.habilitado = false;
        let textoGanador2 = document.getElementById('texto2');
        let ganador2 = document.getElementById('ganador2');
        ganador2.style.background = '#08392B';
        ganador2.style.display = 'flex';
        textoGanador2.textContent = 'Plantado';
        setTimeout(turnoA, 500);
        return;
    }

    if (puntosB > 20) {
        const cartaNegativa = jugadores.B.cartas.find(c => c < 0 && (puntosB + c) <= 20);
        if (cartaNegativa !== undefined) {
            aplicarCartaIA(cartaNegativa);
            escribirCartasEnMano('B');
            asignarImagenCartasMano();

            if (jugadores.B.suma === 20) {
                jugadores.B.plantado = true;
                jugadores.B.habilitado = false;
                let textoGanador2 = document.getElementById('texto2');
                let ganador2 = document.getElementById('ganador2');
                ganador2.style.background = '#08392B';
                ganador2.style.display = 'flex';
                textoGanador2.textContent = 'Plantado';
                setTimeout(turnoA, 500);
                return;
            }

            if (jugadores.A.plantado && jugadores.B.suma > jugadores.A.suma && jugadores.B.suma <= 20) {
                jugadores.B.plantado = true;
                jugadores.B.habilitado = false;
                let textoGanador2 = document.getElementById('texto2');
                let ganador2 = document.getElementById('ganador2');
                ganador2.style.background = '#08392B';
                ganador2.style.display = 'flex';
                textoGanador2.textContent = 'Plantado';
                setTimeout(turnoA, 500);
                return;
            }
            setTimeout(jugarIA, 500);
            return;
        }
        finalizarPartida('A');
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

    const cartaExacta = jugadores.B.cartas.find(c => puntosB + c === 20);
    if (cartaExacta !== undefined) {
        aplicarCartaIA(cartaExacta);
        jugadores.B.plantado = true;
        jugadores.B.habilitado = false;
        let textoGanador2 = document.getElementById('texto2');
        let ganador2 = document.getElementById('ganador2');
        ganador2.style.background = '#08392B';
        ganador2.style.display = 'flex';
        textoGanador2.textContent = 'Plantado';
        setTimeout(turnoA, 500);
        return;
    }

    if (jugadores.A.plantado) {
        
        if (jugadores.B.suma < 14) {
            setTimeout(jugarIA, 500);
            return;
        }

        if (jugadores.A.suma === 20) {
            const puedeEmpatar = jugadores.B.cartas.some(carta => (jugadores.B.suma + carta) === 20);
            if (puedeEmpatar) {
                const cartaEmpate = jugadores.B.cartas.find(carta => (jugadores.B.suma + carta) === 20);
                aplicarCartaIA(cartaEmpate);
                escribirCartasEnMano('B');
                asignarImagenCartasMano();
                jugadores.B.plantado = true;
                jugadores.B.habilitado = false;
                let textoGanador2 = document.getElementById('texto2');
                let ganador2 = document.getElementById('ganador2');
                ganador2.style.background = '#08392B';
                ganador2.style.display = 'flex';
                textoGanador2.textContent = 'Plantado';
                setTimeout(turnoA, 500);
                return;
            } else {
                // No puede empatar ahora, pero puede esperar cartas automáticas
                setTimeout(jugarIA, 500);
                return;
            }
        }

        for (const carta of jugadores.B.cartas) {
            const simulado = puntosB + carta;
            if (simulado > jugadores.A.suma && simulado <= 20) {
                aplicarCartaIA(carta);
                escribirCartasEnMano('B');
                asignarImagenCartasMano();

                if (jugadores.B.suma > jugadores.A.suma && jugadores.B.suma <= 20) {
                    jugadores.B.plantado = true;
                    jugadores.B.habilitado = false;
                    let textoGanador2 = document.getElementById('texto2');
                    let ganador2 = document.getElementById('ganador2');
                    ganador2.style.background = '#08392B';
                    ganador2.style.display = 'flex';
                    textoGanador2.textContent = 'Plantado';
                    setTimeout(turnoA, 500);
                    return;
                }
                setTimeout(jugarIA, 500);
                return;
            }
        }

        if (puntosB < jugadores.A.suma && puntosB < 20) {
            setTimeout(jugarIA, 500);
            return;
        }

        jugadores.B.plantado = true;
        jugadores.B.habilitado = false;
        let textoGanador2 = document.getElementById('texto2');
        let ganador2 = document.getElementById('ganador2');
        ganador2.style.background = '#08392B';
        ganador2.style.display = 'flex';
        textoGanador2.textContent = 'Plantado';
        setTimeout(turnoA, 500);
        return;
    }

    if (puntosB >= 17) {
        if (!jugadores.A.plantado) {
            jugadores.B.plantado = true;
            jugadores.B.habilitado = false;
            let textoGanador2 = document.getElementById('texto2');
            let ganador2 = document.getElementById('ganador2');
            ganador2.style.background = '#08392B';
            ganador2.style.display = 'flex';
            textoGanador2.textContent = 'Plantado';
            setTimeout(turnoA, 500);
            return;
        }

        if (puntosB >= jugadores.A.suma) {
            jugadores.B.plantado = true;
            jugadores.B.habilitado = false;
            let textoGanador2 = document.getElementById('texto2');
            let ganador2 = document.getElementById('ganador2');
            ganador2.style.background = '#08392B';
            ganador2.style.display = 'flex';
            textoGanador2.textContent = 'Plantado';
            setTimeout(turnoA, 500);
            return;
        }
        setTimeout(jugarIA, 500);
        return;
    }
    setTimeout(turnoA, 500);
}

// || RESALTADO DE TURNO ||

function resaltarTurno(jugador){
    jugadores.A.elemento.classList.remove('turno-activo');
    jugadores.B.elemento.classList.remove('turno-activo');
    jugadores[jugador].elemento.classList.add('turno-activo');
}

// || TURNOS A Y B ||

function turnoA() {
    if (jugadores.A.plantado) {
        setTimeout(turnoB, 500);
        return;
    }

    turnoActual = 'A';
    resaltarTurno('A');
    pasarTurno.disabled = true;
    plantarse.disabled = true;

    const puntosA = numGen('A')
    asignarImagenCartas()
    jugadores.A.habilitado = true;
    jugadores.B.habilitado = false;

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
    resaltarTurno('B');
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
    
    if (jugadores.A.suma > 20){
        finalizarPartida('B');
        return
    }
    setTimeout(turnoB, 500);
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

// || QUITAR VIDAS VISUAL ||

function quitarVidas(jugador){
    const vidasRestantes = jugadores[jugador].vidas;
    const clase = jugador === 'A' ? 'vida--jugadorA' : 'vida--jugadorB';
    const vidas = document.querySelectorAll(`.${clase}`);

    for (let i = 0; i < vidas.length; i++){
        if (i >= vidasRestantes){
            vidas[i].classList.add('vida--perdida');
        } else {
            vidas[i].classList.remove('vida--perdida');
        }
    }
}

// || BUCLE DE PARTIDAS ||

function reiniciarRonda(){
    jugadores.A.suma = 0;
    jugadores.A.plantado = false;
    jugadores.A.habilitado = false;
    jugadores.A.elemento.textContent = 'Puntos: 00';

    jugadores.B.suma = 0;
    jugadores.B.plantado = false;
    jugadores.B.habilitado = false;
    jugadores.B.elemento.textContent = 'Puntos: 00';

    [...listaHuecosCartasA, ...listaHuecosCartasB].forEach(card => {
        card.textContent = '';
        card.innerHTML = '';
    });

    listaHuecosManoA.forEach(card => {
    card.textContent = '';
    card.innerHTML = '';
    card.style.pointerEvents = 'auto';
    });

    document.getElementById('ganador1').style.display = 'none';
    document.getElementById('ganador2').style.display = 'none';

    escribirCartasEnMano('A');
    asignarImagenCartasMano('A');
    
    escribirCartasEnMano('B');
    asignarImagenCartasMano('B');
    
    jugarCartasMano();
    setTimeout(turnoA, 500);
}

// || RESULTADO FINAL PARTIDA ||

function mostrarGanadorFinal(ganador) {
    if (ganador === 'A') {
        let bloque = document.getElementById('ganador1');
        let texto = document.getElementById('texto1');
        bloque.style.display = 'flex';
        bloque.style.background = '#08392B';
        texto.textContent = '¡Has ganado la partida!';
    } else if (ganador === 'B') {
        let bloque = document.getElementById('ganador2');
        let texto = document.getElementById('texto2');
        bloque.style.display = 'flex';
        bloque.style.background = '#08392B';
        texto.textContent = '¡El Jugador 2 es el ganador!';
    }

    pasarTurno.disabled = true;
    plantarse.disabled = true;

    [...listaHuecosManoA, ...listaHuecosManoB].forEach(card => {
        card.style.pointerEvents = 'none';
    });
}

// || FINALIZAR PARTIDA ||

function finalizarPartida(ganador) {
    jugadores.A.habilitado = false;
    jugadores.B.habilitado = false;
    pasarTurno.disabled = true;
    plantarse.disabled = true;

    if (ganador === 'A'){
        jugadores.B.vidas--;
        quitarVidas('B');
    } else if (ganador === 'B'){
        jugadores.A.vidas--;
        quitarVidas('A');
    }

    switch (ganador) {
        case 'A':
            let ganador1 = document.getElementById('ganador1');
            let textoGanador1 = document.getElementById('texto1');
            ganador1.style.display = 'flex';
            ganador1.style.background = '#08392B';
            textoGanador1.textContent = '¡El Jugador 1 es el ganador!';
            break;
        case 'B':
            let ganador2 = document.getElementById('ganador2');
            let textoGanador2 = document.getElementById('texto2');
            ganador2.style.display = 'flex';
            ganador2.style.background = '#08392B';
            textoGanador2.textContent = '¡El Jugador 2 es el ganador!';
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
            break;
    }

    if (jugadores.A.vidas <= 0) {
        setTimeout(() => {
            mostrarGanadorFinal('B');
        }, 1000);
        return;
    }

    if (jugadores.B.vidas <= 0) {
        setTimeout(() => {
            mostrarGanadorFinal('A');
        }, 1000);
        return;
    }

    setTimeout(() => {
        reiniciarRonda();
    }, 1500);
}
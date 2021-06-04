var turno = 1;
var partitaFinita = false;
var daRicaricare = false;
var monoGiocatore = false;
var inizio = true;
var tabella = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
var punteggio = new Array(0, 0); // punteggio X e O rispettivamente

const X = 1;
const O = -1;
const VOID = 0;

document.addEventListener("click", function (event) {

    // resetto se si clicca sul bottone ricarica e se la partita è da ricaricare
    if (daRicaricare && (event.target.id === 'ricarica' || event.target.id === 'q4'))
        resetta();

    if (event.target.id[0] === 'q' && cellaLibera(tabella, parseInt(event.target.id[1]))) { // se è una cella della tabella e se la cella è libera ...

        if (turnoX(turno))
            tabella[parseInt(event.target.id[1])] = X; // aggiungi una X nella tabella

        // if (monoGiocatore && !partitaFinita) { // mossa computer se la modalità è giocatore singolo
        //     if (vincitore(tabella)[0] !== 0)
        //         eseguiEsito(); 
        //     else {
        //         console.log("mossa PC");
        //         tabella[mossaMigliore(tabella)] = O;
        //         ++turno;
        //     }
        // }
        else
            tabella[parseInt(event.target.id[1])] = O;

        ++turno; // turno successivo
        disegna(tabella);

        // CHI STA VINCENDO??

        let esito = vincitore(tabella);
        partitaFinita = true; // temporaneo

        if (turno > 9 && esito === VOID) { // se i turni sono finiti e l'esito è pari

            console.log("X e O pari");

        } else if (esito === X) { // se ha vinto la X ...

            console.log("vince la X");
            // document.getElementById("q" + esito[1][0]).innerHTML = document.getElementById("q" + esito[1][1]).innerHTML = document.getElementById("q" + esito[1][2]).innerHTML = '<svg fill="#43A047" width="85%" height="85%" viewBox="0 0 768 768"><path d="M751,31.9h0M743.5,0a24.5,24.5,0,0,0-17.3,7.2l-719,719a24.5,24.5,0,1,0,34.6,34.6l719-719A24.5,24.5,0,0,0,743.5,0Z" transform="translate(0 0)"/><path d="M24.5,0A24.5,24.5,0,0,0,7.2,41.8l719,719a24.5,24.5,0,0,0,34.6-34.6L41.8,7.2A24.5,24.5,0,0,0,24.5,0Z" transform="translate(0 0)"/></svg>';
            document.getElementById("pX").innerHTML = ++punteggio[0];

        } else if (esito === O) { // se ha vinto la O ...

            console.log("vince la O");
            // document.getElementById("q" + esito[1][0]).innerHTML = document.getElementById("q" + esito[1][1]).innerHTML = document.getElementById("q" + esito[1][2]).innerHTML = '<svg height="90%" width="90%"><circle cx="50%" cy="50%" r="30%" stroke="#1E88E5" stroke-width="4%" fill="none"/></svg>';
            document.getElementById("pO").innerHTML = ++punteggio[1];

        } else partitaFinita = false;

        // mossa computer
        if (monoGiocatore) {
            tabella[mossaMigliore(tabella)] = O;
            ++turno;
            disegna(tabella);
        }

    }

    // rendi visibile il bottone di ricarica
    if (partitaFinita) { 

        document.getElementById("q4").innerHTML = '<svg style="cursor:pointer;" id="ricarica" height="90%" width="90%" viewBox="0 0 504.1 578.1"><defs><style>.cls-1, .cls-2 {fill: none;stroke: black;stroke-miterlimit: 10;stroke-width: 4%;}.cls-2{stroke-linecap: round;}</style></defs><title>riprova</title><path class="cls-1" d="M332.2,180.3" transform="translate(-45.6 -131.9)"/><path class="cls-2" d="M54.6,420.9c0-134.2,108.8-243,243-243" transform="translate(-45.6 -131.9)"/><path class="cls-2" d="M332.2,180.3c117.9,16.8,208.5,118.1,208.5,240.6" transform="translate(-45.6 -131.9)"/><line class="cls-2" x1="215.1" y1="9" x2="252.1" y2="46"/><line class="cls-2" x1="252.1" y1="46" x2="215.1" y2="82.9"/><path class="cls-1" d="M263.1,661.6" transform="translate(-45.6 -131.9)"/><path class="cls-2" d="M540.7,420.9C540.7,555.2,431.9,664,297.6,664" transform="translate(-45.6 -131.9)"/><path class="cls-2" d="M263.1,661.6C145.2,644.8,54.6,543.4,54.6,420.9" transform="translate(-45.6 -131.9)"/><line class="cls-2" x1="289" y1="569.1" x2="252.1" y2="532.1"/><line class="cls-2" x1="252.1" y1="532.1" x2="289" y2="495.1"/></svg>';
        daRicaricare = true;

    }

    // scelgo la modalità di gioco - questa funzione viene eseguita al primo click
    if (inizio) {
        inizio = false;

        if (event.target.id === "q3") {
            monoGiocatore = true;
            document.getElementById("mod").innerHTML = "giocatore singolo"
        } else
            document.getElementById("mod").innerHTML = "due giocatori"

        for (let i = 0; i < 9; i++)
            document.getElementById("q" + i).style = "";

        resetta();

    }

});

function vincitore(tabella) {

    sequenzaVincente = new Array(new Array(0, 1, 2), new Array(3, 4, 5), new Array(6, 7, 8), new Array(0, 3, 6), new Array(1, 4, 7), new Array(2, 5, 8), new Array(0, 4, 8), new Array(2, 4, 6));

    for (let i = 0; i < 8; ++i) {
        if (tabella[sequenzaVincente[i][0]] !== 0 &&
            tabella[sequenzaVincente[i][0]] === tabella[sequenzaVincente[i][1]] &&
            tabella[sequenzaVincente[i][0]] === tabella[sequenzaVincente[i][2]]) {
            return tabella[sequenzaVincente[i][2]];
        }
    }

    return 0;

}

function disegna(tabella) {

    // metti X e O a seconda dell'array unidimensionale di 9 elementi

    for (let i = 0; i < 9; i++) {

        if (tabella[i] === O) {
            document.getElementById("q" + i).innerHTML = '<svg height="90%" width="90%"><circle cx="50%" cy="50%" r="30%" stroke="black" stroke-width="4%" fill="none"/></svg>';
        } else if (tabella[i] === X) {
            document.getElementById("q" + i).innerHTML = '<svg width="85%" height="85%" viewBox="0 0 768 768"><path d="M751,31.9h0M743.5,0a24.5,24.5,0,0,0-17.3,7.2l-719,719a24.5,24.5,0,1,0,34.6,34.6l719-719A24.5,24.5,0,0,0,743.5,0Z" transform="translate(0 0)"/><path d="M24.5,0A24.5,24.5,0,0,0,7.2,41.8l719,719a24.5,24.5,0,0,0,34.6-34.6L41.8,7.2A24.5,24.5,0,0,0,24.5,0Z" transform="translate(0 0)"/></svg>';
        }

    }
}

function resetta() { // resetta la tavola e l'ambiente di gioco

    for (i = 0; i < 9; ++i) {
        document.getElementById("q" + i).innerHTML = "";
    }

    partitaFinita = false;
    daRicaricare = false;
    tabella = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    turno = 1;

}

function cellaLibera(tabella, cella) {
    return (tabella[cella] === VOID) ? true : false;
}

function turnoX(turno) {
    return (turno % 2 === X) ? true : false;
}

// ----------------------------------------------------

function minimax(tabella, giocatore) {

    let esito = vincitore(tabella);

    if (esito !== 0)
        return esito * giocatore;

    let mossa = -1;
    let punteggioMossa = -2;

    for (let i = 0; i < 9; ++i)
        if (tabella[i] === 0) {

            tabella[i] = giocatore;
            let tmp = -minimax(tabella, giocatore * -1);
            tabella[i] = 0;

            if (tmp > punteggioMossa) {
                punteggioMossa = tmp;
                mossa = i;
            }
        }

    if (mossa === -1)
        return 0;

    return punteggioMossa;
}

function mossaMigliore(tabella) {

    let punteggioMossa = -2;
    let mossa = -1;

    for (let i = 0; i < 9; ++i) {
        if (tabella[i] === 0) {

            tabella[i] = -1;
            let valoreMossa = -minimax(tabella, -1);
            tabella[i] = 0;

            if (valoreMossa > punteggioMossa) {
                punteggioMossa = valoreMossa;
                mossa = i;
            }
        }
    }

    return mossa;
}

// ----------------------------------------------------

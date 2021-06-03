var turno = 1;
var partitaVinta = false;
var tabella = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1);

document.addEventListener("click", function (event) {

    if (event.target.id[0] === 'q') { // se è una cella della tabella

        cella = document.getElementById(event.target.id); // immagazina quella cella nella variabile "cella"

        if (tabella[parseInt(cella.id[1])] === -1) { // se la cella è libera ...
            if (turno % 2 === 0) {
                tabella[parseInt(cella.id[1])] = 0;
                cella.innerHTML = '<svg height="90%" width="90%"><circle cx="50%" cy="50%" r="30%" stroke="black" stroke-width="4%" fill="none"/></svg>';
            } else {
                tabella[parseInt(cella.id[1])] = 1;
                cella.innerHTML = '<svg width="85%" height="85%" viewBox="0 0 768 768"><path d="M751,31.9h0M743.5,0a24.5,24.5,0,0,0-17.3,7.2l-719,719a24.5,24.5,0,1,0,34.6,34.6l719-719A24.5,24.5,0,0,0,743.5,0Z" transform="translate(0 0)"/><path d="M24.5,0A24.5,24.5,0,0,0,7.2,41.8l719,719a24.5,24.5,0,0,0,34.6-34.6L41.8,7.2A24.5,24.5,0,0,0,24.5,0Z" transform="translate(0 0)"/></svg>';
            }
            ++turno;
        }

        var esito = vincitore();

        if (turno === 10 && esito === -1) { // se i turni sono finiti e l'esito è pari

            console.log("X e O pari");
            partitaVinta = true;

        } else { // se i turni non sono ancora finiti ...

            if (esito[0] === 1) { // se ha vinto la X ...

                console.log("vince la X");

                esito[1].innerHTML = '<svg fill="#43A047" width="85%" height="85%" viewBox="0 0 768 768"><path d="M751,31.9h0M743.5,0a24.5,24.5,0,0,0-17.3,7.2l-719,719a24.5,24.5,0,1,0,34.6,34.6l719-719A24.5,24.5,0,0,0,743.5,0Z" transform="translate(0 0)"/><path d="M24.5,0A24.5,24.5,0,0,0,7.2,41.8l719,719a24.5,24.5,0,0,0,34.6-34.6L41.8,7.2A24.5,24.5,0,0,0,24.5,0Z" transform="translate(0 0)"/></svg>';
                esito[2].innerHTML = '<svg fill="#43A047" width="85%" height="85%" viewBox="0 0 768 768"><path d="M751,31.9h0M743.5,0a24.5,24.5,0,0,0-17.3,7.2l-719,719a24.5,24.5,0,1,0,34.6,34.6l719-719A24.5,24.5,0,0,0,743.5,0Z" transform="translate(0 0)"/><path d="M24.5,0A24.5,24.5,0,0,0,7.2,41.8l719,719a24.5,24.5,0,0,0,34.6-34.6L41.8,7.2A24.5,24.5,0,0,0,24.5,0Z" transform="translate(0 0)"/></svg>';
                esito[3].innerHTML = '<svg fill="#43A047" width="85%" height="85%" viewBox="0 0 768 768"><path d="M751,31.9h0M743.5,0a24.5,24.5,0,0,0-17.3,7.2l-719,719a24.5,24.5,0,1,0,34.6,34.6l719-719A24.5,24.5,0,0,0,743.5,0Z" transform="translate(0 0)"/><path d="M24.5,0A24.5,24.5,0,0,0,7.2,41.8l719,719a24.5,24.5,0,0,0,34.6-34.6L41.8,7.2A24.5,24.5,0,0,0,24.5,0Z" transform="translate(0 0)"/></svg>';

                partitaVinta = true;

            } else if (esito[0] === 0) { // se ha vinto la O ...

                console.log("vince la O");

                esito[1].innerHTML = '<svg height="90%" width="90%"><circle cx="50%" cy="50%" r="30%" stroke="#1E88E5" stroke-width="4%" fill="none"/></svg>';
                esito[2].innerHTML = '<svg height="90%" width="90%"><circle cx="50%" cy="50%" r="30%" stroke="#1E88E5" stroke-width="4%" fill="none"/></svg>';
                esito[3].innerHTML = '<svg height="90%" width="90%"><circle cx="50%" cy="50%" r="30%" stroke="#1E88E5" stroke-width="4%" fill="none"/></svg>';

                partitaVinta = true;

            }

        }

    }

    if (partitaVinta) {

        // rendi visibile il bottone di ricarica
        // opacizza la tavola da gioco

    }

    // if (bottone di carica) --> resetta();

});

function vincitore() {

    sequenzaVincente = new Array(new Array(0, 1, 2), new Array(3, 4, 5), new Array(6, 7, 8), new Array(0, 3, 6), new Array(1, 4, 7), new Array(2, 5, 8), new Array(0, 4, 8), new Array(2, 4, 6));

    for (let i = 0; i < 8; ++i) {
        if (tabella[sequenzaVincente[i][0]] != -1 &&
            tabella[sequenzaVincente[i][0]] == tabella[sequenzaVincente[i][1]] &&
            tabella[sequenzaVincente[i][0]] == tabella[sequenzaVincente[i][2]]) {
            return new Array(tabella[sequenzaVincente[i][2]], document.getElementById("q" + sequenzaVincente[i][0]), document.getElementById("q" + sequenzaVincente[i][1]), document.getElementById("q" + sequenzaVincente[i][2]));
        }
    }

    return -1;

}

function resetta() { // resetta la tavola e l'ambiente di gioco
    
    for (i = 0; i < 9; ++i) {
        document.getElementById("q" + i).innerHTML = "";
    }

    partitaVinta = false
    tabella = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1);
    turno = 1;

}

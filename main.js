var turno = 1;
var tabella = new Array(new Array(-1, -1, -1), new Array(-1, -1, -1), new Array(-1, -1, -1));
console.log(tabella);

document.addEventListener("click", function (event) {

    if (event.target.id[0] === 'q') {

        cella = document.getElementById(event.target.id);

        if (tabella[cella.id[1] - 1][cella.id[3] - 1] === -1) {
            if (turno % 2 === 0) {
                tabella[cella.id[1] - 1][cella.id[3] - 1] = 0;
                cella.innerHTML = '<svg height="90%" width="90%"><circle cx="50%" cy="50%" r="30%" stroke="black" stroke-width="4%" fill="none"/></svg>';
            } else {
                tabella[cella.id[1] - 1][cella.id[3] - 1] = 1;
                cella.innerHTML = '<svg width="85%" height="85%" viewBox="0 0 768 768"><path d="M751,31.9h0M743.5,0a24.5,24.5,0,0,0-17.3,7.2l-719,719a24.5,24.5,0,1,0,34.6,34.6l719-719A24.5,24.5,0,0,0,743.5,0Z" transform="translate(0 0)"/><path d="M24.5,0A24.5,24.5,0,0,0,7.2,41.8l719,719a24.5,24.5,0,0,0,34.6-34.6L41.8,7.2A24.5,24.5,0,0,0,24.5,0Z" transform="translate(0 0)"/></svg>';
            } 
            ++turno;
        }

    }
});
const scoreCounter = document.querySelector('.score');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainButton = document.querySelector('.play-again');

// Informazioni utili alla logica di gioco

const totalCells = 100;
const totalBombs = 16;
const maxScore = totalCells - totalBombs;
const bombsList = [];
let score = 0;

// Generare 16 bombe casuali



while (bombsList.length < totalBombs) {
    const number = Math.floor(Math.random() * totalCells) + 1;
    if (!bombsList.includes(number)) {
        bombsList.push(number);
    }
}

console.log(bombsList);

let isCellEven = false;
let isRowEven = true;


for (let i = 1; i <= totalCells; i++) {

    const cell = document.createElement('div');
    cell.classList.add('cell');
    // cell.innerText = i;
    isCellEven = i % 2 === 0;

    // Se la riga è pari e la cella è pari: cell dark
    // Se la riga è dispari e la cella è dispari: cell dark

    if (isCellEven && isRowEven) cell.classList.add('cell-dark');
    else if (!isCellEven && !isRowEven) cell.classList.add('cell-dark');

    // Se sono alla fine della riga...

    if (i % 10 === 0) isRowEven = !isRowEven;
    // cell.classList.add('cell-dark');

    cell.addEventListener('click', function () {
        // Controllo che la cella sia già cliccata
        if (cell.classList.contains('cell-clicked')) return;
        // con return si "blocca" la funziona

        // codice eseguito quando avviene l'evento
        if (bombsList.includes(i)) {
            cell.classList.add('cell-bomb');
            endGame(false);
        } else {
            cell.classList.add('cell-clicked');
            updateScore();
        }

    })

    grid.appendChild(cell);
}


// funzioni

// Funzione per aggiornare il punteggio
function updateScore() {
    console.log('aggiorno il punteggio')
    score++;
    // Inserire punteggio nel contatore
    scoreCounter.innerText = String(score).padStart(5, 0);
    if (score === maxScore) endGame(true);



}

// Funzione per decretare game over
function endGame(isVictory) {
    // Se vinci la partita
    if (isVictory === true) {
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'Hai <br>vinto!'
    } else {
        // riveliamo le bombe se perdiamo
        reveaAllBombs();
    }
    // Se perdiamo la partita 
    endGameScreen.classList.remove('hidden');

}

// Rigiocare la partita

function reloadGame() {
    location.reload();
}

playAgainButton.addEventListener('click', reloadGame);

// Per mostrare tutte le bombe quando perdiamo

function reveaAllBombs() {
    // recupero tutte le celle
    const cells = document.querySelectorAll('.cell');
    for (let i = 1; i <= cells.length; i++) {
        // controllo se cella è una bomba
        if (bombsList.includes(i)) {
            const cellReveal = cells[i - 1];
            cellReveal.classList.add('cell-bomb');

        }

    }


}
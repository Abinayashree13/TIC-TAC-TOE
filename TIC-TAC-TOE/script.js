const statusDisplay = document.querySelector('.game--status');

let gameActive = true;
let player1Name = prompt("Enter Player 1's name:");
let player2Name = prompt("Enter Player 2's name:");

let currentPlayer = player1Name;
let gameState = ["", "", "", "", "", "", "", "", ""];
let player1Score = 0;
let player2Score = 0;

const winningMessage = () => `Player ${currentPlayer} has won!`;

const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

statusDisplay.innerHTML = currentPlayerTurn();

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer === player1Name ? "X" : "O";
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === player1Name ? player2Name : player1Name;
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '')
            continue;
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === player1Name) {
            player1Score++;
        } else {
            player2Score++;
        }
        statusDisplay.innerHTML = `${winningMessage()}<br>${updateScoreMessage()}`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function updateScoreMessage() {
    const scoreMessage = `Score - ${player1Name}: ${player1Score} <br> Score - ${player2Name}: ${player2Score}`;
    return scoreMessage;
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive)
        return;

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = player1Name;
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
    updateScoreMessage(); // Update score message when restarting game
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);

// Initialize score display
updateScoreMessage();

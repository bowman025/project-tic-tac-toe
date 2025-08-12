const gameBoard = (function() {
    const rows = [1, 2, 3];
    const columns = [1, 2, 3];
    const token = null;
    const board = [];
    rows.forEach(row => {
            columns.forEach(column => {
                board.push({row, column, token});
            });
    });
    const addToken = function(activePlayer, row, col) {
       getCell(row, col).token = activePlayer.token;
    };
    const getCell = function(row, col) {
        return board.find(cell => cell.row === row && cell.column === col);
    };
    const getState = () => board;
    const clearBoard = () => {
        board.forEach(cell => {
            cell.token = null;
        });
    }
    return {addToken, getCell, getState, clearBoard};
})();

function playerFactory(name, token) {
    return {name, token};
};

const playerOne = playerFactory("Player 1", "X");
const playerTwo = playerFactory("Player 2", "O");

const gameController = (function() {
    let activePlayer = playerOne;
    const cells = gameBoard.getState();
    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };
    const getActivePlayer = () => activePlayer;
    const printNewRound = () => {
        console.log(`It's ${activePlayer.name}'s turn.`);
    };
    const checkWinner = () => {
        let activeCells = cells.filter(cell => cell.token === activePlayer.token);
        console.log(activeCells);
        if(activeCells.filter(activeCell => activeCell.row === 1).length === 3 ||
        activeCells.filter(activeCell => activeCell.row === 2).length === 3 ||
        activeCells.filter(activeCell => activeCell.row === 3).length === 3 ||
        activeCells.filter(activeCell => activeCell.column === 1).length === 3 ||
        activeCells.filter(activeCell => activeCell.column === 2).length === 3 ||
        activeCells.filter(activeCell => activeCell.column === 3).length === 3 ||
        cells[2].token === activePlayer.token && cells[4].token === activePlayer.token && cells[6].token === activePlayer.token ||
        cells[0].token === activePlayer.token && cells[4].token === activePlayer.token && cells[8].token === activePlayer.token) {
            console.log(`${activePlayer.name} wins!`);
            return `${activePlayer.name} wins!`;
        } else if((cells.filter(cell => cell.token !== null)).length === 9) {
            console.log("It's a tie!");
            return "It's a tie!";
        } else {
            return false;
        };
    };
    const playRound = (row, col) => {
        if(gameBoard.getCell(row, col).token !== null) {
            console.log('That cell is taken. Please pick another one.')
            printNewRound();
            return;
        };
        gameBoard.addToken(activePlayer, row, col);
        console.log(`Marking cell row ${row} column ${col} as ${activePlayer.token}`);
        if (checkWinner() === false) {
            switchActivePlayer();
            printNewRound();
        };
    };
    const resetGame = () => {
        gameBoard.clearBoard();
        activePlayer = playerOne;
        const cells = gameBoard.getState();
        printNewRound();
    };
    printNewRound();
    return {playRound, getActivePlayer, checkWinner, resetGame};
})();

const displayController = (function() {
    const container = document.querySelector(".container");
    const boardDiv = document.querySelector(".board");
    const playerTurnDiv = document.querySelector(".turn");
    const updateScreen = () => {
        const cells = gameBoard.getState();
        let activePlayer = gameController.getActivePlayer();
        playerTurnDiv.textContent = `It's ${activePlayer.name}'s turn.`
        cells.forEach((cell, index) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("cell", `cell-${index}`);
            boardDiv.appendChild(cellDiv);
            cellDiv.addEventListener("click", () => {
                gameController.playRound(cell.row, cell.column);
                cellDiv.textContent = cell.token;
                activePlayer = gameController.getActivePlayer();
                playerTurnDiv.textContent = `It's ${activePlayer.name}'s turn.`;
                if(gameController.checkWinner() !== false) {
                    playerTurnDiv.textContent = gameController.checkWinner();
                    let overlay = document.createElement("div");
                    overlay.classList.add("overlay");
                    document.querySelector(".board").appendChild(overlay);
                    resetScreen();
                };
            });
        });
    };
    const resetScreen = () => {
        const restartButton = document.createElement("button");
        restartButton.classList.add("restart");
        restartButton.textContent = "Play again";
        container.appendChild(restartButton);
        restartButton.addEventListener("click", () => {
            gameController.resetGame();
            while(boardDiv.firstChild) {
                boardDiv.removeChild(boardDiv.firstChild);
            };
            container.removeChild(restartButton);
            updateScreen();
        });
    };
    updateScreen();
})();
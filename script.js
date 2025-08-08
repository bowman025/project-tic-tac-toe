const gameboard = (function() {
    const rows = [1, 2, 3];
    const columns = [1, 2, 3];
    const token = 0;
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
    return {addToken, getCell, getState};
})();

function playerFactory(name, token) {
    return {name, token};
};

const playerOne = playerFactory("Player 1", 1);
const playerTwo = playerFactory("Player 2", 2);

const game = (function() {
    let activePlayer = playerOne;
    const cells = gameboard.getState();
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
        if(activeCells.length >= 3) {
            if(activeCells.filter(activeCell => activeCell.row === activeCell.row).length === 3 || activeCells.filter(activeCell => activeCell.column === activeCell.column).length === 3 || activeCells.filter(activeCell => activeCell.row === activeCell.column).length === 3 || cells[0].token === activePlayer.token && cells[4].token === activePlayer.token && cells[8].token === activePlayer.token) {
                console.log(`${activePlayer.name} wins!`);
            } else return;
        };
    };
    const playRound = (row, col) => {
        if(gameboard.getCell(row, col).token !== 0) {
            console.log('That cell is taken. Please pick another one.')
            printNewRound();
            return;
        };
        gameboard.addToken(activePlayer, row, col);
        console.log(`Marking cell row ${row} column ${col} as ${activePlayer.token}`);
        checkWinner();
        switchActivePlayer();
        printNewRound();
        };
    printNewRound();
    return {playRound, getActivePlayer};
})();
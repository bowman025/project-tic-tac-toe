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
    const switchActivePlayer = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    };
    const getActivePlayer = () => activePlayer;
    const printNewRound = () => {
        console.log(`It's ${activePlayer.name}'s turn.`);
    };
    const playRound = (row, col) => {
        if(gameboard.getCell(row, col).token !== 0) {
            console.log('That cell is taken. Please pick another one.')
            printNewRound();
            return;
        };
        gameboard.addToken(activePlayer, row, col);
        console.log(`Marking cell row ${row} column ${col} as ${activePlayer.token}`);
        switchActivePlayer();
        printNewRound();
        };
    printNewRound();
    return {playRound, getActivePlayer};
})();
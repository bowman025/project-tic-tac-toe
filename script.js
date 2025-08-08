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
        board.forEach(cell => {
            if(cell.row === row && cell.column === col && cell.token === 0) {
                cell.token = activePlayer.token;
            };
        });
    };
    const getCell = function(row, col) {
        return board.find(cell => cell.row === row && cell.column === col)
    };
    const getState = () => board;
    return {addToken, getCell, getState};
})();

function playerFactory(name, token) {
    return {name, token};
};

const playerOne = playerFactory("Player 1", 1);
const playerTwo = playerFactory("Player 2", 2);

function gameController(playerOne, playerTwo) {

} 
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
    return board;
})();

function playerFactory(name, token) {
    return {name, token};
};

const playerOne = playerFactory("Player 1", "X");
const playerTwo = playerFactory("Player 2", "O");
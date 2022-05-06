const Gameboard = (() => {
    let grid = ['B', 'B', 'B',
                'B', 'B', 'B',
                'B', 'B', 'B'];
    const makeMove = (player, position) => {
        if (grid[position] == 'B') {
            grid[position] = player;
            return true;
        } else {
            return false;
        }
    };
    const checkFull = () => !grid.includes('B');
    const checkWin = () => {
        // check rows
        if ((grid[0] == grid[1]) && (grid[1] == grid[2]) && (grid[2] != 'B')) {
            return grid[0];
        }
        if ((grid[3] == grid[4]) && (grid[4] == grid[5]) && (grid[5] != 'B')) {
            return grid[3];
        }
        if ((grid[6] == grid[7]) && (grid[7] == grid[8]) && (grid[8] != 'B')) {
            return grid[6];
        }

        // check cols
        if ((grid[0] == grid[3]) && (grid[3] == grid[6]) && (grid[6] != 'B')) {
            return grid[0];
        }
        if ((grid[1] == grid[4]) && (grid[4] == grid[7]) && (grid[7] != 'B')) {
            return grid[1];
        }
        if ((grid[2] == grid[5]) && (grid[5] == grid[8]) && (grid[8] != 'B')) {
            return grid[1];
        }

        //check diagonals
        if ((grid[0] == grid[4]) && (grid[4] == grid[8]) && (grid[8] != 'B')) {
            return grid[0];
        }
        if ((grid[2] == grid[4]) && (grid[4] == grid[6]) && (grid[6] != 'B')) {
            return grid[2];
        }
        
        return false;
    };
    const checkTie = () => !checkWin() && checkFull();
    const getPosition = (position) => grid[position];

    return {
        makeMove,
        checkFull,
        checkWin,
        checkTie,
        getPosition
    };
})();

const DisplayController = (() => {
    const currentPlayerDisplay = document.querySelector("div.turn > span#currentPlayer");
    const changeCurrentPlayer = () => {
        if (currentPlayerDisplay.textContent == "circle") {
            currentPlayerDisplay.textContent = "cross";
        } else {
            currentPlayerDisplay.textContent = "circle";
        }
    };
    const updateGameBoard = () => {
        let gridBoxes = document.querySelectorAll(div.gridbox);
        gridBoxes.forEach((gridBox, index) => {
            let update = Gameboard.getPosition(index);
            if (update != "B") {
                gridBox
            }
        })
    };
})();

const GameController = (() => {
    let currentPlayer = 'O';
    const makeMove = (position) => {
        Gameboard.makeMove(currentPlayer, position);
        Gameboard.checkWin();
    };
})();






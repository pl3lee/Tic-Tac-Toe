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
    const restartGame = () => grid.forEach((element, index) => grid[index] = 'B');
    return {
        makeMove,
        checkFull,
        checkWin,
        checkTie,
        getPosition,
        restartGame
    };
})();

const DisplayController = (() => {
    const currentPlayerDisplay = document.querySelector("div.turn > span#currentPlayer");
    const changeCurrentPlayer = () => {
        if (currentPlayerDisplay.textContent == "circle") {
            currentPlayerDisplay.textContent = "clear";
        } else {
            currentPlayerDisplay.textContent = "circle";
        }
    };
    const updateGameBoard = () => {
        let gridBoxes = document.querySelectorAll("div.gridbox > span");
        gridBoxes.forEach((gridBox, index) => {
            let update = Gameboard.getPosition(index);
            if (update == "O") {
                gridBox.textContent = "circle"; 
            } else if (update == "X") {
                gridBox.textContent = "clear";
            } else {
                gridBox.textContent = "";
            }
        });
    };
    const displayWin = (player) => {
        let modalText = document.querySelector(".modal > div > h1")
        modalText.textContent = "Player " + player + " has won the game! Congratulations!";
        let modal = document.querySelector(".modal");
        modal.classList.toggle("closed");
        toggleBlur();
        modal.addEventListener("click", () => {
            window.location.reload();
        });
        
    };
    const displayTie = () => {
        let modalText = document.querySelector(".modal > div > h1")
        modalText.textContent = "We have a tie!";
        let modal = document.querySelector(".modal");
        modal.classList.toggle("closed");
        toggleBlur();
        modal.addEventListener("click", () => {
            window.location.reload();
        });
    };
    const toggleBlur = () => {
        let blur = document.querySelectorAll(".background");
        blur.forEach((element) => element.classList.toggle("blurred"));
    };
    return {
        changeCurrentPlayer,
        updateGameBoard,
        displayWin,
        displayTie
    };
})();



const Player = (symbol) => {
    const makeMove = (position) => Gameboard.makeMove(symbol, position);
    return {
        symbol,
        makeMove
    };
};

const GameController = (() => {
    let player1 = Player('O');
    let player2 = Player('X');
    let currentPlayer = player1;
    const makeMove = (position) => {
        let successful = Gameboard.makeMove(currentPlayer.symbol, position);
        if (successful) {
            let won = Gameboard.checkWin();
            let tie = Gameboard.checkTie();
            DisplayController.updateGameBoard();
            DisplayController.changeCurrentPlayer();
            if (won != false) {
                DisplayController.displayWin(currentPlayer.symbol);
                console.log("won!");
            } else if (tie) {
                DisplayController.displayTie();
                console.log("tie!");
            } else {
                currentPlayer = (currentPlayer == player1) ? player2 : player1;
            }
        }         
    };
    const restartGame = () => {
        Gameboard.restartGame();
        currentPlayer = player1;
        DisplayController.changeCurrentPlayer();
        DisplayController.updateGameBoard();
    }
    return {
        makeMove,
        restartGame
    };
})();

let gridBoxes = document.querySelectorAll(".gridbox");
DisplayController.changeCurrentPlayer();
DisplayController.updateGameBoard();
gridBoxes.forEach((gridBox) => {
    gridBox.addEventListener("click", (event) => {
        GameController.makeMove(Number(event.target.getAttribute("data-index")));
    });
});






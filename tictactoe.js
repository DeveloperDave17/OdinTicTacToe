const playerFactory = (playerName, tileMarker) => {
    
    const getTileMarker = () => tileMarker;
    const getPlayerName = () => playerName;

    return { getTileMarker, getPlayerName };
};

const gameBoard = (() => {
    const gameTiles = [];
    gameTiles.length = 9;

    const resetBoard = () => {
        gameTiles.length = 0;
        gameTiles.length = 9;
    }

    const playTile = (tileNum, player) => {
        if (gameTiles[tileNum] === undefined){
            gameTiles[tileNum] = player.getTileMarker();
            return true;
        }
        return false;
    }

    const checkIfPlayerWon = () => {
        // check row 1
        if(gameTiles[0] !== undefined && gameTiles[0] === gameTiles[1] && gameTiles[1] === gameTiles[2]) {return true;}
        // check row 2
        else if(gameTiles[3] !== undefined && gameTiles[3] === gameTiles[4] && gameTiles[4] === gameTiles[5]) { return true;}
        // check row 3
        else if(gameTiles[6] !== undefined && gameTiles[6] === gameTiles[7] && gameTiles[7] === gameTiles[8]) { return true;}
        // check column 1
        else if(gameTiles[0] !== undefined && gameTiles[0] === gameTiles[3] && gameTiles[3] === gameTiles[6]) { return true;}
        // check column 2
        else if(gameTiles[1] !== undefined && gameTiles[1] === gameTiles[4] && gameTiles[4] === gameTiles[7]) { return true;}
        // check column 3
        else if(gameTiles[2] !== undefined && gameTiles[2] === gameTiles[5] && gameTiles[5] === gameTiles[8]) { return true;}
        // check top left to bottom right diagonal
        else if(gameTiles[0] !== undefined && gameTiles[0] === gameTiles[4] && gameTiles[4] === gameTiles[8]) { return true;}
        // check bottom left to top right diagonal
        else if(gameTiles[6] !== undefined && gameTiles[6] === gameTiles[4] && gameTiles[4] === gameTiles[2]) { return true;}
        // no one has won yet
        else { return false; }
    }

    const checkIfDraw = () => {
        for (let tile of gameTiles) {
            if (tile === undefined) {
                return false;
            }
        }
        return true;
    }

    return { resetBoard, playTile, checkIfPlayerWon, checkIfDraw };

})();

const gameController = ((
    playerOneName = "Player One",
    playerTwoName = "Player Two") => {

    const playerOne = playerFactory(playerOneName, 'X');
    const playerTwo = playerFactory(playerTwoName, 'O');

    const players = [playerOne, playerTwo];
    
    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (tileNum) => {
        if (gameBoard.playTile(tileNum, activePlayer)) {
            displayController.displayTile(tileNum, activePlayer);
            if (gameBoard.checkIfPlayerWon()) {
                displayController.displayWinner(activePlayer);
                displayController.resetBoard();
                gameBoard.resetBoard();
            } else if (gameBoard.checkIfDraw()) {
                displayController.displayDraw();
                displayController.resetBoard();
                gameBoard.resetBoard();
            } else {
            switchPlayerTurn();
            }
        }
    }

    const restartGame = () => {
        activePlayer = players[0];
        displayController.resetBoard();
        gameBoard.resetBoard();
    }

    return { getActivePlayer, playRound, restartGame };
})();

const displayController = (() => {
    const gameTileElements = document.querySelectorAll(".game-board-container>div");
    const startButton = document.querySelector(".start-button");
    const gameMenu = document.querySelector(".game-menu");
    const gameBoardContainer = document.querySelector(".game-board-container");
    const gameControls = document.querySelector(".game-controls");
    const menuButton = document.querySelector(".menu-button");
    const restartButton = document.querySelector(".restart-button");
    const leftCharacters = document.querySelectorAll(".left-characters>.character-holder");
    const rightCharacters = document.querySelectorAll(".right-characters>.character-holder");

    const startGame = () => {
        gameMenu.style.display = "none";
        gameBoardContainer.style.display = "grid";
        gameControls.style.display = "block";
        gameController.restartGame();
    }

    const enableMenu = () => {
        gameMenu.style.display = "grid";
        gameBoardContainer.style.display = "none";
        gameControls.style.display = "none";
    }

    const attachMenuListeners = () => {
        startButton.addEventListener("click", startGame);
        restartButton.addEventListener("click", gameController.restartGame);
        menuButton.addEventListener("click", enableMenu);
        leftCharacters[0].addEventListener("click", function() {toggleCharacterSelection(leftCharacters[0], leftCharacters[1])});
        leftCharacters[1].addEventListener("click", function() {toggleCharacterSelection(leftCharacters[1], leftCharacters[0])});
        rightCharacters[0].addEventListener("click", function() {toggleCharacterSelection(rightCharacters[0], rightCharacters[1])});
        rightCharacters[1].addEventListener("click", function() {toggleCharacterSelection(rightCharacters[1], rightCharacters[0])});
    }

    const resetBoard = (() => {
        for (let gameTile of gameTileElements) {
            gameTile.textContent = "";
        }
    });

    const enableTileSelection = () => {
        for (let i = 0; i < 9; i++){
            if (gameBoard[i] === undefined) {
                gameTileElements[i].addEventListener("click", function(){gameController.playRound(i)});
            }
        }
    }

    const displayTile = (tileNum, player) => {
        gameTileElements[tileNum].textContent = player.getTileMarker();
    }

    const displayWinner = (player) => {
        alert(`${player.getPlayerName()} has won!`);
    }

    const displayDraw = () => {
        alert("It's a draw!");
    }

    const toggleCharacterSelection = (choice, otherChoice) => {
        choice.classList.add("selected");
        otherChoice.classList.remove("selected");
    }



    return { resetBoard, enableTileSelection, displayTile, displayWinner, displayDraw, attachMenuListeners };
})();

displayController.enableTileSelection();
displayController.attachMenuListeners();
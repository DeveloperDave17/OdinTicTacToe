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

    const fillGameTiles = () => {
        for (let i = 0; i < 9; i++)
            gameTiles[i] = "filler";
    }

    const checkForAiWin = (player) => {
         // check row 1
         if(gameTiles[0] === player.getTileMarker() && gameTiles[0] === gameTiles[1] && gameTiles[2] === undefined) {return 2;}
         if(gameTiles[1] === player.getTileMarker() && gameTiles[1] === gameTiles[2] && gameTiles[0] === undefined) {return 0;}
         if(gameTiles[0] === player.getTileMarker() && gameTiles[0] === gameTiles[2] && gameTiles[1] === undefined) {return 1;}
         // check row 2
         if(gameTiles[3] === player.getTileMarker() && gameTiles[3] === gameTiles[4] && gameTiles[5] === undefined) {return 5;}
         if(gameTiles[4] === player.getTileMarker() && gameTiles[4] === gameTiles[5] && gameTiles[3] === undefined) {return 3;}
         if(gameTiles[3] === player.getTileMarker() && gameTiles[3] === gameTiles[5] && gameTiles[4] === undefined) {return 4;}
         // check row 3
         if(gameTiles[6] === player.getTileMarker() && gameTiles[6] === gameTiles[7] && gameTiles[8] === undefined) {return 8;}
         if(gameTiles[7] === player.getTileMarker() && gameTiles[7] === gameTiles[8] && gameTiles[6] === undefined) {return 6;}
         if(gameTiles[6] === player.getTileMarker() && gameTiles[6] === gameTiles[8] && gameTiles[7] === undefined) {return 7;}
         // check column 1
         if(gameTiles[0] === player.getTileMarker() && gameTiles[0] === gameTiles[3] && gameTiles[6] === undefined) {return 6;}
         if(gameTiles[3] === player.getTileMarker() && gameTiles[3] === gameTiles[6] && gameTiles[0] === undefined) {return 0;}
         if(gameTiles[6] === player.getTileMarker() && gameTiles[0] === gameTiles[6] && gameTiles[3] === undefined) {return 3;}
         // check column 2
         if(gameTiles[1] === player.getTileMarker() && gameTiles[1] === gameTiles[4] && gameTiles[7] === undefined) {return 7;}
         if(gameTiles[4] === player.getTileMarker() && gameTiles[1] === gameTiles[7] && gameTiles[4] === undefined) {return 4;}
         if(gameTiles[7] === player.getTileMarker() && gameTiles[4] === gameTiles[7] && gameTiles[1] === undefined) {return 1;}
         // check column 3
         if(gameTiles[2] === player.getTileMarker() && gameTiles[2] === gameTiles[5] && gameTiles[8] === undefined) {return 8;}
         if(gameTiles[5] === player.getTileMarker() && gameTiles[5] === gameTiles[8] && gameTiles[2] === undefined) {return 2;}
         if(gameTiles[8] === player.getTileMarker() && gameTiles[2] === gameTiles[8] && gameTiles[5] === undefined) {return 5;}
         // check top left to bottom right diagonal
         if(gameTiles[0] === player.getTileMarker() && gameTiles[0] === gameTiles[4] && gameTiles[8] === undefined) {return 8;}
         if(gameTiles[4] === player.getTileMarker() && gameTiles[4] === gameTiles[8] && gameTiles[0] === undefined) {return 0;}
         if(gameTiles[8] === player.getTileMarker() && gameTiles[0] === gameTiles[8] && gameTiles[4] === undefined) {return 4;}
         // check bottom left to top right diagonal
         if(gameTiles[2] === player.getTileMarker() && gameTiles[2] === gameTiles[4] && gameTiles[6] === undefined) {return 6;}
         if(gameTiles[4] === player.getTileMarker() && gameTiles[4] === gameTiles[6] && gameTiles[2] === undefined) {return 2;}
         if(gameTiles[6] === player.getTileMarker() && gameTiles[0] === gameTiles[6] && gameTiles[4] === undefined) {return 4;}
         // no winning move
         return -1;
    }

    return { resetBoard, playTile, checkIfPlayerWon, checkIfDraw, fillGameTiles, checkForAiWin };

})();

const gameController = (() => {

    let playerOne;
    let playerTwo;

    let players;
    
    let activePlayer;

    let aiOptions;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const playRound = (tileNum) => {
        if (gameBoard.playTile(tileNum, activePlayer)) {
            displayController.displayTile(tileNum, activePlayer);
            if (gameBoard.checkIfPlayerWon()) {
                displayController.displayWinner(activePlayer);
                gameBoard.fillGameTiles();
                // displayController.resetBoard();
                // gameBoard.resetBoard();
            } else if (gameBoard.checkIfDraw()) {
                displayController.displayDraw();
                gameBoard.fillGameTiles();
                // displayController.resetBoard();
                // gameBoard.resetBoard();
            } else {
            switchPlayerTurn();
            displayController.changeGameStatusMessage(`${getActivePlayer().getPlayerName()}'s turn`);
            }
        }
    }

    const playRoundEasyAI = (tileNum) => {
        if (gameBoard.playTile(tileNum, activePlayer)) {
            displayController.displayTile(tileNum, activePlayer);
            if (gameBoard.checkIfPlayerWon()) {
                displayController.displayWinner(activePlayer);
                gameBoard.fillGameTiles();
            } else if (gameBoard.checkIfDraw()) {
                displayController.displayDraw();
                gameBoard.fillGameTiles();
            } else {
                let aiPlayed = false;
                switchPlayerTurn();
                while (!aiPlayed) {
                    let tileAttempt = Math.floor(Math.random() * 10);
                    aiPlayed = gameBoard.playTile(tileAttempt, activePlayer);
                    if (aiPlayed) {
                        displayController.displayTile(tileAttempt, activePlayer);
                    }
                }

                if (gameBoard.checkIfPlayerWon()) {
                    displayController.displayWinner(activePlayer);
                    gameBoard.fillGameTiles();
                } else if (gameBoard.checkIfDraw()) {
                    displayController.displayDraw();
                    gameBoard.fillGameTiles();
                } else {
                    switchPlayerTurn();
                }
            }
        }
    }

    const playRoundAI = (tileNum) => {
        if (gameBoard.playTile(tileNum, activePlayer)) {
            displayController.displayTile(tileNum, activePlayer);
            aiOptions[tileNum] = -100;
            if (tileNum === 0) {
                aiOptions[1] += 1;
                aiOptions[2] += 2;
                aiOptions[3] += 1;
                aiOptions[6] += 2;
                aiOptions[4] += 1;
                aiOptions[8] += 2;
            } else if (tileNum === 1) {
                aiOptions[0] += 1;
                aiOptions[2] += 1;
                aiOptions[4] += 1;
                aiOptions[7] += 2;
            } else if (tileNum === 2) {
                aiOptions[0] += 2;
                aiOptions[1] += 1;
                aiOptions[4] += 1;
                aiOptions[5] += 1;
                aiOptions[6] += 2;
                aiOptions[8] += 2;
            } else if (tileNum === 3) {
                aiOptions[0] += 1;
                aiOptions[4] += 1;
                aiOptions[5] += 2;
                aiOptions[6] += 1;
            } else if (tileNum === 4) {
                aiOptions[0] += 2;
                aiOptions[1] += 1;
                aiOptions[2] += 2;
                aiOptions[3] += 1;
                aiOptions[5] += 1;
                aiOptions[6] += 2;
                aiOptions[7] += 1;
                aiOptions[8] += 2;
            } else if (tileNum === 5) {
                aiOptions[2] += 1;
                aiOptions[3] += 2;
                aiOptions[4] += 1;
                aiOptions[8] += 1;
            } else if (tileNum === 6) {
                aiOptions[0] += 2;
                aiOptions[2] += 2;
                aiOptions[3] += 1;
                aiOptions[4] += 1;
                aiOptions[7] += 1;
                aiOptions[8] += 2;
            } else if (tileNum === 7) {
                aiOptions[1] += 2;
                aiOptions[4] += 1;
                aiOptions[6] += 1;
                aiOptions[8] += 1;
            } else if (tileNum === 8) {
                aiOptions[0] += 2;
                aiOptions[2] += 2;
                aiOptions[4] += 1;
                aiOptions[5] += 1;
                aiOptions[6] += 2;
                aiOptions[7] += 1;
            }

            if (gameBoard.checkIfPlayerWon()) {
                displayController.displayWinner(activePlayer);
                gameBoard.fillGameTiles();
            } else if (gameBoard.checkIfDraw()) {
                displayController.displayDraw();
                gameBoard.fillGameTiles();
            } else {
                let aiPlayed = false;
                switchPlayerTurn();
                // while (!aiPlayed) {
                //     let tileAttempt = Math.floor(Math.random() * 10);
                //     aiPlayed = gameBoard.playTile(tileAttempt, activePlayer);
                //     if (aiPlayed) {
                //         displayController.displayTile(tileAttempt, activePlayer);
                //     }
                // }

                let maxTile = gameBoard.checkForAiWin(activePlayer);
                let playerWinningTile = gameBoard.checkForAiWin(playerOne);
                if (maxTile === -1) {
                    if (playerWinningTile === -1) {
                        let maxValue = 0;
                        for (let i = 0; i < 9; i++) {
                            if (aiOptions[i] > maxValue) {
                                maxValue = aiOptions[i];
                                maxTile = i;
                            }
                        }
                    } else {
                        maxTile = playerWinningTile;
                    }
                }
                gameBoard.playTile(maxTile, activePlayer);
                displayController.displayTile(maxTile, activePlayer);

                aiOptions[maxTile] = -100;

                if (gameBoard.checkIfPlayerWon()) {
                    displayController.displayWinner(activePlayer);
                    gameBoard.fillGameTiles();
                } else if (gameBoard.checkIfDraw()) {
                    displayController.displayDraw();
                    gameBoard.fillGameTiles();
                } else {
                    switchPlayerTurn();
                }
            }
        }
    }

    const restartGame = () => {
        activePlayer = players[0];
        displayController.resetBoard();
        gameBoard.resetBoard();
        aiOptions = [9];
        for (let i = 0; i < 9; i++) {
            aiOptions[i] = 0;
        }
        aiOptions[4] = 3;
    }

    const setPlayers = (playerOneName, playerOneToken, playerTwoName, playerTwoToken) => {
        playerOne = playerFactory(playerOneName, playerOneToken);
        playerTwo = playerFactory(playerTwoName, playerTwoToken);
        players = [playerOne, playerTwo];
        activePlayer = players[0];
    }

    return { getActivePlayer, playRound, playRoundEasyAI, playRoundAI, restartGame, setPlayers };
})();

const displayController = (() => {
    const gameTileElements = document.querySelectorAll(".game-board-container>div");
    const gameTileImages = document.querySelectorAll(".game-board-container>div>img");
    const startButton = document.querySelector(".start-button");
    const gameMenu = document.querySelector(".game-menu");
    const gameBoardContainer = document.querySelector(".game-board-container");
    const gameStatus = document.querySelector(".game-status");
    const gameControls = document.querySelector(".game-controls");
    const menuButton = document.querySelector(".menu-button");
    const restartButton = document.querySelector(".restart-button");
    const leftCharacters = document.querySelectorAll(".left-characters>.character-holder");
    const rightCharacters = document.querySelectorAll(".right-characters>.character-holder");
    const leftCharacterImages = document.querySelectorAll(".left-characters>.character-holder>img");
    const rightCharacterImages = document.querySelectorAll(".right-characters>.character-holder>img");
    const characterNameInputs = document.querySelectorAll(".game-menu input");
    const modeSelect = document.querySelector("#mode");

    let enabledTiles;

    const startGame = () => {
        gameMenu.style.display = "none";
        gameBoardContainer.style.display = "grid";
        gameControls.style.display = "block";
        gameStatus.style.display = "block";
        let characterNames = getCharacterNames();
        let characters = getSelectedCharacters();
        gameController.setPlayers(characterNames[0], characters[0], characterNames[1], characters[1]);

        let mode = modeSelect.value;
        enabledTiles = [9];
        if (mode === "pvp"){
            displayController.enableTileSelection(gameController.playRound);
        } else if (mode === "easyAI") {
            displayController.enableTileSelection(gameController.playRoundEasyAI);
        } else {
            displayController.enableTileSelection(gameController.playRoundAI);
        }
        gameController.restartGame();
        changeGameStatusMessage(`${gameController.getActivePlayer().getPlayerName()}'s turn`);
    }

    const enableMenu = () => {
        gameMenu.style.display = "grid";
        gameBoardContainer.style.display = "none";
        gameControls.style.display = "none";
        gameStatus.style.display = "none";
        disableTileSelection();
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
         for (let gameTile of gameTileImages) {
             gameTile.setAttribute("src", "");
         }
         changeGameStatusMessage(`${gameController.getActivePlayer().getPlayerName()}'s turn`);
    });

    const enableTileSelection = (playRound) => {
        for (let i = 0; i < 9; i++){
            if (gameBoard[i] === undefined) {
                gameTileElements[i].addEventListener("click", enabledTiles[i] = function(){playRound(i)});
            }
        }
    }

    const disableTileSelection = () => {
        for (let i = 0; i < 9; i++){
            if (gameBoard[i] === undefined) {
                gameTileElements[i].removeEventListener("click", enabledTiles[i]);
            }
        }
    }

    const displayTile = (tileNum, player) => {
        gameTileImages[tileNum].setAttribute("src", player.getTileMarker());
    }

    const displayWinner = (player) => {
        changeGameStatusMessage(`${player.getPlayerName()} has won!`);
    }

    const displayDraw = () => {
        changeGameStatusMessage("It's a draw!");
    }

    const toggleCharacterSelection = (choice, otherChoice) => {
        choice.classList.add("selected");
        otherChoice.classList.remove("selected");
    }

    const getSelectedCharacters = () => {
        let characters = [2];

        for (let character of leftCharacterImages) {
            if (leftCharacters[0].contains(character) && leftCharacters[0].classList.contains("selected")){
                characters[0] = character.getAttribute("src");
            } else if (leftCharacters[1].contains(character) && leftCharacters[1].classList.contains("selected")){
                characters[0] = character.getAttribute("src");
            }
        }

        for (let character of rightCharacterImages) {
            if (rightCharacters[0].contains(character) && rightCharacters[0].classList.contains("selected")){
                characters[1] = character.getAttribute("src");
            } else if (rightCharacters[1].contains(character) && rightCharacters[1].classList.contains("selected")){
                characters[1] = character.getAttribute("src");
            }
        }

        return characters;
    }

    const getCharacterNames = () => {
        let characterNames = [characterNameInputs[0].value, characterNameInputs[1].value];
        return characterNames;
    }

    const changeGameStatusMessage = (message) => {
        gameStatus.textContent = message;
    }

    return { resetBoard, enableTileSelection, disableTileSelection, displayTile, displayWinner, displayDraw, attachMenuListeners, changeGameStatusMessage };
})();

displayController.attachMenuListeners();
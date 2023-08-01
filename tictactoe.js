const playerFactory = (tileMarker) => {
    
    const getTileMarker = () => tileMarker;

    return { getTileMarker };
};

const gameBoard = (() => {
    const gameSquares = [];
    gameSquares.length = 9;

    const resetBoard = () => {
        gameSquares.length = 0;
        gameSquares.length = 9;
    }

    const playSquare = (squareNum, player) => {
        if (gameSquares[squareNum] !== undefined){
            return false;
        } else {
            gameSquares[squareNum] = player.getTileMarker();
            return true;
        }
    }

    const checkIfPlayerWon = () => {
        // check row 1
        if(gameSquares[0] !== undefined && gameSquares[0] === gameSquares[1] && gameSquares[1] === gameSquares[2]) {return true;}
        // check row 2
        else if(gameSquares[3] !== undefined && gameSquares[3] === gameSquares[4] && gameSquares[4] === gameSquares[5]) { return true;}
        // check row 3
        else if(gameSquares[6] !== undefined && gameSquares[6] === gameSquares[7] && gameSquares[7] === gameSquares[8]) { return true;}
        // check column 1
        else if(gameSquares[0] !== undefined && gameSquares[0] === gameSquares[3] && gameSquares[3] === gameSquares[6]) { return true;}
        // check column 2
        else if(gameSquares[1] !== undefined && gameSquares[1] === gameSquares[4] && gameSquares[4] === gameSquares[7]) { return true;}
        // check column 3
        else if(gameSquares[2] !== undefined && gameSquares[2] === gameSquares[5] && gameSquares[5] === gameSquares[8]) { return true;}
        // check top left to bottom right diagonal
        else if(gameSquares[0] !== undefined && gameSquares[0] === gameSquares[4] && gameSquares[4] === gameSquares[8]) { return true;}
        // check bottom left to top right diagonal
        else if(gameSquares[6] !== undefined && gameSquares[6] === gameSquares[4] && gameSquares[4] === gameSquares[2]) { return true;}
        // no one has won yet
        else { return false; }

    }

    return { resetBoard, playSquare };

})();

const gameController = (() => {
    const player1 = playerFactory('X');
    const player2 = playerFactory('O');

    const startGame = () => {
        gameBoard.resetBoard();
    }

})();


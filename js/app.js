//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
]
    /*
    0 1 2
    3 4 5
    6 7 8 
    */

    
/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;
let squareIndex;
tally = {O: 0, X: 0}

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

console.log(squareEls);
console.log(messageEl);
    
/*-------------------------------- Functions --------------------------------*/

const init = function() {
    board = ['', '', '',
             '', '', '',
             '', '', ''];
    turn = 'X';
    winner = false;
    tie = false;
    render();
}

const render = function() {
    updateBoard();
    updateMessage();
}

const updateBoard = function() {
    board.forEach((square, index) => {
     
        board[index] = squareEls[index];

    })
}

const updateMessage = function() {
    const check = board.every((square) => {
        return square.textContent === ''
    })

    if (winner === false && tie === false && check === true) {
       messageEl.textContent = `Ready To Play - |${turn}'s turn|`
    }
    else if(winner === false && tie === false) {
        messageEl.textContent = `Tally (O: ${tally.O} X: ${tally.X}) - |${turn}'s turn|`

    }
    else if (winner === false && tie === true) {
        messageEl.textContent = "The game is a Tie!"
    }
   
    else if (winner === true && tie === false) {
        messageEl.textContent = `${turn} is the Winner!!!`
    }
    
    
}

const handleClick = function(event) {
    
    squareIndex = event.target.id;
    
    if (board[squareIndex].textContent !== '' || winner === true || tie === true) {
        return
    }
    
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
    render();

}

const placePiece = function(index) {

    board.splice(index, 1, turn);
    squareEls[index].textContent = turn;

}


const checkForWinner = function() {
    winningCombos.forEach((combo) => {

        if (squareEls[combo[0]].textContent === 'X' && squareEls[combo[1]].textContent === 'X' && squareEls[combo[2]].textContent === 'X') {
            winner = true
        }
        else if (squareEls[combo[0]].textContent === 'O' && squareEls[combo[1]].textContent === 'O' && squareEls[combo[2]].textContent === 'O') {
            winner = true
        }
        
    })
}

const checkForTie = function() {

    if (winner !== true && tally.X === 5 || tally.O === 5) {
            tie = true
        }

}

const switchPlayerTurn = function() {

if (turn === 'X' && winner === false && tie === false) {
        turn = 'O';
        tally.X += 1;
    }
    else if (turn === 'O' && winner === false && tie === false) {
        turn = 'X';
        tally.O += 1;
    }

}

const reset = function() {

    squareEls.forEach((el) => {
        el.textContent = ''
    })

    tally.O = 0
    tally.X = 0
    
    init()

}

init();

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function (el) {
    el.addEventListener("click", handleClick) 
});

resetBtnEl.addEventListener('click', reset);
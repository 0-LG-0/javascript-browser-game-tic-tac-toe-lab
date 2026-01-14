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
    const tally = {O: 0, X: 0};
    
/*---------------------------- Variables (state) ----------------------------*/

let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');
    
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
    board.forEach((value, index) => {
     
    squareEls[index].textContent = value;

    })
}

const updateMessage = function() {
    

    if (winner === false && tie === false && board.includes('')) {
       messageEl.textContent = `Ready To Play - |${turn}'s turn|`
    }
    else if(winner === false && tie === false) {
        messageEl.textContent = `Wins = (O: ${tally.O} X: ${tally.X}) - |${turn}'s turn|`

    }
    else if (winner === false && tie === true) {
        messageEl.textContent = "The game is a Tie!"
    }
   
    else if (winner === true && tie === false) {
        messageEl.textContent = `${turn} is the Winner!!!`
    }
    
    
}

const handleClick = function(event) {
    
    const squareIndex = event.target.id;
    
    if (board[squareIndex].textContent !== '' || winner === true || tie === true) {
        return
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    if (!winner && !tie) {
    switchPlayerTurn();
    }
    render()
}

const placePiece = function(index) {

    board[index] = turn;
    
}


const checkForWinner = function() {
    
    winningCombos.forEach((combo) => {
        const comboX = combo.every((piece) => {
            return board[piece] === 'X'
        })

        const comboO = combo.every((piece) => {
            return board[piece] === 'O'
        })

         if (!winner && comboX) {
            winner = true;
            tally.X ++;
        }
        else if (!winner && comboO) {
            winner = true;
            tally.O ++;
        }        

    })
}

const checkForTie = function() {
    
    if (!winner && !board.includes('')) {
        tie = true
    }
}

const switchPlayerTurn = function() {

if (turn === 'X' && winner === false && tie === false) {
        turn = 'O';
    }
    else if (turn === 'O' && winner === false && tie === false) {
        turn = 'X';
    }

}

const reset = function() {

    squareEls.forEach((el) => {
        el.textContent = ''
    })
    
    init()

}

init();

/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(function (el) {
    el.addEventListener("click", handleClick) 
});

resetBtnEl.addEventListener('click', reset);
// The DOM Elements
let container = document.getElementById('container');
let demo = document.getElementById("demo");
let playAgain = document.getElementById("playAgain");
let dialogResult = document.getElementById("dialogResult");
let boxes = document.querySelectorAll(".box");

// The game logic

// Defining gameboard object
const gameBoard = {
    board : ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9"],
    firstPlayer : [],
    secondPlayer : []
}
// Defining player objects
function Player(name, sign){
    return { name, sign }
}

const player1 = Player("Player 1", "x");
const player2 = Player("Player 2", "o");

let playerRound = (function(){
    let currentPlayer = 2;

    switchUser = () => {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        return currentPlayer === 1 ? player1 : player2;
    }
    
    const winningCombos = [
        ["box1", "box2", "box3"],
        ["box4", "box5", "box6"],
        ["box7", "box8", "box9"],
        ["box1", "box4", "box7"],
        ["box2", "box5", "box8"],
        ["box3", "box6", "box9"],
        ["box1", "box5", "box9"],
        ["box3", "box5", "box7"]
    ];

    checkWinner = player => {
        return winningCombos.some(combo => combo.every(box => player.includes(box)));
    }
    resultChecker = () => {
        if(checkWinner(gameBoard.firstPlayer)) return "Player 1 wins";
        else if(checkWinner(gameBoard.secondPlayer)) return "Player 2 wins";
    } 

    return { switchUser, resultChecker }
}());

container.addEventListener("click", element => {
    let box = element.target;
    let player = playerRound.switchUser();

    if(!box.innerText){
        box.innerText = player.sign
        let currentIndex = gameBoard.board.indexOf(box.id);
        gameBoard.board.splice(currentIndex, 1);
    
        player.name === "Player 1" ? gameBoard.firstPlayer.push(box.id) : gameBoard.secondPlayer.push(box.id);
        
        console.log(gameBoard.board == [])
        playerRound.resultChecker()
        if(playerRound.resultChecker() === "Player 1 wins" || playerRound.resultChecker() === "Player 2 wins"){
            dialogResult.showModal();
            demo.innerText = playerRound.resultChecker();;
        }
        else if(gameBoard.board .length === 0){
            dialogResult.showModal();
            demo.innerText =  "TIE !"
        } 
    }});
    
    playAgain.addEventListener("click", () => {
        dialogResult.close();
        gameBoard.board = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9"];
        gameBoard.firstPlayer = [];
        gameBoard.secondPlayer = [];

        boxes.forEach(box => box.innerText = "")
    })

  
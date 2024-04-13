// The DOM Elements
let container = document.getElementById('container');
let demo = document.getElementById("demo");
let playAgain = document.getElementById("playAgain");
let dialogResult = document.getElementById("dialogResult");
let boxes = document.querySelectorAll(".box");
let refreshButton = document.getElementById("refreshbutton")
let root = document.querySelector(":root")
//Score Variables
let player1score = document.getElementById("player1score");
let player1scoreValue = Number(player1score.innerText);

let player2score = document.getElementById("player2score");
let player2scoreValue = Number(player2score.innerText);

let tiescore = document.getElementById("tiescore");
let tiescoreValue = Number(tiescore.innerText);
// Defining gameboard object
const gameBoard = {
    board : ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9"],
    firstPlayer : [],
    secondPlayer : [],
    color: ["#fff", "#FCCB06", "#B1DDF1", "#CA2C92", "#FFFFFA", "#E5F4E3", "#FFECD1", "#DDDBCB", "#BA0203", "#A5A9AE", "#F5CB5C", "#FFD000", "#AB00C0"]
}
// Defining player objects
function Player(name, sign){
    return { name, sign }
}

const player1 = Player("Player 1", "x");
const player2 = Player("Player 2", "o");
let currentPlayer = 2;

let playerRound = (function(){
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
        else if(gameBoard.board.length === 0) return "TIE !";
    } 
    scoreAdder = () => {
        if(resultChecker() === "Player 1 wins") player1score.innerText = ++player1scoreValue;
        else if(resultChecker() === "Player 2 wins") player2score.innerText = ++player2scoreValue;
        else if(resultChecker() === "TIE !") tiescore.innerText= ++tiescoreValue;
    }
    refreshScores = () => {
        player1scoreValue = 0;
        player2scoreValue = 0;
        tiescoreValue = 0;

        player1score.innerText = player1scoreValue;
        player2score.innerText = player2scoreValue;
        tiescore.innerText = tiescoreValue;
    }
    return { switchUser, resultChecker, scoreAdder, refreshScores}
}());

container.addEventListener("click", element => {
    let box = element.target;
    let player = playerRound.switchUser();

    if(!box.innerText){
        box.innerText = player.sign
        let currentIndex = gameBoard.board.indexOf(box.id);
        gameBoard.board.splice(currentIndex, 1);
    
        player.name === "Player 1" ? gameBoard.firstPlayer.push(box.id) : gameBoard.secondPlayer.push(box.id);
        playerRound.resultChecker()
        if(playerRound.resultChecker() === "Player 1 wins" || playerRound.resultChecker() === "Player 2 wins" || playerRound.resultChecker() === "TIE !"){
            dialogResult.showModal();
            demo.innerText = playerRound.resultChecker();
        }
        playerRound.scoreAdder()
    }});
1
    playAgain.addEventListener("click", () => {
        dialogResult.close();
        currentPlayer = 2;
        gameBoard.board = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9"];
        gameBoard.firstPlayer = [];
        gameBoard.secondPlayer = [];

        boxes.forEach(box => box.innerText = "");
        let colorIndex = Math.round(Math.random() * 11)
        root.style.setProperty("--surrounding-color", `${gameBoard.color[colorIndex]}` )
    })
    refreshButton.addEventListener("click", () =>{
        refreshButton.classList.remove("animationeffect");
        if(player1scoreValue > 0 || player2scoreValue > 0 || tiescoreValue > 0){
            refreshButton.offsetWidth;
            refreshButton.classList.add("animationeffect");
            playerRound.refreshScores()
        }
}
)

  
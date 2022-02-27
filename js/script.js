// target all the HTML tags needed
const message = document.querySelector('#banner')
const player1 = document.querySelector('#player1')
const player2 = document.querySelector('#player2')
const playAgain = document.querySelector('#againText')
const gameBoxes = document.querySelectorAll('.gamebox')

//var needed to track player moves
let moveCounter = 0
const playerOneMoves = []
const playerTwoMoves = []

//main game function
const startGame = () => {
  // loop through all the game boxes and add eventlistner to each box.
  for (let i = 0; i < gameBoxes.length; i++) {
    gameBoxes[i].addEventListener('click', () => {
      //if box is empty move to allow player to play the box.
      if (gameBoxes[i].innerHTML === '') {
        //if the moveCounter is undedfined, it means the game is over. return without doing anything.
        if (moveCounter === undefined) {
          return
        }
        // if movecounter%2 = 0 that means it is the first players turn.
        else if (moveCounter % 2 === 0) {
          //add a O and change background color to the box that is clicked
          gameBoxes[i].innerHTML = 'O'
          gameBoxes[i].style.backgroundColor = 'red'
          //keep track of the box that was clicked.
          playerOneMoves.push(gameBoxes[i].getAttribute('data-value'))
          //increment movecounter to indicate next player move
          moveCounter++
          //check to see if player win or not.
          if (checkWinner(playerOneMoves)) {
            // if player win. change the banner message and make movecounter undefine.
            message.innerText = 'Player One Wins the Game'
            moveCounter = undefined
            return
          } else if (moveCounter === 9) {
            // if movecounter === 9 the game is a draw.
            message.innerText = 'DRAW GAME'
            return
          }
          //display the next players move
          message.innerHTML = "Player Two's move"
        } else {
          //add a O and change background color to the box that is clicked
          gameBoxes[i].innerHTML = 'X'
          gameBoxes[i].style.backgroundColor = 'green'
          //keep track of the box that was clicked.
          playerTwoMoves.push(gameBoxes[i].getAttribute('data-value'))
          moveCounter++
          //check to see if player win or not.
          if (checkWinner(playerTwoMoves)) {
            // if player win. change the banner message and make movecounter undefine.
            message.innerText = 'Player Two wins the Game'
            moveCounter = undefined
            return
          } else if (moveCounter === 9) {
            // if movecounter === 9 the game is a draw.
            message.innerText = 'DRAW GAME'
            return
          }
          message.innerText = "Player One's Move"
        }
      }
    })
  }
}

//invoke the start game function
startGame()

// function to reset the game
const resetGame = () => {
  //clear all boxes reset it back to the original state
  gameBoxes.forEach((box) => {
    box.innerHTML = ''
    box.style.backgroundColor = 'rgb(159, 162, 164)'
  })
  //return the message back to original message.
  message.innerText = 'Player One Goes First'
  //reset player move tracker to 0
  playerOneMoves.length = 0
  playerTwoMoves.length = 0
  moveCounter = 0
  //invoke game again.
  startGame()
}
// link reset function to PlayAgain btn.
playAgain.addEventListener('click', resetGame)

// check for winner
const checkWinner = (playerMoves) => {
  //tic tac toe winning Sequence
  const winSeq = [
    ['1', '2', '0'],
    ['3', '4', '5'],
    ['6', '7', '8'],
    ['0', '3', '6'],
    ['1', '4', '7'],
    ['2', '5', '8'],
    ['0', '4', '8'],
    ['2', '4', '6']
  ]
  // checking for player move again winning sequence.
  let winNumOne = ''
  let winNumTwo = ''
  let winNumThree = ''
  for (let i = 0; i < winSeq.length; i++) {
    //loop through all possible winning sequence.
    let checkSeq = winSeq[i]
    winNumOne = checkSeq[0]
    winNumTwo = checkSeq[1]
    winNumThree = checkSeq[2]
    //return true if a player matched one of the winning sequence.
    if (
      playerMoves.includes(winNumOne) &&
      playerMoves.includes(winNumTwo) &&
      playerMoves.includes(winNumThree)
    ) {
      return true
    }
  }
}

// const winningSeq = (playerMoves) => {
//   const winSeq = [
//     ['1', '2', '0'],
//     ['3', '4', '5'],
//     ['6', '7', '8'],
//     ['0', '3', '6'],
//     ['1', '4', '7'],
//     ['2', '5', '8'],
//     ['0', '4', '8'],
//     ['2', '4', '6']
//   ]
//   let winNumOne = ''
//   let winNumTwo = ''
//   let winNumThree = ''
//   for (let i = 0; i < winSeq.length; i++) {
//     let checkSeq = winSeq[i]
//     winNumOne = checkSeq[0]
//     winNumTwo = checkSeq[1]
//     winNumThree = checkSeq[2]

//     if (
//       playerMoves.includes(winNumOne) &&
//       playerMoves.includes(winNumTwo) &&
//       playerMoves.includes(winNumThree)
//     ) {
//       return checkSeq
//     }
//   }
// }

// const drawGame = (moves) => {
//   if(moves === 9)
// }
const activePlayer = (player) => {
  player.classList.add('shake')
}
const inactivePlayer = (player) => {
  player.classList.remove('shake')
}

// const boxColorChange = (box) => {
//   box.style.backgroundColor = 'red'
// }

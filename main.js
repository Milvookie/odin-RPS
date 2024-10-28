let buttons = document.querySelectorAll("button")
const choices = document.querySelectorAll(".choice")
const winner = document.querySelector(".winner")
const victoryCount = document.querySelector('.result')

let humanScore = 0;
let computerScore = 0;
let drawScore = 0;

let getHumanChoice = buttons.forEach(item => {
    item.addEventListener('click', e => {
        playGame(item.id)
    })
})

let getComputerChoice = () => {
    switch (Math.floor(Math.random() * 3)) {
        case 1:
            return 'rock'
            break;
        case 2:
            return 'paper'
            break;
        case 0:
            return 'scissors'
            break;
    }
}

function playGame(humanChoice) {
    let roundNumber = humanScore + computerScore + drawScore

    playRound(humanChoice)
        if (roundNumber == 4) {
            displayWinner()
            createResetBtn()
            togglePlayerButton(true)
        }

}

function playRound(humanChoice) {
    let humanSelection = humanChoice
    let computerSelection = getComputerChoice()

    displayChoice(humanSelection, computerSelection)

    // determine winner
    if (humanSelection == computerSelection) {
        winner.textContent = 'It\'s a draw!'
        drawScore++
    } else if (humanSelection == 'rock' && computerSelection == 'scissors' || humanSelection == 'paper' && computerSelection == 'rock' || humanSelection == 'scissors' && computerSelection == 'paper') {
        winner.textContent = 'You won this round!'
        humanScore++
    } else {
        winner.textContent = 'The computer won this round!'
        computerScore++
    }

    // update victory count
    displayVictoryCount()

}

function displayChoice(human, computer) {
    choices[0].textContent = `You chose ${human}`
    choices[1].textContent = `The computer chose ${computer}`
}

function displayVictoryCount() {
    victoryCount.innerText = `
    You have won ${humanScore} times \r\n The computer have won ${computerScore} times \r\n Draw: ${drawScore}
    `
}

function displayWinner() {
    let gameWinner = document.createElement('h2')
    if (humanScore == computerScore) {
        gameWinner.innerText = 'No winner!'
    } else if (humanScore > computerScore) {
        gameWinner.innerText = 'Victory is yours!'
    } else {
        gameWinner.innerText = 'You lost, better luck next time!'
    }
    document.querySelector('body').append(gameWinner)
}

function createResetBtn() {
    let resetBtn = document.createElement("button")
    resetBtn.setAttribute('id', 'resetBtn')
    resetBtn.innerText = 'Reset the game'
    document.querySelector('body').append(resetBtn)
    resetBtn.addEventListener('click', resetGame)
}

function resetGame() {
    choices[0].textContent = ''
    choices[1].textContent = ''
    victoryCount.innerText = ''
    winner.textContent = ''
    document.querySelector('h2').remove()
    humanScore = computerScore = drawScore = 0;
    togglePlayerButton(false)
    document.getElementById('resetBtn').remove()
}

function togglePlayerButton(bool) {
    buttons.forEach(item => item.disabled = bool)
}
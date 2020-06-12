console.log('hi there')

const gameBoard = document.getElementById('gameBoard')
const dots = document.querySelectorAll('.dots')
const playerOneConsole = document.querySelector('.playerOnePieces')
const playerTwoConsole = document.querySelector('.playerTwoPieces')
let playerOnePieces = playerOneConsole.children[1].innerHTML
let playerTwoPieces = playerTwoConsole.children[1].innerHTML
let playerOne = 'playerOne'
let playerTwo = 'playerTwo'
let turn = 0
let lastX
let lastY
let threeMan = null
let allOnBoard = false
let error = false

const checkThree = (e, btn, player) => {
	let x = btn.attributes.cx.value
	let y = btn.attributes.cy.value

	let playerDots = document.querySelectorAll(`.${player}`)
	let xMatch = 0
	let yMatch = 0

	playerDots.forEach(dot => {
		if (dot.cx.baseVal.value == x) {
			xMatch++
		}
		if (dot.cy.baseVal.value == y) {
			yMatch++
		}
	})

	if (xMatch >= 3 || yMatch >= 3) {
		threeMan = player
		console.log(`${player} has 3'pimps `)
	}

	console.log(xMatch, yMatch)
	console.log(playerDots)
}

const playerOneAdd = (e, btn) => {
	btn.classList.replace('empty', playerOne)
	checkThree(e, btn, playerOne)
	playerOnePieces--
	playerOneConsole.children[1].innerHTML = playerOnePieces
	turn = 1
	console.log(`Its Turn:${turn}, playerOne: ${playerOnePieces}, playerTwo: ${playerTwoPieces} Del ${threeMan}`)
}

const playerOneMove = (e, btn, ...args) => {
	btn.classList.replace(playerOne, 'empty')
	lastX = btn.attributes.cx.value
	lastY = btn.attributes.cy.value
	playerOnePieces++
}

const playerOneDel = (e, btn, ...args) => {
	btn.classList.replace(playerOne, 'empty')
	threeMan = false
}

const playerTwoAdd = (e, btn, ...args) => {
	btn.classList.replace('empty', playerTwo)
	checkThree(e, btn, playerTwo)
	playerTwoPieces--
	playerTwoConsole.children[1].innerHTML = playerTwoPieces
	turn = 0
	console.log(`Its Turn:${turn}, playerOne: ${playerOnePieces}, playerTwo: ${playerTwoPieces} Del ${threeMan}`)
}

const playerTwoMove = (e, btn, ...args) => {
	btn.classList.replace(playerTwo, 'empty')
	lastX = btn.attributes.cx.value
	lastY = btn.attributes.cy.value
	playerTwoPieces++
}
const playerTwoDel = (e, btn, ...args) => {
	btn.classList.replace(playerTwo, 'empty')
	threeMan = false
}

gameBoard.addEventListener('click', e => {
	let btn = e.target.closest('circle')
	if (!btn) return
	//Empty
	if (btn.classList.contains('empty')) {
		if (playerOnePieces > 0 || playerTwoPieces > 0) {
			turn === 0 ? playerOneAdd(e, btn) : playerTwoAdd(e, btn)
			return
		}
		//Player One
	} else if (btn.classList.contains(playerOne)) {
		if (turn === 0 && playerOnePieces <= 0 && !threeMan) {
			playerOneMove(e, btn)
		} else if (threeMan === playerTwo) {
			playerOneDel(e, btn, playerOne)
		}
		//Player Two
	} else {
		if (turn === 1 && playerTwoPieces <= 0 && !threeMan) {
			playerTwoMove(e, btn)
		} else if (threeMan === playerOne) {
			playerTwoDel(e, btn, playerTwo)
		}
	}
})

//todo in check three put logic for if x or y < 40 points can move if no false move... unless only 3 left on board

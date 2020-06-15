console.log('hi there')

const gameBoard = document.getElementById('gameBoard')
const dots = document.querySelectorAll('.dots')
const playerOneConsole = document.querySelector('.playerOnePieces')
const playerTwoConsole = document.querySelector('.playerTwoPieces')
const controls = document.querySelector('.controls')

let playerOnePieces = 9
let playerTwoPieces = 9
let playerOne = 'playerOne'
let playerTwo = 'playerTwo'
let turn = playerOne
let lastX
let lastY
let threeMan = null
let allOnBoard = false
let playerOneCaptured = 0
let playerTwoCaptured = 0
let error = false

const rollStart = e => {
	let randomMath = Math.round(Math.random())
	randomMath === 0 ? (turn = playerOne) : (turn = playerTwo)
}

//todo no fly zone unless last 3

const safeMove = (e, btn, player, ...args) => {
	let safe
	if (threeMan) {
		return (safe = false)
	}
	if (!allOnBoard) {
		return (safe = true)
	}
	safe = lastX === btn.attributes.cx.value || lastY === btn.attributes.cy.value ? true : false
	return safe
	/* 	let emptyDots = document.querySelectorAll(`.empty`)
	if (allOnBoard) {
		emptyDots.forEach(dot => {
			if ((dot.cx.baseVal.value = lastX)) {
			} else if ((dot.cy.baseVal.value = lastY)) {
			}
		})
	} */
}

const checkThree = (e, btn, player, ...args) => {
	let x = btn.attributes.cx.value
	let y = btn.attributes.cy.value
	let playerDots = document.querySelectorAll(`.${player}`)
	let xMatch = 0
	let yMatch = 0
	let mill = []

	playerDots.forEach(dot => {
		if (dot.cx.baseVal.value == x) {
			xMatch++
			mill.push(dot)
		}
		if (dot.cy.baseVal.value == y) {
			yMatch++
			mill.push(dot)
		}
	})

	if (xMatch >= 3 || yMatch >= 3) {
		threeMan = player
		threeMan === playerOne
			? (playerTwoConsole.style.setProperty('background-color', 'red'),
			  (turn = playerOne),
			  playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)'))
			: (playerOneConsole.style.setProperty('background-color', 'red'),
			  (turn = playerTwo),
			  playerTwoConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)'))
		mill.forEach(dot => {
			dot.classList.add('mill')
		})
	}
}

//todo more checks
const updateConsole = (e, btn, player) => {}

const safeDel = (e, btn, player, ...args) => {}

const checkTurn = (e, btn, player) => {}

//@ player one actions
const playerOneAdd = (e, btn, player, ...args) => {
	if (safeMove(e, btn, player) === false) {
		return
	}
	btn.classList.replace('empty', player)
	playerOnePieces--
	playerOneConsole.children[1].children[0].innerHTML = playerOnePieces
	playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)')
	turn = playerTwo
	checkThree(e, btn, player)
}

const playerOneMove = (e, btn, ...args) => {
	btn.classList.replace(playerOne, 'empty')
	lastX = btn.attributes.cx.value
	lastY = btn.attributes.cy.value
	playerOnePieces++
	playerOneConsole.children[1].children[0].innerHTML = playerOnePieces
}

const playerOneDel = (e, btn, ...args) => {
	btn.classList.replace(playerOne, 'empty')
	playerOneConsole.style.removeProperty('background-color')
	playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)')
	let mills = document.querySelectorAll('.mill')
	mills.forEach(dot => {
		console.log(dot)
		dot.classList.remove('mill')
	})
	threeMan = false
	playerTwoCaptured++
	playerTwoConsole.children[1].children[1].innerHTML = playerTwoCaptured
	turn = playerOne
	playerTwoCaptured >= 7 ? (playerTwoConsole.children[1].children[1].innerHTML = 'Win') : false
}
//@ playerTwo actions
const playerTwoAdd = (e, btn, player, ...args) => {
	if (safeMove(e, btn, player) === false) {
		return
	}
	btn.classList.replace('empty', player)
	playerTwoPieces--
	playerTwoConsole.children[1].children[0].innerHTML = playerTwoPieces
	console.dir(btn)
	playerTwoConsole.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)')
	turn = playerOne
	checkThree(e, btn, player)
}

const playerTwoMove = (e, btn, ...args) => {
	btn.classList.replace(playerTwo, 'empty')
	lastX = btn.attributes.cx.value
	lastY = btn.attributes.cy.value
	playerTwoPieces++
	playerTwoConsole.children[1].children[0].innerHTML = playerTwoPieces
}

const playerTwoDel = (e, btn, ...args) => {
	btn.classList.replace(playerTwo, 'empty')
	playerTwoConsole.style.removeProperty('background-color')
	playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)')
	let mills = document.querySelectorAll('.mill')
	mills.forEach(dot => {
		console.log(dot)
		dot.classList.remove('mill')
	})
	threeMan = false
	playerOneCaptured++
	playerOneConsole.children[1].children[1].innerHTML = playerOneCaptured
	turn = playerTwo
	playerOneCaptured >= 7 ? (playerOneConsole.children[1].children[1].innerHTML = 'Win') : false
}

gameBoard.addEventListener('click', e => {
	let btn = e.target.closest('circle')
	if (!btn) return
	//<Empty
	if (btn.classList.contains('empty')) {
		if (playerOnePieces > 0 || playerTwoPieces > 0) {
			turn === playerOne ? playerOneAdd(e, btn, playerOne) : playerTwoAdd(e, btn, playerTwo)
			return
		}
		//<Player One
	} else if (btn.classList.contains(playerOne)) {
		if (turn === playerOne && playerOnePieces <= 0 && !threeMan) {
			allOnBoard = true
			playerOneMove(e, btn)
		} else if (threeMan === playerTwo) {
			playerOneDel(e, btn)
		}
		//<Player Two
	} else {
		if (turn === playerTwo && playerTwoPieces <= 0 && !threeMan) {
			allOnBoard = true
			playerTwoMove(e, btn)
		} else if (threeMan === playerOne) {
			playerTwoDel(e, btn)
		}
	}
})

controls.addEventListener('click', e => {
	let btn = e.target.closest('.roll')
	btn ? (rollStart(), (btn.disabled = true)) : false
	turn !== playerOne
		? playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)')
		: playerTwoConsole.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)')
})

//todo move logic ideas
// for if x or y < 40 points can move if no false move... unless only 3 left on board
// queryAll empty then forEach.empty that matches lastX or lastY if length.2 < use less.

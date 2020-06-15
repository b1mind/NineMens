// 9Mind's Morris by Brent (b1Mind) Morton GitHub: (link)

const gameBoard = document.getElementById('gameBoard')
const dots = document.querySelectorAll('.dots')
const playerOneConsole = document.querySelector('.playerOnePieces')
const playerTwoConsole = document.querySelector('.playerTwoPieces')
const controls = document.querySelector('.controls')
const captureIcon = '\u{F057}'
const winIcon = 'Win'

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
let flyBaby = false

const rollStart = e => {
	let randomMath = Math.round(Math.random())
	randomMath === 0 ? (turn = playerOne) : (turn = playerTwo)
}

//@ checks and balances
//todo maybe make safeMove() a switch statement
const safeMove = (e, btn, player, ...args) => {
	let safe
	if (threeMan) {
		return (safe = false)
	}
	if (!allOnBoard) {
		return (safe = true)
	}
	if (lastX === btn.attributes.cx.value && lastY === btn.attributes.cy.value) {
		return (safe = false)
	}
	let playerDots = document.querySelectorAll(`.${player}`)
	console.log(playerDots.length)
	if (playerDots.length <= 2 || flyBaby) {
		flyBaby = true
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

//todo add check if more than one mill give same # capture
const checkMill = (e, btn, player, action, ...args) => {
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

	if (action === 'del') {
		if (xMatch >= 3 || yMatch >= 3) {
			//fixme need logic to del if only avail pieces urgent!
			if (playerDots.length === 3) {
				// working for 3 players on board
				return false
			}
			console.log(mill.length, playerDots.length)
			return true
		}
	}

	if (xMatch >= 3 || yMatch >= 3) {
		threeMan = player
		threeMan === playerOne
			? ((playerTwoConsole.dataset.capture = captureIcon),
			  (turn = playerOne),
			  playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)'))
			: ((playerOneConsole.dataset.capture = captureIcon),
			  (turn = playerTwo),
			  playerTwoConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)'))
		mill.forEach(dot => {
			dot.classList.add('mill')
		})
	}
}

//todo more checks?!?
const updateConsole = (e, btn, player) => {}

const safeDel = (e, btn, player, ...args) => {}

const checkTurn = (e, btn, player) => {}

//@ player one actions
const playerOneAdd = (e, btn, player, ...args) => {
	if (safeMove(e, btn, player) === false) {
		return
	}
	controls.children[1].disabled = true
	btn.classList.replace('empty', player)
	playerOnePieces--
	playerOneConsole.children[1].children[0].innerHTML = playerOnePieces
	playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)')
	turn = playerTwo
	checkMill(e, btn, player, 'add')
}

const playerOneMove = (e, btn, ...args) => {
	controls.children[1].disabled = false
	btn.classList.replace(playerOne, 'empty')
	lastX = btn.attributes.cx.value
	lastY = btn.attributes.cy.value
	lastDot = btn
	playerOnePieces++
	playerOneConsole.children[1].children[0].innerHTML = playerOnePieces
}

const playerOneDel = (e, btn, ...args) => {
	if (checkMill(e, btn, playerOne, 'del')) {
		return
	}
	btn.classList.replace(playerOne, 'empty')
	playerOneConsole.dataset.capture = ''
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
	playerTwoCaptured >= 7
		? ((playerTwoConsole.children[1].children[1].innerHTML = winIcon),
		  playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)'))
		: false
}

//@ playerTwo actions
const playerTwoAdd = (e, btn, player, ...args) => {
	if (safeMove(e, btn, player) === false) {
		return
	}
	controls.children[1].disabled = true
	btn.classList.replace('empty', player)
	playerTwoPieces--
	playerTwoConsole.children[1].children[0].innerHTML = playerTwoPieces
	playerTwoConsole.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)')
	turn = playerOne
	checkMill(e, btn, player, 'add')
}

const playerTwoMove = (e, btn, ...args) => {
	controls.children[1].disabled = false
	btn.classList.replace(playerTwo, 'empty')
	lastX = btn.attributes.cx.value
	lastY = btn.attributes.cy.value
	lastDot = btn
	playerTwoPieces++
	playerTwoConsole.children[1].children[0].innerHTML = playerTwoPieces
}

const playerTwoDel = (e, btn, ...args) => {
	if (checkMill(e, btn, playerTwo, 'del')) {
		return
	}
	btn.classList.replace(playerTwo, 'empty')
	playerTwoConsole.dataset.capture = ''
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
	playerOneCaptured >= 7
		? ((playerOneConsole.children[1].children[1].innerHTML = winIcon),
		  playerOneConsole.parentElement.style.setProperty('background-color', '(202, 89, 95)'))
		: false
}

//@ Game Board Events
gameBoard.addEventListener('click', e => {
	let btn = e.target.closest('circle')
	if (!btn) return
	//<Empty
	if (btn.classList.contains('empty')) {
		if (playerOnePieces > 0 || playerTwoPieces > 0) {
			controls.children[0].disabled = true
			turn === playerOne ? playerOneAdd(e, btn, playerOne) : playerTwoAdd(e, btn, playerTwo)
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
	let btn = e.target.closest('.btn')
	if (!btn) return

	btn.classList.contains('roll') ? (rollStart(), (btn.disabled = true)) : false

	if (btn.classList.contains('undo')) {
		if (turn === playerOne) {
			lastDot.classList.replace('empty', playerOne)
			playerOnePieces--
			//turn = playerTwo
			playerOneConsole.children[1].children[0].innerHTML = playerOnePieces
			controls.children[1].disabled = true
		} else {
			lastDot.classList.replace('empty', playerTwo)
			playerTwoPieces--
			//turn = playerTwo
			playerTwoConsole.children[1].children[0].innerHTML = playerTwoPieces
			controls.children[1].disabled = true
		}
		console.log(turn, playerTwoPieces, playerOnePieces, lastDot)
	}

	turn !== playerOne
		? playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)')
		: playerTwoConsole.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)')
})

//todo move logic ideas
// for if x or y < 40 points can move if no false move... unless only 3 left on board
// queryAll empty then forEach.empty that matches lastX or lastY if length.2 < use less.

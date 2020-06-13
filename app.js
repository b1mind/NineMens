console.log('hi there')

const gameBoard = document.getElementById('gameBoard')
const dots = document.querySelectorAll('.dots')
const playerOneConsole = document.querySelector('.playerOnePieces')
const playerTwoConsole = document.querySelector('.playerTwoPieces')
let playerOnePieces = 9
let playerTwoPieces = 9
let playerOne = 'playerOne'
let playerTwo = 'playerTwo'
let turn = playerOne
let lastX
let lastY
let threeMan = null
let allOnBoard = false
let error = false

//todo no fly zone unless last 3
const safeMove = (e, btn, player, ...args) => {
	let emptyDots = document.querySelectorAll(`.empty`)
	if (allOnBoard) {
		emptyDots.forEach(dot => {
			if ((dot.cx.baseVal.value = lastX)) {
			} else if ((dot.cy.baseVal.value = lastY)) {
			}
		})
	}
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
		player === playerOne
			? playerTwoConsole.style.setProperty('background-color', 'red')
			: playerOneConsole.style.setProperty('background-color', 'red')
		//todo safe from capture in 3
		mill.forEach(dot => {
			dot.classList.add('mill')
		})
	}
}

const playerOneAdd = (e, btn, player, ...args) => {
	btn.classList.replace('empty', player)
	checkThree(e, btn, player)
	playerOnePieces--
	playerOneConsole.children[1].children[0].innerHTML = playerOnePieces
	playerOneConsole.parentElement.style.setProperty('background-color', 'rgb(95, 161, 95)')
	turn = playerTwo
}

const playerOneMove = (e, btn, ...args) => {
	btn.classList.replace(playerOne, 'empty')
	lastX = btn.attributes.cx.value
	lastY = btn.attributes.cy.value
	playerOnePieces++
}

const playerOneDel = (e, btn, ...args) => {
	btn.classList.replace(playerOne, 'empty')
	playerOneConsole.style.removeProperty('background-color')
	let mills = document.querySelectorAll('.mill')
	mills.forEach(dot => {
		console.log(dot)
		dot.classList.remove('mill')
	})
	threeMan = false
}

const playerTwoAdd = (e, btn, player, ...args) => {
	btn.classList.replace('empty', player)
	checkThree(e, btn, player)
	playerTwoPieces--
	playerTwoConsole.children[1].children[0].innerHTML = playerTwoPieces
	console.dir(btn)
	playerTwoConsole.parentElement.style.setProperty('background-color', 'rgb(202, 89, 95)')
	turn = playerOne
}

const playerTwoMove = (e, btn, ...args) => {
	btn.classList.replace(playerTwo, 'empty')
	lastX = btn.attributes.cx.value
	lastY = btn.attributes.cy.value
	playerTwoPieces++
}

const playerTwoDel = (e, btn, ...args) => {
	btn.classList.replace(playerTwo, 'empty')
	playerTwoConsole.style.removeProperty('background-color')
	let mills = document.querySelectorAll('.mill')
	mills.forEach(dot => {
		console.log(dot)
		dot.classList.remove('mill')
	})
	threeMan = false
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
			playerOneMove(e, btn)
		} else if (threeMan === playerTwo) {
			playerOneDel(e, btn)
		}
		//<Player Two
	} else {
		if (turn === playerTwo && playerTwoPieces <= 0 && !threeMan) {
			playerTwoMove(e, btn)
		} else if (threeMan === playerOne) {
			playerTwoDel(e, btn)
		}
	}
})

//todo check three logic
// for if x or y < 40 points can move if no false move... unless only 3 left on board
// queryAll empty then forEach.empty that matches lastX or lastY if length.2 < use less.

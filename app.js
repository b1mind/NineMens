console.log('hi there')

const gameBoard = document.getElementById('gameBoard')
let turn = 0
let playerOnePieces = 9
let playerTwoPieces = 9

const playerOneAdd = (e, btn) => {
	btn.classList.replace('empty', 'playerOne')
	playerOnePieces--
	turn = 1
}

const playerOneMove = (e, btn, ...args) => {
	btn.classList.replace('playerOne', 'empty')
	btn.classList
	playerOnePieces++
}

const playerTwoAdd = (e, btn, ...args) => {
	btn.classList.replace('empty', 'playerTwo')
	playerTwoPieces--
	turn = 0
}

const playerTwoMove = (e, btn, ...args) => {
	btn.classList.replace('playerTwo', 'empty')
	playerTwoPieces++
}

gameBoard.addEventListener('click', e => {
	let btn = e.target.closest('circle')
	if (!btn) return
	if (btn.classList.contains('empty')) {
		if (+playerOnePieces || +playerTwoPieces) {
			turn === 0 ? playerOneAdd(e, btn) : playerTwoAdd(e, btn)
			return
		}
	} else if (btn.classList.contains('playerOne')) {
		if (turn === 0) playerOneMove(e, btn)
	} else {
		if (turn === 1) playerTwoMove(e, btn)
	}

	console.log(`Its Turn:${turn}, playerOne: ${playerOnePieces}, playerTwo: ${playerTwoPieces}`)
})

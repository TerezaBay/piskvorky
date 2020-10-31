'use strict';
console.log('Funguju!');

let hraje = 'circle';

const buttonsElm = document.querySelectorAll('button');
const hrajeSymbolElm = document.querySelector('#change_symbol');

const addSymbol = (e) => {
  if (hraje === 'circle') {
    e.target.classList.add('hraci_plocha--circle');
    hraje = 'cross';
    hrajeSymbolElm.innerHTML = `<img src="podklady/${hraje}.svg" alt="${hraje}"/>`;
    e.target.disabled = true;
  } else {
    e.target.classList.add('hraci_plocha--cross');
    hraje = 'circle';
    hrajeSymbolElm.innerHTML = `<img src="podklady/${hraje}.svg" alt="${hraje}"/>`;
    e.target.disabled = true;
  }
};

// for (let i = 0; i < buttonsElm.length; i++) {
//   buttonsElm[i].addEventListener('click', addSymbol);
// }

// kód od Filipa
// getPosition pro dané políčko vrátí objekt s číslem řádku a sloupce
const boardSize = 10 // 10x10
const fields = document.querySelectorAll('button')

const getPosition = (field) => {
	let fieldIndex = 0
	while (fieldIndex < fields.length) {
		if (field === fields[fieldIndex]) {
			break
		}
		fieldIndex += 1
	}

	return {
		row: Math.floor(fieldIndex / boardSize),
		column: fieldIndex % boardSize,
	}
}

console.log(getPosition("button"))

// getField pro číslo řádku a sloupce vrátí prvek
const getField = (row, column) => fields[row * boardSize + column]

console.log(getField(0, 4))

// getSymbol, pro políčko s křížkem vrátí řetězec "cross" a pro kolečko "circle"
const getSymbol = (field) => {
	if (field.classList.contains('.hraci_plocha--circle')) {
		return 'cross'
	} else if (field.classList.contains('.hraci_plocha--cross')) {
		return 'circle'
	}
}

// isWinningMove(field) se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět. Podle toho vrátí true nebo false

const symbolsToWin = 5
const isWinningMove = (field) => {
	const origin = getPosition(field)
	const symbol = getSymbol(field)

	let i
  let inRow = 1 // Jednička pro právě vybrané políčko
  
	// Koukni doleva
	i = origin.column
	while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
		inRow++
		i--
	}

	// Koukni doprava
	i = origin.column
	while (
		i < boardSize - 1 &&
		symbol === getSymbol(getField(origin.row, i + 1))
	) {
		inRow++
		i++
	}

	if (inRow >= symbolsToWin) {
		return true
	}

	let inColumn = 1
	// Koukni nahoru
	i = origin.row
	while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
		inColumn++
		i--
	}

	// Koukni dolu
	i = origin.row
	while (
		i < boardSize - 1 &&
		symbol === getSymbol(getField(i + 1, origin.column))
	) {
		inColumn++
		i++
	}

	if (inColumn >= symbolsToWin) {
		return true
	}
  return false
}

// moje snaha o propojení
// if (isWinningMove === true) {
//   alert(`Vyhrál ${getSymbol}`)
// } else {
//   alert(`Vyhrál ${getSymbol}`)
// }

for (let i = 0; i < buttonsElm.length; i++) {
  buttonsElm[i].addEventListener('click', addSymbol);
}

for (let i = 0; i < buttonsElm.length; i++) {
  buttonsElm[i].addEventListener('click', (e) => {
    const winner = isWinningMove(e.target)
    
    console.log(winner)
    return winner
  });
}

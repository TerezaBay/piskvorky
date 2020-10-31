'use strict';
console.log('Funguju!');

let hraje = 'circle';

const buttonsElm = document.querySelectorAll('button');
const hrajeSymbolElm = document.querySelector('#change_symbol');

// zobrazení symbolů
buttonsElm.forEach((button) => {
  button.addEventListener('click', (e) => {
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

    console.log('Get position', getPosition(e.target));
    console.log('Get symbol', getSymbol(e.target));
    console.log('Is winning move', isWinningMove(e.target));

    // vyskakovací okno s výsledkem
    const confirmQ = (winMessage) => {
      const askAgain = 'Spustit novou hru?';
      if (confirm(`${winMessage} ${askAgain}`)) {
        location.reload();
      } else null;
    };

    const alertWinner = () => {
      if (isWinningMove(e.target) === true) {
        if (getSymbol(e.target) === 'circle') {
          let winMessage = `Vyhrálo kolečko!`;
          confirmQ(winMessage);
        } else {
          let winMessage = `Vyhrál křížek!`;
          confirmQ(winMessage);
        }
      }
    };
    setTimeout(alertWinner, 100);
  });
});

// Pomocné funkce
// getPosition pro dané políčko vrátí objekt s číslem řádku a sloupce
const boardSize = 10; // 10x10

const getPosition = (button) => {
  let buttonIndex = 0;
  while (buttonIndex < buttonsElm.length) {
    if (button === buttonsElm[buttonIndex]) {
      break;
    }
    buttonIndex += 1;
  }

  return {
    row: Math.floor(buttonIndex / boardSize),
    column: buttonIndex % boardSize,
  };
};

// getField pro číslo řádku a sloupce vrátí prvek
const getField = (row, column) => buttonsElm[row * boardSize + column];

// getSymbol, pro políčko s křížkem vrátí řetězec "cross" a pro kolečko "circle"
const getSymbol = (button) => {
  if (button.classList.contains('hraci_plocha--cross')) {
    return 'cross';
  } else if (button.classList.contains('hraci_plocha--circle')) {
    return 'circle';
  }
};

// isWinningMove(button) se podívá na symbol políčka a zjistí, jestli jich je v řádku nebo ve sloupci sousedících pět; podle toho vrátí true nebo false
const symbolsToWin = 5;
const isWinningMove = (button) => {
  const origin = getPosition(button);
  const symbol = getSymbol(button);

  let i;
  let symbolsInRow = 1; // Jednička pro právě vybrané políčko

  // Koukni doleva
  i = origin.column; // to je číslo sloupce
  while (i > 0 && symbol === getSymbol(getField(origin.row, i - 1))) {
    symbolsInRow += 1;
    i -= 1;
  }

  // Koukni doprava
  i = origin.column;
  while (i < boardSize - 1 && symbol === getSymbol(getField(origin.row, i + 1))) {
    symbolsInRow += 1;
    i += 1;
  }

  if (symbolsInRow >= symbolsToWin) {
    return true;
  }

  let symbolsInColumn = 1;

  // Koukni nahoru
  i = origin.row; // to je číslo řady
  while (i > 0 && symbol === getSymbol(getField(i - 1, origin.column))) {
    symbolsInColumn += 1;
    i -= 1;
  }

  // Koukni dolu
  i = origin.row;
  while (i < boardSize - 1 &&
    symbol === getSymbol(getField(i + 1, origin.column))) {
    symbolsInColumn += 1;
    i += 1;
  }
  console.log("symboly ve sloupci " + symbolsInColumn)

  if (symbolsInColumn >= symbolsToWin) {
    return true;
  }

  // Koukni diagonála "pravá"
  let symbolsInDiagonalRight = 1;
  let r = origin.row; // to je číslo řady
  let c = origin.column; // to je číslo sloupce

  // nahoru doprava
  while (r > 0 && c < boardSize - 1 && symbol === getSymbol(getField(r - 1, c + 1))) {
    symbolsInDiagonalRight += 1;
    r -= 1;
    c += 1;
  }
  
  // dolu doleva
  while (r < boardSize - 1 && c > 0 && symbol === getSymbol(getField(r + 1, c - 1))) {
    symbolsInDiagonalRight += 1;
    r += 1;
    c -= 1;
  }
  console.log("symboly diagonálně " + symbolsInDiagonalRight)
  
  if (symbolsInDiagonalRight >= symbolsToWin) {
    return true;
  }

  // Koukni diagonála "levá"
  // Koukni diagonálně nahoru doleva
  // Koukni diagonálně dolů doprava

  return false;
};

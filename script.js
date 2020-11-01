'use strict';

let hraje = 'circle';

const buttonsElm = document.querySelectorAll('button');
const hrajeSymbolElm = document.querySelector('#change_symbol img');

// zobrazení symbolů
buttonsElm.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (hraje === 'circle') {
      e.target.classList.add('hraci_plocha--circle');
      hraje = 'cross';
      hrajeSymbolElm.src = `podklady/${hraje}.svg`
      hrajeSymbolElm.alt = "Křížek"
    } else {
      e.target.classList.add('hraci_plocha--cross');
      hraje = 'circle';
      hrajeSymbolElm.src = `podklady/${hraje}.svg`
      hrajeSymbolElm.alt = "Kolečko"
    }
    e.target.disabled = true;

    // vyskakovací okno s výsledkem
    const confirmQ = (winMessage) => {
      const askAgain = 'Spustit novou hru?';
      if (confirm(`${winMessage} ${askAgain}`)) {
        location.reload();
      };
    };

    const alertWinner = () => {
      if (isWinningMove(e.target)) {
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
  let symbolsInRow = 1;

  // Koukni doleva
  i = origin.column;
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
  i = origin.row;
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

  if (symbolsInColumn >= symbolsToWin) {
    return true;
  }

  // Koukni diagonála "pravá"
  let r;
  let c;
  let symbolsInDiaRight = 1;
  
  // nahoru doprava
  r = origin.row;
  c = origin.column;
  while (r > 0 && c < boardSize - 1 && symbol === getSymbol(getField(r - 1, c + 1))) {
    symbolsInDiaRight += 1;
    r -= 1;
    c += 1;
  }
  
  // dolu doleva
  r = origin.row;
  c = origin.column;
  while (r < boardSize - 1 && c > 0 && symbol === getSymbol(getField(r + 1, c - 1))) {
    symbolsInDiaRight += 1;
    r += 1;
    c -= 1;
  }
  
  if (symbolsInDiaRight >= symbolsToWin) {
    return true;
  }

  // Koukni diagonála "levá"
  let symbolsInDiaLeft = 1;

  // nahoru doleva
  r = origin.row;
  c = origin.column;
  while (r > 0 && c < boardSize - 1 && symbol === getSymbol(getField(r - 1, c - 1))) {
    symbolsInDiaLeft += 1;
    r -= 1;
    c -= 1;
  }
  
  // dolů doprava
  r = origin.row;
  c = origin.column;
    while (r < boardSize - 1 && c > 0 && symbol === getSymbol(getField(r + 1, c + 1))) {
      symbolsInDiaLeft += 1;
      r += 1;
      c += 1;
    }
    
    if (symbolsInDiaLeft >= symbolsToWin) {
      return true;
    }

  return false;
};

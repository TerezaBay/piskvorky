"use strict";
console.log("Funguju!");

let hraje = "circle";

const buttonsElm = document.querySelectorAll("button")
const hrajeSymbolElm = document.querySelector("#change_symbol")

const addSymbol = (e) => {
  if (hraje === "circle") {
    e.target.classList.add("hraci_plocha--circle")
    hraje = "cross"
    hrajeSymbolElm.innerHTML = `<img src="podklady/${hraje}.svg" alt="${hraje}"/>`
    e.target.disabled = true;
  } else {
    e.target.classList.add("hraci_plocha--cross")
    hraje = "circle"
    hrajeSymbolElm.innerHTML = `<img src="podklady/${hraje}.svg" alt="${hraje}"/>`
    e.target.disabled = true;
  }
}

for (let i = 0; i < buttonsElm.length; i++) {
  buttonsElm[i].addEventListener("click", addSymbol)
}

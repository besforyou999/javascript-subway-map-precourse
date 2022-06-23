import { createLineInfoDivs } from "./createLineInfoDivs.js";

export function createDivPrint() {
  const top = document.body;
  while(top.childElementCount > 1) {
    top.removeChild(top.lastChild);
  }
  
  const container = document.createElement('div');
  const divs = createLineInfoDivs();
  for (let i = 0 ; i < divs.length ; i++) {
    container.appendChild(divs[i]);
  }
  top.appendChild(container);
  return false;
} 


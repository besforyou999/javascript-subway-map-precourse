import { createSelectLineToModDiv } from "./createSelectLineToModDiv.js";

export function createDivSection() {
  const top = document.body;
  while(top.childElementCount > 1) {
    top.removeChild(top.lastChild);
  }
  
  const selectLineToMod = createSelectLineToModDiv();
  top.appendChild(selectLineToMod);
  return false;
} 
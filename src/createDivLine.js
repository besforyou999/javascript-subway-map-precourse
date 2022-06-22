import { createLineInput } from "./createLineInput.js";
import {createLineList} from "./createLineList.js";

export function createDivLine() {
  const top = document.body;
  while(top.childElementCount > 1) {``
    top.removeChild(top.lastChild);
  }

  const lineInput = createLineInput();
  const lineList = createLineList();
  top.appendChild(lineInput);
  top.appendChild(lineList);

  return false;
}
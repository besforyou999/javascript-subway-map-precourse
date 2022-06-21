import { createComponentStationInput } from "./createComponentStationInput.js";
import { createStationList } from "./createStationList.js";

export function createDivStation() {
  const docBody = document.body;
  while(docBody.childElementCount > 1) {
    docBody.removeChild(docBody.lastChild);
  }
  const stationInput = createComponentStationInput();
  const stationList = createStationList();
  docBody.appendChild(stationInput);
  docBody.appendChild(stationList);
  return false;
} 

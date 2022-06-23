import { createLineManagementDiv } from "./createLineManagementDiv.js";

export function createSelectLineToModDiv() {
  const container = document.createElement('div');
  const mainText = createMainText();
  const buttons = createLineButtons();
  container.appendChild(mainText);
  container.appendChild(buttons);
  return container;
}

function createMainText() {
  const text = document.createElement('h3');
  const textnode = document.createTextNode('구간을 수정할 노선을 선택해주세요.');
  text.appendChild(textnode);
  return text;
}

function createLineButtons() {
  const btnContainer = document.createElement('div');
  const lineArr = JSON.parse(window.localStorage.getItem('lines'));
  lineArr.forEach(element => {
    const btn = createBtn(element.lineName);
    btnContainer.appendChild(btn);
  });
  return btnContainer;
}

function createBtn(lineName) {
  const button = document.createElement('button');
  const textNode = document.createTextNode(lineName);
  button.style = "margin: 5px;"
  button.id = lineName;
  button.addEventListener('click', createLineManagementDiv);
  button.appendChild(textNode);
  return button;
}


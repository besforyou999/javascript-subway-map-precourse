import { createSpanTextBold } from "./createLineList.js";
import { createSpanTextNormal } from "./createLineList.js";

export function createLineInfoDivs() {
  const lineArray = JSON.parse(window.localStorage.getItem('lines'));
  let divs = [];
  lineArray.forEach(element => {
    divs.push(createOneLineDiv(element));
  });

  return divs;
}

function createOneLineDiv(lineNode) {
  const div = document.createElement('div');
  div.style = "margin: 15px;"
  const lineName = createSpanTextBold(lineNode.lineName);
  const div2 = document.createElement('div');
  div2.style = "margin-top: 10px";
  for (let i = 0 ; i < lineNode.stationList.length ; i++) {
    const list = document.createElement('li');
    list.appendChild(createSpanTextNormal(lineNode.stationList[i]));
    div2.appendChild(list);
  }
  div.appendChild(lineName);
  div.appendChild(div2);
  return div;
}

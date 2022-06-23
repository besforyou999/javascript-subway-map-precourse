const dropdownId = 'dropdown';
import { createLineRowTd} from "./createLineList.js";

export function createLineManagementDiv(e) {
  deleteExistingManagementPanel();
  const body = document.body;
  const manageContainer = document.createElement('div');
  const lineManageText = createLineManageText(e.target.id);
  const registerInterval = createRegisterInterval();
  const lineTable = createLineTable(e.target.id);
  manageContainer.appendChild(lineManageText);
  manageContainer.appendChild(registerInterval);
  manageContainer.appendChild(lineTable);
  body.appendChild(manageContainer);
}

function createLineManageText(lineName) {
  const text = document.createElement('h3');
  const textnode = document.createTextNode(`${lineName} 관리`);
  text.appendChild(textnode);
  return text;
}

function createRegisterIntervalText() {
  const text = document.createElement('h4');
  const textnode = document.createTextNode(`구간 등록`);
  text.appendChild(textnode);
  return text;
}

function deleteExistingManagementPanel() {
  const body = document.body;
  while(body.childElementCount > 2) {
    body.removeChild(body.lastChild);
  }
}

function createRegisterInterval() {
  const container = document.createElement('div');
  const registerIntervalText = createRegisterIntervalText();
  const dropdownInputRegisterDiv = createDropdownInputRegisterDiv();
  container.appendChild(registerIntervalText);
  container.appendChild(dropdownInputRegisterDiv);
  return container;
}

function createDropdownInputRegisterDiv() {
  const container = document.createElement('div');
  const dropdown = createDropdown();
  const input = createInput();
  const registerBtn = createRegisterBtn();
  container.appendChild(dropdown);
  container.appendChild(input);
  container.appendChild(registerBtn);
  return container;
}

function createDropdown() {
  const select = document.createElement('select');
  select.name = dropdownId;
  select.id = dropdownId;
  const stationArr = JSON.parse(window.localStorage.getItem('stations'));
  for (const station of stationArr) {
    const option = document.createElement('option');
    option.value = station;
    option.text = station;
    select.appendChild(option);
  }
  return select;
}

function createInput() {
  const input = document.createElement('input');
  input.style = "margin: 5px";
  input.id = 'order';
  input.type = 'text';
  input.placeholder = '순서';
  return input;
}

function createRegisterBtn() {
  const button = document.createElement('button');
  const textNode = document.createTextNode('등록');
  button.appendChild(textNode);
  return button;
}

function createLineTable(lineName) {
  const lineTable = document.createElement('table');
  lineTable.id = 'lineTable';
  lineTable.style = "border: 1px solid; margin-top: 30px";
  const tableHead = createFirstRow();
  const rows = createRows(lineName);
  lineTable.appendChild(tableHead);
  for (let i = 0 ; i < rows.length ; i++) {
    lineTable.appendChild(rows[i]);
  }
  return lineTable;
}

function createFirstRow() {
  const row = document.createElement('tr');
  row.id = 'lineTableFirstRow';
  row.style = "border: 1px solid";
  const columns = createTableFirstRowColumns();
  const texts = createTableFirstRowTexts();
  for (let i = 0 ; i < 3 ; i++) {
    columns[i].appendChild(texts[i]);
    row.appendChild(columns[i]);
  }
  return row;
}

function createTableFirstRowColumns() {
  const columns = [];
  for (let i = 0 ; i < 3 ; i++) {
    let element = document.createElement('td');
    element.style = `border: 1px solid; padding-top,padding-bottom: 5px;
     text-align: center;`;
    columns.push(element);
  }
  return columns;
}

function createTableFirstRowTexts() {
  const texts = new Array(3);
  texts[0] = createSpanTextBold('순서');
  texts[1] = createSpanTextBold('이름');
  texts[2] = createSpanTextBold('설정');
  return texts;
}

function createSpanTextBold(textString) {
  const span = document.createElement('span');
  span.style = `font-weight: bold; text-align: center;`;
  span.appendChild(document.createTextNode(textString));
  return span;
}

function createRows(lineName) {
  let rows;
  const lineArray = JSON.parse(window.localStorage.getItem('lines'));
  for (let i = 0 ; i < lineArray.length ; i++) {
    if (lineArray[i].lineName == lineName) {
      rows = createRowTrs(lineArray[i].stationList);
      break;
    }
  }
  return rows;
}

function createRowTrs(stationList) {
  let rows = [];
  let idx = 0;
  stationList.forEach(station => {
    const tr = document.createElement('tr');
    tr.style = "text-align: left; border: 1px solid";
    tr.appendChild(createLineRowTd(idx))
    tr.appendChild(createLineRowTd(station))
    tr.appendChild(createDeleteStaionFromLineBtn(idx));
    rows.push(tr);
    idx++;
  });
  return rows;
}

function createDeleteStaionFromLineBtn(idx) {
  const td = document.createElement('td');
  td.style = `border: 1px solid`;
  const btn = document.createElement('button');
  const btnText = document.createTextNode('노선에서 삭제');
  btn.id = idx;
  btn.append(btnText);
  td.appendChild(btn);
  return td;
}
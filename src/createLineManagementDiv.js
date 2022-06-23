const dropdownId = 'dropdown';
import { createLineRowTd, rebuildLineList } from "./createLineList.js";

export function createLineManagementDiv(e) {
  deleteExistingManagementPanel();
  const body = document.body;
  const lineManageText = createLineManageText(e.target.id);
  const registerInterval = createRegisterInterval(e.target.id);
  const lineTable = createLineTable(e.target.id);
  body.appendChild(lineManageText);
  body.appendChild(registerInterval);
  body.appendChild(lineTable);
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

function createRegisterInterval(lineName) {
  const container = document.createElement('div');
  const registerIntervalText = createRegisterIntervalText();
  const dropdownInputRegisterDiv = createDropdownInputRegisterDiv(lineName);
  container.appendChild(registerIntervalText);
  container.appendChild(dropdownInputRegisterDiv);
  return container;
}

function createDropdownInputRegisterDiv(lineName) {
  const container = document.createElement('div');
  const dropdown = createDropdown();
  const input = createInput();
  const registerBtn = createRegisterBtn(lineName);
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

function createRegisterBtn(lineName) {
  const button = document.createElement('button');
  const textNode = document.createTextNode('등록');
  button.id = lineName;
  button.appendChild(textNode);
  button.addEventListener('click', registerBtnClickListener);
  return button;
}

function registerBtnClickListener(e) {
  const lineArr = JSON.parse(window.localStorage.getItem('lines'));
  let stationList, idx;
  for (let i = 0 ; i < lineArr.length ; i++) {
    if (lineArr[i].lineName == e.target.id) {
      stationList = lineArr[i].stationList;
      idx = i;
      break;
    }
  }
  const dropdown = document.getElementById(dropdownId);
  const input = document.getElementById('order');
  if (isInputValid(input.value, stationList) == false) return;
  addNewStationToLine(dropdown.value, Number(input.value), stationList, lineArr, idx);
  rebuildLineTable(e.target.id);
}

function addNewStationToLine(stationName, index, stationList, lineArr, idx) {
  const len = stationList.length;
  if (index < len) {
    stationList.splice(index, 0, stationName);
  } else {
    stationList.push(stationName);
  }
  lineArr[idx].stationList = stationList;
  window.localStorage.setItem('lines', JSON.stringify(lineArr));
}

function isInputValid(input, stationList) {
  if (!isPositiveInteger(input)) {
    alert('0 이상의 정수를 입력해주세요');
    return false;
  } else if (!inProperRange(input, stationList)) {
    alert('알맞은 범위의 정수를 입력해주세요');
    return false;
  }
  return true;
}

function isPositiveInteger(str) {
  if (typeof str != 'string') return false;
  const num = Number(str);
  if(Number.isInteger(num) && num >= 0) return true;
  return false;
}

function inProperRange(input, stationList) {
  let len = stationList.length;
  if (Number(input) >= 0 && Number(input) <= len) return true;
  return false;
}

function rebuildLineTable(lineName) {
  const body = document.body;
  while(body.childElementCount > 4) {
    body.removeChild(body.lastChild);
  }
  const lineTable = createLineTable(lineName);
  body.appendChild(lineTable);
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
import {createLineNode} from "./lineNode.js";
import {rebuildLineList} from "./createLineList.js";
const dropdownId1 = `stationDropdown1`;
const dropdownId2 = `stationDropdown2`;

export function createLineInput() {
  const container = document.createElement('div');
  const lineNameText = createLineNameText();
  const lineNameInput = createLineNameInput();
  const upperLowerDirEnd = createUpperLowerDirEnd();
  const addLineBtn = createAddLineBtn();
  container.appendChild(lineNameText);
  container.appendChild(lineNameInput);
  container.appendChild(upperLowerDirEnd);
  container.appendChild(addLineBtn);
  return container;
}

function createLineNameText() {
  const lineName = document.createElement('h3');
  const lineNameString = document.createTextNode('노선 이름');
  lineName.appendChild(lineNameString);
  lineName.setAttribute('id', 'lineNameText');
  return lineName;
}

function createLineNameInput() {
  const lineNameInput = document.createElement('input');
  lineNameInput.setAttribute('id', 'lineNameInput');
  lineNameInput.setAttribute('type', 'text');
  lineNameInput.setAttribute('placeholder', '노선 이름을 입력하세요');
  return lineNameInput;
}

function createUpperLowerDirEnd() {
  const upperDirTable = document.createElement('table');
  upperDirTable.id = 'dirTable';
  const upperTr = createUpperTr();
  upperDirTable.appendChild(upperTr);
  const lowerTr = createLowerTr();
  upperDirTable.appendChild(lowerTr);
  return upperDirTable;
}

function createUpperTr() {
  const upperTr = document.createElement('tr');
  upperTr.id = 'upperDirTr';
  const upperDirEndText = createUpperDirText();
  const select = createDropdown1();
  const column1 = document.createElement('td');
  const column2 = document.createElement('td');
  column1.appendChild(upperDirEndText);
  column2.appendChild(select);
  upperTr.appendChild(column1);
  upperTr.appendChild(column2);
  return upperTr;
}

function createUpperDirText() {
  const upperDirEndText = document.createElement('p');
  const upperDirEndTextString = document.createTextNode('상행 종점');
  upperDirEndText.appendChild(upperDirEndTextString);
  return upperDirEndText;
}


function createDropdown1() {
  const select = document.createElement('select');
  select.name = dropdownId1;
  select.id = dropdownId1;
  const stationArr = JSON.parse(window.localStorage.getItem('stations'));
  for (const station of stationArr) {
    const option = document.createElement('option');
    option.value = station;
    option.text = station;
    select.appendChild(option);
  }
  return select;
}

function createLowerTr() {
  const lowerTr = document.createElement('tr');
  lowerTr.id = 'lowerDirTr';
  const lowerDirEndText = createLowerDirText();
  const select = createDropdown2();
  const column1 = document.createElement('td');
  const column2 = document.createElement('td');
  column1.appendChild(lowerDirEndText);
  column2.appendChild(select);
  lowerTr.appendChild(column1);
  lowerTr.appendChild(column2);
  return lowerTr;
}

function createLowerDirText() {
  const lowerDirEndText = document.createElement('p');
  const lowerDirEndTextString = document.createTextNode('하행 종점');
  lowerDirEndText.appendChild(lowerDirEndTextString);
  return lowerDirEndText;
}

function createDropdown2() {
  const select = document.createElement('select');
  select.name = dropdownId2;
  select.id = dropdownId2;
  const stationArr = JSON.parse(window.localStorage.getItem('stations'));
  for (const station of stationArr) {
    const option = document.createElement('option');
    option.value = station;
    option.text = station;
    select.appendChild(option);
  }
  return select;
}

function createAddLineBtn() {
  const btn = document.createElement('button');
  btn.id = "addLineBtn";
  const addBtnText = document.createTextNode('노선 추가');
  btn.appendChild(addBtnText);
  btn.addEventListener('click', addLineBtnClickListener);
  return btn;
}

function addLineBtnClickListener() {
  const inputText = document.getElementById('lineNameInput');
  const inputString = inputText.value;
  if(!checkIfInputLineNameIsValid(inputString)) return;
  const values = checkIfSelectOptionsOverlap();
  if (values == true) return;
  addNewLineToLocalStorage(inputString, values[0], values[1]);
  alert("노선 추가 완료");
  rebuildLineList();
}

function addNewLineToLocalStorage(newLineName, upDirEnd, downDirEnd) {
  const lineArr = JSON.parse(window.localStorage.getItem('lines'));
  const stationList = [upDirEnd, downDirEnd];
  lineArr.push(createLineNode(newLineName, upDirEnd, downDirEnd, stationList));
  window.localStorage.setItem('lines', JSON.stringify(lineArr)); 
}

function checkIfInputLineNameIsValid(inputText) {
  if (inputText == null || inputText == '') {
    alert('노선 이름을 입력해주세요');
    return false;
  } else if (inputText.length <= 1) {
    alert('올바른 노선 이름을 입력해주세요');
    return false;
  } else if (duplicatedLineName(inputText)) {
    alert('중복되지 않는 노선 이름을 입력해주세요');
    return false;
  }
  return true;
}

function duplicatedLineName(inputLineName) {
  const lineArr = JSON.parse(window.localStorage.getItem('lines'));
  for (let i = 0 ; i < lineArr.length ; i++) {
    const lineNode = lineArr[i];
    if (inputLineName == lineNode.lineName)  return true;
  }
  return false;
}

function checkIfSelectOptionsOverlap() {
  const dropdown1 = document.getElementById(dropdownId1);
  const dropdown2 = document.getElementById(dropdownId2);
  if (dropdown1.value == dropdown2.value ) {
    alert('상행 종점과 하행 종점이 같습니다');
    return true;
  } 
  return [dropdown1.value, dropdown2.value];
}
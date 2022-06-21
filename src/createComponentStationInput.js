import { rebuildStationList } from "./createDivStation.js";
const invalidInputAlertMessage1 = "2글자 이상, 중복되지 않는 역 이름을 입력해주세요";
const invalidInputAlertMessage2 = '중복되지 않는 역 이름을 입력해주세요';

export function createComponentStationInput() {
  const div = document.createElement('div');
  const stationName = createStationName();
  const stationInputDiv = createStationInputDiv();
  div.appendChild(stationName);
  div.appendChild(stationInputDiv);
  return div;
}

function createStationName() {
  const stationName = document.createElement('h4');
  const stationNameText = document.createTextNode('역이름');
  stationName.appendChild(stationNameText);
  return stationName;
}

function createStationInputDiv() {
  const stationDiv = document.createElement('div');
  stationDiv.setAttribute('id', 'inputDiv');
  const stationNameInput = createStationNameInput();
  const stationAddBtn = createStationAddBtn();
  stationDiv.appendChild(stationNameInput);
  stationDiv.appendChild(stationAddBtn);
  return stationDiv;
}

function createStationNameInput() {
  const stationNameInput = document.createElement("input");
  stationNameInput.setAttribute('id', 'inputName');
  stationNameInput.setAttribute('type', 'text');
  stationNameInput.setAttribute('name', 'stationName');
  stationNameInput.setAttribute('placeholder', '역 이름을 입력하세요');
  return stationNameInput;
}

function createStationAddBtn() {
  const stationAddBtn = document.createElement('button');
  const addStationText = document.createTextNode('역 추가');
  stationAddBtn.appendChild(addStationText);
  stationAddBtn.setAttribute('id', 'stationAddBtn');
  stationAddBtn.addEventListener('click', stationAddBtnClickListener);
  return stationAddBtn;
}

function stationAddBtnClickListener() {
  const stationsList = JSON.parse(window.localStorage.getItem('stations'));
  const stationNameInput = document.getElementById('inputName');
  const inputString = stationNameInput.value;
  if (checkIfInputIsValid(inputString, stationsList)) {
    addStationToLocalStorage(inputString, stationsList);
  }
  document.getElementById('inputName').value = '';
  rebuildStationList();
}

function addStationToLocalStorage(inputString, stationsList) {
  stationsList.push(inputString);
  window.localStorage.setItem('stations', JSON.stringify(stationsList));
}

function checkIfInputIsValid(inputString , stationsList) {
  if (inputString == '' || inputString.length < 2 || inputString == null) { 
    alert(invalidInputAlertMessage1);
    return false;
  } else if (stationsList != null && checkIfInputOverlap(inputString, stationsList)) {
    alert(invalidInputAlertMessage2);
    return false;
  }
  return true;
}

function checkIfInputOverlap(inputString, stationsList) {
  for (let i = 0 ; i < stationsList.length ; i++) {
    if (inputString == stationsList[i]) return true;
  }
  return false;
}
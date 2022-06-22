import { rebuildStationList } from "./createDivStation.js";

export function createStationList() {
  const container = document.createElement('div');
  const stationListText = createStationListText();
  const stationListTable = createStationListTable();
  container.appendChild(stationListText);
  container.appendChild(stationListTable);
  return container;
}

function createStationListText() {
  const stationList = document.createElement('h2');
  const stationListText = document.createTextNode('🚉지하철 역 목록');
  stationList.appendChild(stationListText);
  return stationList;
}

function createStationListTable() {
  const stationListTable = document.createElement('table');
  stationListTable.setAttribute('id', 'stationListTable');
  const tableHead = createFirstRow();
  stationListTable.appendChild(tableHead);
  const rows = createRows();
  for (let i = 0 ; i < rows.length ; i++) {
    stationListTable.appendChild(rows[i]);
  }
  return stationListTable;
}

function createFirstRow() {
  const tableHead = document.createElement('tr');
  tableHead.setAttribute('id', 'firstRow');
  const column1 = document.createElement('td');
  const column2 = document.createElement('td');
  const text1 = document.createTextNode('역이름');
  const text2 = document.createTextNode('설정');
  column1.appendChild(text1);
  column2.appendChild(text2);
  tableHead.appendChild(column1);
  tableHead.appendChild(column2);
  return tableHead;
}

function createRows() {
  const stationArr = JSON.parse(window.localStorage.getItem('stations'));
  const rows = [];
  for (let i = 0 ; i < stationArr.length ; i++) {
    let row = document.createElement('tr');
    let rowId = "row" + String(i);
    row.setAttribute('id', rowId);
    let columns = createOneRow(stationArr[i], rowId);
    row.appendChild(columns[0]);
    row.appendChild(columns[1]);
    rows.push(row);
  }
  return rows;
}

function createOneRow(stationName, rowId) {
  const btnId = "btn" + rowId;
  let column1 = document.createElement('td');
  let text1 = document.createTextNode(stationName);
  let column2 = document.createElement('button');
  column2.setAttribute('id', stationName);
  column2.addEventListener('click',deleteStationFromArray);
  let text2 = document.createTextNode('삭제');
  column1.appendChild(text1);
  column2.appendChild(text2);
  return [column1, column2];
}

function deleteStationFromArray(event) {
  const stationNameToDelete = event.target.id;
  const stationArr = JSON.parse(window.localStorage.getItem('stations'));
  let idx = 0;
  for (let i = 0 ; i < stationArr.length ; i++) {
    if (stationArr[i] == stationNameToDelete) {
      idx = i;
      break;
    }
  }
  let confirmResult = confirm("정말로 삭제하시겠습니까?");
  if (!confirmResult) return;
  stationArr.splice(idx, 1);
  window.localStorage.setItem('stations', JSON.stringify(stationArr));
  rebuildStationList();
}
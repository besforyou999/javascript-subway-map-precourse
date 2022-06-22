import { createLineNode } from "./lineNode.js";

export function createLineList() {
  const container = document.createElement('div');
  const lineListText = createLineListText();
  const lineListTable = createLineListTable();

  container.appendChild(lineListText);
  container.appendChild(lineListTable);
  return container;
}

function createLineListText() {
  const lineList = document.createElement('h2');
  const lineListText = document.createTextNode('🚉지하철 노선 목록');
  lineList.appendChild(lineListText);
  return lineList;
}

function createLineListTable() {
  const lineListTable = document.createElement('table');
  lineListTable.id = 'lineListTable';
  lineListTable.style = "border: 1px solid";
  const tableHead = createFirstRow();
  const rows = createRows();
  lineListTable.appendChild(tableHead);
  for (let i = 0 ; i < rows.length ; i++) {
    lineListTable.appendChild(rows[i]);
  }
  return lineListTable;
}

function createFirstRow() {
  const row = document.createElement('tr');
  row.id = 'lineListFirstRow';
  row.style = "border: 1px solid";
  const columns = createTableFirstRowColumns();
  const texts = createTableFirstRowTexts();
  for (let i = 0 ; i < 4 ; i++) {
    columns[i].appendChild(texts[i]);
    row.appendChild(columns[i]);
  }
  return row;
}

function createTableFirstRowColumns() {
  const columns = [];
  for (let i = 0 ; i < 4 ; i++) {
    let element = document.createElement('td');
    element.style = "border: 1px solid; padding: 5px";
    columns.push(element);
  }
  return columns;
}

function createTableFirstRowTexts() {
  const texts = new Array(4);
  texts[0] = createSpanTextBold('노선 이름');
  texts[1] = createSpanTextBold('상행 종점역');
  texts[2] = createSpanTextBold('하행 종점역');
  texts[3] = createSpanTextBold('설정');
  return texts;
}

function createSpanTextBold(textString) {
  const span = document.createElement('span');
  span.style = "font-weight: bold";
  span.appendChild(document.createTextNode(textString));
  return span;
}

function createRows() {
  const rows = [];
  const lineArray = JSON.parse(window.localStorage.getItem('lines'));
  for (let i = 0 ; i < lineArray.length ; i++) {
    const lineNode = lineArray[i];
    rows[i] = createLineRow(lineNode);
  }
  return rows;
}

function createLineRow(lineNode) {
  const tr = document.createElement('tr');
  tr.id = lineNode.lineName;
  tr.style = "text-align: left; border: 1px solid";
  tr.appendChild(createLineRowTd(lineNode.lineName));
  tr.appendChild(createLineRowTd(lineNode.upDirEnd));
  tr.appendChild(createLineRowTd(lineNode.downDirEnd));
  tr.appendChild(createDeleteLineBtn());
  return tr;
}

function createLineRowTd(textString) {
  const td = document.createElement('td');
  td.style = "border: 1px solid; padding: 5px";
  td.appendChild(createSpanTextNormal(textString));
  return td;
}

function createSpanTextNormal(textString) {
  const span = document.createElement('span');
  span.appendChild(document.createTextNode(textString));
  return span;
}

function createDeleteLineBtn() {
  const td = document.createElement('td');
  td.style = "border: 1px solid";
  const btn = document.createElement('button');
  const btnText = document.createTextNode('삭제');
  btn.appendChild(btnText);
  td.appendChild(btn);
  return td;
}
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
  const tableHead = document.createElement('tr');
  const columns = createColumns();
  tableHead.appendChild(columns[0]);
  tableHead.appendChild(columns[1]);
  stationListTable.appendChild(tableHead);
  return stationListTable;
}

function createColumns() {
  const column1 = document.createElement('td');
  const column2 = document.createElement('td');
  const text1 = document.createTextNode('역이름');
  const text2 = document.createTextNode('설정');
  column1.appendChild(text1);
  column2.appendChild(text2);
  return [column1, column2];
}
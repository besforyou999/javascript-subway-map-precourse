export function createLineNode(lineName, upDirEnd, downDirEnd, stationList = []) {
  return {
    lineName : lineName,
    upDirEnd : upDirEnd,
    downDirEnd : downDirEnd,
    stationList : stationList
  };
}
export class Node {
  constructor(stationName, nextStation = null) {
    this.stationName = stationName;
    this.nextStation = nextStation;
  }
}

export class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  insertAtFirst(stationName) {
    this.head = new Node(stationName, this.head);
    this.size += 1;
  }

  insertAtLast(stationName) {
    let node = new Node(stationName);
    let current;
    if (!this.head) { // if list is empty
      this.head = node;
    } else {
      current = this.head;
      while (current.next) {  // search to the last node
        current = current.next;
      }
      current.next = node;
    }
    this.size += 1;
  }

  insertAt(stationName, index) {
    if (index < 0 || index > this.size) return;

    if (index === 0) {
      this.head = new Node(stationName, this.head);
      this.size += 1;
      return;
    }

    const node = new Node(stationName);
    let current, previous;

    current = this.head;
    let count = 0;

    while (count < index) {
      previous = current;
      count++;
      current = current.next;
    }

    node.next = current;
    previous.next = node;
    this.size++;
  }

  getAt(index) {
    let current = this.head;
    let count = 0;

    while (current) {
      if (count == index) {
        console.log(current.stationName);
        return current;
      }
      count++;
      current = current.next;
    }
    return null;
  }

  removeAt(index) {
    if (index < 0 || index > this.size) return;

    let current = this.head;
    let previous;
    let count = 0;

    if (index === 0) {
      this.head = current.next;
    } else {
      while (count < index) {
        count++;
        previous = current;
        current = current.next;
      }
      previous.next = current.next;
    }
    this.size--;
  }
  
  removeStation(station) {

    if (this.size <= 0) {
      alert("리스트가 비어있습니다.");
      return;
    }

    let current = this.head;
    let previous;
    let count = 0;

    while (count < this.size) {
      if (current.stationName == station) {
        previous.next = current.next;
        alert(station, " 삭제 성공");
        return;
      }
      count++;
      previous = current;
      current = current.next;
    }

    alert(station, "이 리스트에 존재하지 않는 역입니다");
  }

  hasStation(station) {
    let current = this.head;
    let previous;
    let count = 0;

    while (count < this.size && current) {
      if (current.stationName == station) {
        return true;
      }
      count++;
      previous = current;
      current = current.next;
    }
    return false;
  }
}
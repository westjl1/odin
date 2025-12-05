class Node {
  constructor(value) {
    this.value = value; // The data stored in the node
    this.next = null; // A reference to the next node in the list, initially null
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
    } else {
      let current = this.head;
      while (current.next) {
        current = current.next;
      }
      current.next = newNode;
    }
    this.size++;
  }

  prepend(value) {
    const newHead = new Node(value);
    const lastHead = this.head; //Store last head record
    this.head = newHead; //Set new head to new node
    newHead.next = lastHead; //set newNode.next equal to last head
  }

  size() {
    return this.size;
  }

  head() {
    return this.head;
  }

  tail() {
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    return current;
  }

  at(index) {
    if (index <= this.size) {
      let current = this.head;
      for (let i = 1; i <= index - 1; i++) {
        console.log(`${i} is ${current.value}`);
        current = current.next;
      }
      return current;
    }
  }

  pop() {
    const newLast = this.at(this.size - 1);
    newLast.next = null;
    this.size--;
  }

  contains(value) {
    let current = this.head;
    while (current.next) {
      if (current.value == value) {
        return true;
      } else {
        current = current.next;
      }
    }
    return false;
  }

  find(value) {
    let current = this.head;
    for (let i = 1; i <= this.size; i++) {
      if (current.value == value) {
        return i;
      } else {
        current = current.next;
      }
    }
    return null;
  }

  toString() {
    let retString = `( ${this.head.value} )`;
    let current = this.head;
    while (current.next) {
      retString = retString + ` -> `;
      current = current.next;
      retString = retString + `( ${current.value} )`;
    }
    retString += ` with size: ${this.size}`;
    return retString;
  }

  insertAt(value, index) {
    if (index == 1) {
      this.append(value);
    } else {
      let newNode = new Node(value);
      const nodeBefore = this.at(index - 1);
      const nodeAt = this.at(index);

      nodeBefore.next = newNode;
      newNode.next = nodeAt;
      this.size++;
    }
  }

  removeAt(index) {
    if (index <= this.size) {
      const nodeBefore = this.at(index - 1);
      const nodeAfter = this.at(index + 1);
      nodeBefore.next = nodeAfter;
      this.size--;
    }
  }
}

const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("snake");
list.append("turtle");

console.log(list.toString());
console.log(list.at(3));
list.removeAt(6);
console.log(list.toString());
list.insertAt("eagle", 3);
console.log(list.toString());
console.log(list.contains("bird"));

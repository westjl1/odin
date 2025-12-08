class Node {
  constructor(data = {}, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(treeData = []) {
    this.root = this.buildTree(treeData);
  }

  buildTreeRecur(inArray, start, end) {
    if (start > end) return null;

    let mid = start + Math.floor((end - start) / 2);
    let root = new Node(inArray[mid]);

    root.left = this.buildTreeRecur(inArray, start, mid - 1);
    root.right = this.buildTreeRecur(inArray, mid + 1, end);

    return root;
  }

  buildTree(array) {
    const sortedArray = quickSort(array);

    return this.buildTreeRecur(sortedArray, 0, sortedArray.length - 1);
  }

  find(data, node = this.root) {
    if (node == null) {
      return null;
    }

    if (node.data == data) {
      return node;
    }

    return this.find(data, node.left) || this.find(data, node.right);
  }

  has(data, node = this.root) {
    if (node == null) {
      return false;
    }

    if (node.data == data) {
      return true;
    }

    return this.has(data, node.left) || this.has(data, node.right);
  }

  insert(data) {
    if (this.root == null) {
      this.root = new Node(data);
      return this.root;
    }

    let q = [];
    q.push(this.root);

    while (q.length > 0) {
      let currentNode = q.shift();

      if (currentNode.left !== null) {
        q.push(currentNode.left);
      } else {
        currentNode.left = new Node(data);
        return this.root;
      }

      if (currentNode.right !== null) {
        q.push(currentNode.right);
      } else {
        currentNode.right = new Node(data);
        return this.root;
      }
    }
  }

  completeDelete(dNode) {
    let q = [];
    q.push(this.root);

    while (q.length > 0) {
      let currentNode = q.shift();

      if (currentNode == dNode) {
        currentNode = null;
        return;
      }

      if (currentNode.right) {
        if (currentNode.right === dNode) {
          currentNode.right = null;
          return;
        } else {
          q.push(currentNode.right);
        }
      }

      if (currentNode.left) {
        if (currentNode.left === dNode) {
          currentNode.left = null;
          return;
        } else {
          q.push(currentNode.left);
        }
      }
    }
  }

  remove(data) {
    if (this.root == null) return null;

    if (this.root.left === null && this.root.right === null) {
      if (this.root.data === data) return null;
      else return root;
    }

    let q = [];
    q.push(this.root);

    let deleteNode = null;
    let currentNode = null;

    while (q.length > 0) {
      currentNode = q.shift();

      if (currentNode.data == data) {
        deleteNode = currentNode;
      }

      if (currentNode.left) q.push(currentNode.left);
      if (currentNode.right) q.push(currentNode.right);
    }

    if (deleteNode !== null) {
      let x = currentNode.data;
      deleteNode.data = x;
      this.completeDelete(currentNode);
    }

    return this.root;
  }

  height(node = this.root) {
    if (node === null) {
      return -1;
    }

    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  heightByValue(data) {
    if (this.has(data)) {
      const searchNode = this.find(data);
      return this.height(searchNode);
    }
    return null;
  }

  depth(node = this.root) {
    const rootHeight = this.height();
    const nodeHeight = this.height(node);

    return rootHeight - nodeHeight;
  }

  depthByValue(data) {
    if (this.has(data)) {
      const searchNode = this.find(data);
      return this.depth(searchNode);
    }
    return null;
  }

  isBalanced() {
    let q = [];
    q.push(this.root);

    while (q.length > 0) {
      const currentNode = q.shift();
      let leftHeight = 0;
      let rightHeight = 0;

      if (currentNode.left) {
        leftHeight = this.height(currentNode.left);
        q.push(currentNode.left);
      }
      if (currentNode.right) {
        rightHeight = this.height(currentNode.right);
        q.push(currentNode.right);
      }

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }
    }
    return true;
  }

  allNodes(retOrder = "level") {
    let retArray = [];
    let q = [];
    q.push(this.root);

    switch (retOrder) {
      case "level":
        let currentLevel = 0;

        while (q.length > 0) {
          let len = q.length;

          for (let i = 0; i < len; i++) {
            const currentNode = q.shift();
            retArray.push(currentNode);

            if (currentNode.left !== null) q.push(currentNode.left);
            if (currentNode.right !== null) q.push(currentNode.right);
          }
          currentLevel++;
        }
        break;
      case "pre":
        let currentNodePre = q.shift();
        while (currentNodePre) {
          if (currentNodePre.left == null) {
            retArray.push(currentNodePre);
            currentNodePre = currentNodePre.right;
          } else {
            let current = currentNodePre.left;
            while (current.right !== null && current.right !== currentNodePre) {
              current = current.right;
            }

            if (current.right === currentNodePre) {
              current.right = null;
              currentNodePre = currentNodePre.right;
            } else {
              retArray.push(currentNodePre);
              current.right = currentNodePre;
              currentNodePre = currentNodePre.left;
            }
          }
        }
        break;
      case "post":
        let currentNodePost = q.shift();
        while (currentNodePost) {
          if (currentNodePost.left == null) {
            retArray.push(currentNodePost);
            currentNodePost = currentNodePost.right;
          } else {
            let current = currentNodePost.left;
            while (
              current.right !== null &&
              current.right !== currentNodePost
            ) {
              current = current.right;
            }

            if (current.right === currentNodePost) {
              current.right = null;
              currentNodePost = currentNodePost.right;
            } else {
              retArray.push(currentNodePost);
              current.right = currentNodePost;
              currentNodePost = currentNodePost.left;
            }
          }
        }
        retArray = retArray.reverse();
        break;
      case "in":
        let currentNodeIn = q.shift();

        while (currentNodeIn !== null) {
          if (currentNodeIn.left === null) {
            retArray.push(currentNodeIn);
            currentNodeIn = currentNodeIn.right;
          } else {
            let prev = currentNodeIn.left;
            while (prev.right !== null && prev.right !== currentNodeIn) {
              prev = prev.right;
            }
            if (prev.right === null) {
              prev.right = currentNodeIn;
              currentNodeIn = currentNodeIn.left;
            } else {
              prev.right = null;
              retArray.push(currentNodeIn);
              currentNodeIn = currentNodeIn.right;
            }
          }
        }

        break;
    }

    return retArray;
  }

  allNodesData(retOrder = "level") {
    const nodeArray = this.allNodes(retOrder);
    const dataArray = nodeArray.map((node) => node.data);
    return dataArray;
  }

  rebuildTree() {
    const rebuildData = this.allNodesData();
    this.root = this.buildTree(rebuildData);
  }
}

function quickSort(inArray) {
  if (inArray.length <= 1) {
    return inArray;
  }

  const [checkNum, ...remainder] = inArray;

  //If check num exists elsewhere (dup), just skip it for remove dups on build
  const belowCheck = remainder.filter((num) => num < checkNum);
  const aboveCheck = remainder.filter((num) => num > checkNum);

  return [...quickSort(belowCheck), checkNum, ...quickSort(aboveCheck)];
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const myNewTree = new Tree([1, 7, 1, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67]);

//console.log(myNewTree.root);
// console.log(myNewTree.has(23));
// console.log(myNewTree.find(23));
prettyPrint(myNewTree.root);
// console.log(myNewTree.isBalanced());

console.log(myNewTree.allNodesData("level"));
console.log(myNewTree.allNodesData("pre"));
console.log(myNewTree.allNodesData("post"));
console.log(myNewTree.allNodesData("in"));

// myNewTree.rebuildTree();
// prettyPrint(myNewTree.root);

// console.log(myNewTree.height());
// console.log(myNewTree.height(myNewTree.find(23)));
// console.log(myNewTree.heightByValue(23));

// console.log(myNewTree.depth(myNewTree.find(23)));
// console.log(myNewTree.depthByValue(23));

// myNewTree.insert(25);
// prettyPrint(myNewTree.root);
// myNewTree.remove(4);
// prettyPrint(myNewTree.root);

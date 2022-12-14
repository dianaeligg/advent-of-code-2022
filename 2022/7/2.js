const fs = require('fs');
const minBy = require('../utils/minBy');

const file = process.argv[2] || 'input';

const data = fs.readFileSync(`input/${file}`, {
  encoding: 'utf8',
  flag: 'r',
});

const dataArr = data.split('\r\n');
function changeDirectory(directory, node, root) {
  if (directory === '/') {
    return root;
  } else if (directory === '..') {
    return node.parent;
  }
  return node.children.find((n) => n.id === directory);
}

const dirs = [];

function constructTree(data) {
  const root = new Node('/');
  dirs.push(root);
  let currentNode = root;

  let instruction = data.shift();
  while (instruction) {
    console.log({ instruction });
    if (instruction[0] === '$') {
      const [_, command, arg] = instruction.split(' ');
      if (command === 'cd') {
        currentNode = changeDirectory(arg, currentNode, root);
      }
    } else {
      const [size, name] = instruction.split(' ');
      if (size === 'dir') {
        const newChild = currentNode.addChild(name);
        dirs.push(newChild);
      } else {
        console.log(`adding ${size} to node ${currentNode.id}`);
        currentNode.size += Number(size);
        let tempNode = currentNode;
        while (tempNode.parent) {
          tempNode = tempNode.parent;
          console.log(`adding ${size} to node ${tempNode.id}`);
          tempNode.size += Number(size);
        }
      }
    }

    // currentNode.toString();
    instruction = data.shift();
  }
}

class Node {
  constructor(_id) {
    // console.log(`constructing node with id ${_id}`);
    this.root;
    this.children = undefined;
    this.id = _id;
    this.parent;
    this.size = 0;
  }

  addChild(child) {
    if (this.children === undefined) {
      this.children = [];
    }
    const newChild = new Node(child);
    newChild.parent = this;
    console.log(`adding ${child} to ${this.id}`);
    this.children.push(newChild);
    return newChild;
  }

  toString() {
    console.log(`You're at node ${this.id}`);
  }
}

constructTree(dataArr);

const unusedSpace = 70000000 - dirs.find((dir) => dir.id === '/').size;

const spaceToDelete = 30000000 - unusedSpace;

// console.log({ dirs });
console.log({
  unusedSpace,
});

console.log(dirs.filter((dir) => dir.size >= spaceToDelete));

console.log(
  minBy(
    dirs.filter((dir) => dir.size >= spaceToDelete),
    'size'
  )
);

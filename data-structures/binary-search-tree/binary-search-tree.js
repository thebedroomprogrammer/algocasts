class QNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }
    empty() {
        return !Boolean(this.size);
    }

    enqueue(value) {
        var node = new QNode(value);
        if (!this.first) {
            this.first = node;
            this.last = this.first;
        } else {
            this.last.next = node;
            this.last = node;
        }
        this.size++;
        return this;
    }

    dequeue() {
        var currentfirst = this.first;
        if (!currentfirst) {
            return null;
        }
        this.size--;
        this.first = this.first.next;
        if (this.size === 0) {
            this.last = null;
        }
        return currentfirst.value;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    delete(value, current = this.root) {
        if (current === null) {
            return current;
        } else if (value < current.value) {
            current.left = this.delete(value, current.left);
        } else if (value > current.value) {
            current.right = this.delete(value, current.right);
        } else {
            if (current.left === null && current.right === null) {
                current = null;
            } else if (current.left === null) {
                current = current.right;
            } else if (current.right === null) {
                current = current.left;
            } else {
                var minRight = this.min(current.right);
                current.value = minRight.value;
                current.right = this.delete(minRight.value, current.right);
            }
        }
        return current;
    }

    isBst(current = this.root, min = -Infinity, max = Infinity) {
        if (current === null) {
            return true;
        }

        if (
            current.value >= min &&
            current.value < max &&
            this.isBst(current.left, min, current.value) &&
            this.isBst(current.right, current.value, max)
        ) {
            return true;
        }
        return false;
    }

    inOrderSuccessor(value) {
        var nodeFound = this.find(value);
        if (nodeFound === null) {
            return nodeFound;
        }
        if (nodeFound.right !== null) {
            var minRight = this.min(nodeFound.right);
            return minRight;
        } else {
            var successor = null;
            var ancestor = this.root;
            while (ancestor.value !== nodeFound.value) {
                if (ancestor.value > nodeFound.value) {
                    successor = ancestor;
                    ancestor = ancestor.left;
                } else {
                    ancestor = ancestor.right;
                }
            }
            return successor;
        }
    }
    preOrderTraversal(current = this.root) {
        if (current === null) {
            return;
        }

        console.log(current.value);
        this.preOrderTraversal(current.left);
        this.preOrderTraversal(current.right);
    }

    inOrderTraversal(current = this.root) {
        if (current === null) {
            return;
        }

        this.inOrderTraversal(current.left);
        console.log(current.value);
        this.inOrderTraversal(current.right);
    }

    postOrderTraversal(current = this.root) {
        if (current === null) {
            return;
        }

        this.postOrderTraversal(current.left);

        this.postOrderTraversal(current.right);
        console.log(current.value);
    }

    levelOrderTraversal() {
        if (this.root === null) {
            return;
        }
        var queue = new Queue();

        queue.enqueue(this.root);
        while (!queue.empty()) {
            var node = queue.dequeue();
            console.log(node.value);
            if (node.left !== null) {
                queue.enqueue(node.left);
            }
            if (node.right !== null) {
                queue.enqueue(node.right);
            }
        }
    }

    height(current = this.root) {
        if (current === null) {
            return -1;
        }
        var leftHeight = this.height(current.left);
        var rightHeight = this.height(current.right);
        return Math.max(leftHeight, rightHeight) + 1;
    }

    min(root = this.root) {
        if (root === null) {
            return false;
        }
        var current = root;

        while (current.left !== null) {
            current = current.left;
        }

        return current;
    }

    max(root = this.root) {
        if (root === null) {
            return false;
        }
        var current = root;

        while (current.right !== null) {
            current = current.right;
        }

        return current;
    }

    search(value) {
        if (this.find(value)) {
            return true;
        }
        return false;
    }

    find(value) {
        if (this.root === null) {
            return null;
        } else {
            var current = this.root;
            var found = false;
            while (current !== null && !found) {
                if (value === current.value) {
                    found = true;
                    return current;
                } else if (value <= current.value) {
                    console.log("left");
                    current = current.left;
                } else {
                    console.log("right");

                    current = current.right;
                }
            }
            return current;
        }
    }
    insert(value) {
        //no root
        if (this.root === null) {
            var node = new Node(value);
            this.root = node;
            return this;
        } else {
            var current = this.root;
            while (true) {
                if (value <= current.value) {
                    if (current.left === null) {
                        var node = new Node(value);
                        current.left = node;
                        return this;
                    } else {
                        current = current.left;
                    }
                } else {
                    if (current.right === null) {
                        var node = new Node(value);
                        current.right = node;
                        return this;
                    } else {
                        current = current.right;
                    }
                }
            }
        }
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

var bst = new BinarySearchTree();
bst.insert(30);
bst.insert(10);
bst.insert(40);
bst.insert(5);
bst.insert(15);
bst.insert(35);
bst.insert(45);
bst.insert(1);
bst.insert(6);
bst.insert(14);
bst.insert(16);
bst.insert(31);
bst.insert(36);
bst.insert(42);
bst.insert(50);

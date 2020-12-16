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

class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class AVLTree {
    constructor() {
        this.root = null;
    }

    getBalanceFactor(current=this.root) {
        return this.height(current.left) - this.height(current.right);
    }

    height(current=this.root) {
        let height = 0
        if (current === null) {
            height = -1;
        } else {
            var leftHeight = this.height(current.left);
            var rightHeight = this.height(current.right);
            height = Math.max(leftHeight, rightHeight) + 1;
        }

        return height;

    }

    rotateRight(current) {
        const pivot = current.left;
        const tmp = pivot.right;
        pivot.right = current;
        current.left = tmp;
        return pivot

    }

    rotateLeft(current) {
        const pivot = current.right;
        const tmp = pivot.left;
        pivot.left = current;
        current.right = tmp
        return pivot;
    }

    insertHelper(current, node) {
        if (current === null) {
            current = node
        } else if (node.value <= current.value) {
            current.left = this.insertHelper(current.left, node)
            if (current.left !== null && this.getBalanceFactor(current) > 1) {
                if (node.value > current.left.value) {
                    current = this.rotateRight(current);
                    current = this.rotateLeft(current);
                } else {
                    current = this.rotateRight(current)
                }
            }
        } else if (node.value > current.value) {

            current.right = this.insertHelper(current.right, node);
            if (current.right !== null && this.getBalanceFactor(current) > 1) {
                if (node.value > current.right.value) {
                    current = this.rotateLeft(current);
                } else {
                    current = this.rotateLeft(current)
                    current = this.rotateRight(current)

                }
            }

        }

        return current;
    }

    insert(value) {
        const node = new Node(value);
        this.root = this.insertHelper(this.root, node)

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

    min(current=this.root) {
        if (current === null) {
            return false;
        }

        while (current.left !== null) {
            current = current.left;
        }

        return current;
    }


    delete(value, current=this.root) {
        this.root = this.deleteHelper(value, current);
    }
    
    deleteHelper(value, current) {
        if (current === null) {
            return current
        } else if (value < current.value) {
            current.left = this.deleteHelper(value, current.left)

        } else if (value > current.value) {
            current.right = this.deleteHelper(value, current.right)

        } else {
            if (current.left === null && current.right === null) {
                current = null;
            } else if (current.left === null) {
                current = current.right;
            } else if (current.right === null) {
                current = current.left
            } else {

                const minRight = this.min(current.right);
                current.value = minRight.value;
                current.right = this.deleteHelper(minRight.value, current.right);

            }
        }

        if (current) {
            const balanceFactor = this.getBalanceFactor(current);
           
            if (balanceFactor > 1 && this.getBalanceFactor(current.left) >= 0) {
                current = this.rotateRight(current)
            }
            if (balanceFactor > 1 && this.getBalanceFactor(current.left) < 0) {
                current = this.rotateRight(current)
                current = this.rotateLeft(current)

            }

            if (balanceFactor < -1 && this.getBalanceFactor(current.right) <= 0) {
                current = this.rotateLeft(current)
            }
            if (balanceFactor < -1 && this.getBalanceFactor(current.right) > 0) {
                current = this.rotateLeft(current)
                current = this.rotateRight(current)
            }
        }
        return current;
    }

}

var avl = new AVLTree();
avl.insert(20)
avl.insert(10)
avl.insert(30)
avl.insert(5)
avl.insert(12)
avl.insert(25)
avl.insert(35)
avl.insert(40)


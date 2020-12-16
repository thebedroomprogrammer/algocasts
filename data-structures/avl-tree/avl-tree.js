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

    rotateLL(current) {
        const pivot = current.left;
        const parent = current;
        parent.left = null
        current = pivot;
        pivot.right = parent;   
        return current;
    }

    rotateRR(current) {
        const pivot = current.right;
        const parent = current;
        parent.right = null
        current = pivot;
        pivot.left = parent;   
        return current;
    }

    rotateLR(current) {
        const pivot = current.left;
        const parent = current;
        parent.left = pivot.right;
        parent.left.left = pivot;
        pivot.right =null;
        current = this.rotateLL(current);
       return current

    }

    rotateRL(current) {
         const pivot = current.right;
        const parent = current;
        parent.right = pivot.left;
        parent.right.right = pivot;
        pivot.right = null;
        current = this.rotateRR(current)
        return current;
       
    }

    insertHelper(current, node) {
        if (current === null) {
            current = node
        } else if (node.value <= current.value) {
            current.left = this.insertHelper(current.left, node)
            if (current.left !== null && this.getBalanceFactor(current) > 1) {
                if (node.value > current.left.value) {
                    current = this.rotateLR(current);

                } else {
                    current = this.rotateLL(current)
                }
            }
        } else if (node.value > current.value) {

            current.right = this.insertHelper(current.right, node);
             if (current.right !== null && this.getBalanceFactor(current) > 1) {
                if (node.value > current.right.value) {
                    current = this.rotateRR(current);
                } else {
                    current = this.rotateRL(current)
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

}

var avl = new AVLTree();
avl.insert(20)
avl.insert(19)
avl.insert(18)
avl.insert(17)
avl.insert(15)
avl.insert(13)
avl.insert(12)
avl.insert(18)






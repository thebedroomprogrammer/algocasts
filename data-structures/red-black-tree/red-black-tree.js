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
    constructor(value, color) {
        this.value = value;
        this.left = null;
        this.right = null;
        this.color = color;
    }
}

var COLOR = {
    RED: "RED",
    BLACK: "BLACK"
}

var STATE = {
    RECOLOR: "RECOLOR",
    ROTATE: "ROTATE",
    NONE: "NONE",
}

class RBTree {
    constructor() {
        this.root = null;
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

    insert(value) {
        const node = new Node(value,!this.root ? COLOR.BLACK : COLOR.RED);
        const data = this.insertHelper(this.root, this.root, node)
        this.root = data[0];
    }

    invert(color) {

        return color === COLOR.RED ? COLOR.BLACK : COLOR.RED;
    }

    recolor(current) {
        current.left.color = this.invert(current.left.color)
        current.right.color = this.invert(current.right.color)
        if (current !== this.root) {
            current.color = this.invert(current.color)
        }
    }

    insertHelper(current, sibling, node) {
        let currentState = STATE.NONE;
        if (current === null) {
            current = node
        } else if (node.value < current.value) {
            const data = this.insertHelper(current.left, current.right, node)
            const returnedState = data[1];

            current.left = data[0];
            //detecting red red edge
            if (current.color === COLOR.RED && current.left.color === COLOR.RED) {
                if (sibling && sibling.color === COLOR.RED) {
                    currentState = STATE.RECOLOR;
                } else {
                    currentState = STATE.ROTATE;

                }
            }

            if (returnedState === STATE.RECOLOR) {
                this.recolor(current)

            } else if (returnedState === STATE.ROTATE) {
                const child = current.left;
                if (child.left && child.left.color === COLOR.RED) {
                    // right rotate
                    current.color = this.invert(current.color);
                    current = this.rotateRight(current)
                    current.color = this.invert(current.color);

                } else if (child.right && child.right.color === COLOR.RED) {
                    // left - right rotate
                    current.color = this.invert(current.color);
                    current.left = this.rotateLeft(current.left)
                    current = this.rotateRight(current)
                    current.color = this.invert(current.color);

                }
            }

        } else if (node.value > current.value) {
            const data = this.insertHelper(current.right, current.left, node);
            const returnedState = data[1];
            current.right = data[0]

            //detecting red red edge
            if (current.color === COLOR.RED && current.right.color === COLOR.RED) {
                if (sibling && sibling.color === COLOR.RED) {
                    currentState = STATE.RECOLOR;
                } else {

                    currentState = STATE.ROTATE;

                }
            }

            if (returnedState === STATE.RECOLOR) {
                this.recolor(current)

            } else if (returnedState === STATE.ROTATE) {
                const child = current.right;
                if (child.right && child.right.color === COLOR.RED) {
                    // left rotate
                    current.color = this.invert(current.color);
                    current = this.rotateLeft(current)
                    current.color = this.invert(current.color);

                } else if (child.left && child.left.color === COLOR.RED) {
                    // right - left rotate
                    current.color = this.invert(current.color);
                    current.right = this.rotateRight(current.right)
                    current = this.rotateLeft(current)
                    current.color = this.invert(current.color);

                }
            }
        }

        return [current, currentState];
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

var rb = new RBTree();
rb.insert(10)
rb.insert(18)
rb.insert(7)
rb.insert(15)
rb.insert(16)
rb.insert(30)
rb.insert(25)
rb.insert(40)
rb.insert(60)
rb.insert(2)
rb.insert(1)
rb.insert(70)



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

var STATE_DELETE = {
    NONE: "NONE",
    SIBLING_BLACK_CHILDREN_BLACK: "SIBLING_BLACK_CHILDREN_BLACK",
    SIBLING_BLACK_CHILDREN_RED: "SIBLING_BLACK_CHILDREN_RED",
    SIBLING_RED: "SIBLING_RED",

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

    min(current=this.root) {
        if (!current) {
            return current;
        }

        if (current.left) {
            return this.min(current.left)
        } else if (!current.left) {
            return current
        }
    }

    delete(value, current=this.root) {
        const data = this.deleteHelper(value, current, current);
        this.root = data[0]
    }

    deleteHelper(value, current, sibling) {
        let currentState = STATE_DELETE.NONE;
        let deletedNode;
        let returnedState = STATE_DELETE.NONE;
        let actualDeltedNode;
        if (current === null) {
            return [current, state];
        }
        
        if (value < current.value) {

            const data = this.deleteHelper(value, current.left, current.right);
            returnedState = data[1];
            current.left = data[0];
            actualDeltedNode = data[2];

        } else if (value > current.value) {

            const data = this.deleteHelper(value, current.right, current.left);
            returnedState = data[1];
            current.right = data[0];
            actualDeltedNode = data[2];

        } else if (current.value === value) {

            if (current.left === null && current.right === null) {
                deletedNode = current;

                current = null

            } else if (current.left === null) {

                current.value = current.right.value;
                const data = this.deleteHelper(current.right.value, current.right, current.left)
                returnedState = data[1];
                current.right = data[0];
                actualDeltedNode = data[2]

            } else if (current.right === null) {

                current.value = current.left.value;
                const data = this.deleteHelper(current.left.value, current.left, current.right)

                returnedState = data[1];
                current.left = data[0];
                actualDeltedNode = data[2]

            } else {

                const minRight = this.min(current.right)
                current.value = minRight.value;
                const data = this.deleteHelper(minRight.value, current.right, current.left);
                returnedState = data[1];

                current.right = data[0]
                actualDeltedNode = data[2]

            }

        }

        if (deletedNode) {

            const node = deletedNode;

            // case 1: Node deleted was red
            currentState = this.getState(node, sibling);

        }

        if (returnedState !== STATE_DELETE.NONE) {

            // case 2: Sibling black and children black
            if (returnedState === STATE_DELETE.SIBLING_BLACK_CHILDREN_BLACK) {
                const data = this.siblingBlackChildrenBlack(current, currentState, actualDeltedNode, value, sibling)
                current = data[0];
                currentState = data[1];

            }// case 2: sibling is red perform rotation to make sibling black
            else if (returnedState === STATE_DELETE.SIBLING_RED) {
                const data = this.siblingRed(current, currentState, actualDeltedNode, value)
                current = data[0];
                currentState = data[1];

            }//case 3: sibling black at least on children red
            else if (returnedState === STATE_DELETE.SIBLING_BLACK_CHILDREN_RED) {

                const data = this.siblingBlackChildrenRed(current, currentState, actualDeltedNode, value);
                current = data[0];
                currentState = data[1];

            }

        }

        return [current, currentState, deletedNode ? deletedNode : actualDeltedNode]
    }

    siblingBlackChildrenRed(current, currentState, actualDeltedNode, value) {
        
        let sibling1;

        if (actualDeltedNode.value === value) {
            sibling1 = value < current.value ? current.right : current.left;

        } else {
            sibling1 = value > current.value ? current.right : current.left;
        }
  

        //check for far and near child logic

        // sibling is to the left of parent
        if (value > sibling1.value) {
            //check if child is near
            if (sibling1.right.color !== COLOR.RED && sibling1.left.color === COLOR.RED) {

                const siblingColor = sibling1.color;
                sibling1.color = sibling1.right.color;
                sibling1.right.color = siblingColor
                current.left = this.rotateLeft(current.left);

            }
            //child is far

            //swap color of parent and sibling
            //rotate right
            //change color of far child to black

            const parentColor = current.color;
            current.color = sibling1.color;
            sibling1.color = parentColor;
            sibling1.left.color = COLOR.BLACK

            current = this.rotateRight(current);

        }// sibling is to the right of parent
        else if (value < sibling1.value) {
            //check if child is near
            if (sibling1.right.color !== COLOR.RED && sibling1.left.color === COLOR.RED) {
                const siblingColor = sibling1.color;
                sibling1.color = sibling1.left.color;
                sibling1.right.color = siblingColor
                current.right = this.rotateLeft(current.right);

            }
            //check if child is far

            const parentColor = current.color;
            current.color = sibling1.color;
            sibling1.color = parentColor;
            sibling1.right.color = COLOR.BLACK

            current = this.rotateLeft(current);

        }
        console.log(current,currentState)
        return [current, currentState]
    }

    siblingRed(current, currentState, actualDeltedNode, value) {
        // do rotation
        current.color = this.invert(current.color);
        let sibling;
        let newCurrent;
        //comparision must be made always to the cureent value
        // always compare actual deleted nodes value.

        const valueToCompare = actualDeltedNode.value === value ? value : actualDeltedNode.value;

        if (valueToCompare < current.value) {
            current = this.rotateLeft(current)

        } else if (valueToCompare > current.value) {
            current = this.rotateRight(current)

        }
        current.color = this.invert(current.color);
        if (valueToCompare < current.value) {
            currentState = this.getState(actualDeltedNode, current.left.right);
            sibling = current.left.right;
            newCurrent = current.left;

        } else if (valueToCompare > current.value) {
            currentState = this.getState(actualDeltedNode, current.right.left)
            sibling = current.right.left;
            newCurrent = current.right;

        }

        if (currentState === STATE_DELETE.SIBLING_BLACK_CHILDREN_BLACK) {
            const data = this.siblingBlackChildrenBlack(newCurrent, currentState, actualDeltedNode, value, sibling)
            currentState = data[1];

            if (valueToCompare < current.value) {
                current.left.right = data[0]

            } else if (valueToCompare > current.value) {

                current.right.left = data[0]

            }
        } else if (currentState === STATE_DELETE.SIBLING_BLACK_CHILDREN_RED) {
            const data = this.siblingBlackChildrenRed(newCurrent, currentState, actualDeltedNode, value)
            currentState = data[1];
            if (valueToCompare < current.value) {
                current.left.right = data[0]

            } else if (valueToCompare > current.value) {

                current.right.left = data[0]

            }
        }
        console.log(current,currentState)

        return [current, currentState]
    }

    siblingBlackChildrenBlack(current, currentState, actualDeltedNode, value, sibling) {
        let sibling1;
        if (actualDeltedNode.value === value) {
            sibling1 = value < current.value ? current.right : current.left;

        } else {
            sibling1 = value > current.value ? current.right : current.left;
        }
        sibling1.color = COLOR.RED;

        // case where parent made red and child black thats it
        if (current.color === COLOR.RED) {
            current.color = COLOR.BLACK;

        }//case where parent is already black so we make parent double black and sibling red and bubble up
        else {
            currentState = this.getState(current, sibling);
        }
        console.log(current,currentState)

        return [current, currentState]
    }

    getState(node, sibling) {
        let currentState = STATE_DELETE.NONE;
        if (node.color === COLOR.RED) {//do nothing
        } else if (sibling.color === COLOR.RED) {
            currentState = STATE_DELETE.SIBLING_RED;
        } else if (sibling.color === COLOR.BLACK && ((sibling.left && sibling.left.color === COLOR.RED) || (sibling.right && sibling.right.color === COLOR.RED))) {
            currentState = STATE_DELETE.SIBLING_BLACK_CHILDREN_RED;
        } else if (node.color === COLOR.BLACK && sibling.color === COLOR.BLACK && (!sibling.left || sibling.left.color === COLOR.BLACK) && (!sibling.right || sibling.right.color === COLOR.BLACK)) {
            currentState = STATE_DELETE.SIBLING_BLACK_CHILDREN_BLACK;
        }

        return currentState;
    }

}

var rb = new RBTree();


rb.insert(11)
rb.insert(22)
rb.insert(1)
rb.insert(100)
rb.insert(55)
rb.insert(43)
rb.insert(34)
rb.insert(56)
rb.insert(76)
rb.insert(87)

rb.insert(32)
rb.insert(66)
rb.insert(21)
rb.insert(26)
rb.insert(84)
rb.insert(99)
rb.insert(69)
rb.insert(91)
rb.insert(35)


rb.delete(34)
rb.delete(56)
rb.delete(22)
rb.delete(32)



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

    delete(value, current) {
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

            }// case 2: sibling is red perform rotation to make sibling black
            else if (returnedState === STATE_DELETE.SIBLING_RED) {
                // do rotation
                current.color = this.invert(current.color);
                const valueToCompare = actualDeltedNode.value === value ? value :current.value;
                
                if (value > valueToCompare) {
                    current = this.rotateLeft(current)

                } else if (value < valueToCompare) {
                    current = this.rotateRight(current)

                }
                current.color = this.invert(current.color);

                currentState = this.getState(actualDeltedNode,sibling)
            

            }//case 3: sibling black at least on children red
            else if (returnedState === STATE_DELETE.SIBLING_BLACK_CHILDREN_RED) {

                let sibling1;

                if (actualDeltedNode.value === value) {
                    sibling1 = value < current.value ? current.right : current.left;

                } else {
                    sibling1 = value > current.value ? current.right : current.left;
                }
                sibling1.color = COLOR.RED;

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

            }

        }

        return [current, currentState, deletedNode]
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
// rb.insert(10)
// rb.insert(18)
// rb.insert(7)
// rb.insert(15)
// rb.insert(16)
// rb.insert(30)
// rb.insert(25)
// rb.insert(40)
// rb.insert(60)
// rb.insert(2)
// rb.insert(1)
// rb.insert(70)

// rb.delete(70, rb.root)
// rb.delete(60, rb.root)
// rb.delete(30, rb.root)
// rb.delete(40, rb.root)
// rb.delete(15, rb.root)
// rb.delete(18, rb.root)
// rb.delete(16, rb.root)

rb.insert(50)
rb.insert(20)
rb.insert(65)
rb.insert(15)
rb.insert(35)
rb.insert(55)
rb.insert(70)
rb.insert(68)
rb.insert(80)
rb.insert(90)

rb.delete(90, rb.root)
rb.delete(80, rb.root)
rb.delete(68, rb.root)
// rb.delete(65, rb.root)
// rb.delete(55, rb.root)
// rb.delete(35, rb.root)
// rb.delete(15, rb.root)
// rb.delete(65, rb.root)
// rb.delete(20, rb.root)
// rb.delete(50, rb.root)



// rb.delete(70, rb.root)
// rb.delete(15, rb.root)
// rb.delete(18, rb.root)
// rb.delete(16, rb.root)

// rb.delete(1, rb.root)

// 10,18,7,15,16,30,25,40,60,2,1,70

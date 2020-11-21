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
            return null
        }
        this.size--;
        this.first = this.first.next;
        if (this.size === 0) {

            this.last = null;
        }
        return currentfirst.value;
    }

}

/*
                    30
                   /  \
                  /    \
                 /      \
                10      40
               /  \    /  \
              /   \   /   \
             5   15   35   45
           / \  / \  /  \  / \
          1  6 14 16 31 36 42 50

*/

//LEVEL ORDER TRAVERSAL - 30,10,40,5,15,35,45,1,6,14,16,31,36,42,50
//PREORDER TRAVERSAL - 30,10,5,1,6,15,14,16,40,35,31,36,45,42,50
//INORDER TRAVERSAL - 1,5,6,10,14,15,16,30,31,35,36,40,42,45,50
//POSTORDER TRAVERSAL - 1,6,5,14,16,15,10,31,36,35,42,50,45,40,30

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    preOrderTraversal(current=this.root) {
        if (current === null) {
            return;
        }

        console.log(current.value);
        this.preOrderTraversal(current.left);
        this.preOrderTraversal(current.right);
    }

    inOrderTraversal(current=this.root) {
        if (current === null) {
            return;
        }

        this.inOrderTraversal(current.left);
        console.log(current.value);
        this.inOrderTraversal(current.right);
    }

    postOrderTraversal(current=this.root) {
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
                queue.enqueue(node.left)
            }
            if (node.right !== null) {
                queue.enqueue(node.right)
            }
        }

    }

    height(current=this.root) {
        if (current === null) {
            return -1;
        }
        var leftHeight = this.height(current.left);
        var rightHeight = this.height(current.right);
        return Math.max(leftHeight, rightHeight) + 1
    }

    get min() {
        if (this.root === null) {
            return false
        }
        ;var current = this.root;

        while (current.left !== null) {
            current = current.left
        }

        return current.value;
    }

    get max() {
        if (this.root === null) {
            return false
        }
        ;var current = this.root;

        while (current.right !== null) {
            current = current.right
        }

        return current.value;
    }

    search(value) {
        if (this.root === null) {
            return false;
        } else {
            var current = this.root;
            var found = false;
            while (current !== null && !found) {
                if (value === current.value) {
                    console.log("found");

                    found = true;
                } else if (value <= current.value) {
                    console.log("left");
                    current = current.left
                } else {
                    console.log("right");

                    current = current.right;
                }
            }
            return found;
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
                        return this
                    } else {
                        current = current.left;
                    }

                } else {
                    if (current.right === null) {
                        var node = new Node(value);
                        current.right = node;
                        return this
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
bst.insert(30)
bst.insert(10)
bst.insert(40)
bst.insert(5)
bst.insert(15)
bst.insert(35)
bst.insert(45)
bst.insert(1)
bst.insert(6)
bst.insert(14)
bst.insert(16)
bst.insert(31)
bst.insert(36)
bst.insert(42)
bst.insert(50)


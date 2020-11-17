class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
        this.previous = null;
    }

}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    push(value) {
        var node = new Node(value);
        if (this.length === 0) {
            this.head = node;
            this.tail = node;

        } else {
            this.tail.next = node;
            node.previous = this.tail;
            this.tail = node;
        }
        this.length++
        return this
    }

    pop() {
        if (this.length === 0) {
            return null;
        }
       
        var removedNode = this.tail;
        if (this.length === 1) {
            this.head = null
            this.tail = null
            this.length--;

            return removedNode;
        } else {
           
            this.tail = this.tail.previous;
            this.tail.next = null;
            removedNode.previous = null;
            this.length--;

            return removedNode;

        }

    }

    shift() {
        if (this.length === 0) {
            return null;
        }
        var removedNode = this.head;
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            this.head.next.previous = null
            this.head = this.head.next;
            removedNode.next = null
        }
        this.length--;
        return removedNode;
    }

    unshift(value) {
        var node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            node.next = this.head;
            this.head.previous = node;
            this.head = node;
        }
        this.length++;
        return this;
    }

    get(position) {
        if (position < 0 || position >= this.length) {
            return null
        }
        var currentNode
        if (position <= this.length / 2) {
            currentNode = this.head;
            for (var i = 0; i < this.length; i++) {
                if (position === i) {
                    return currentNode;
                }
                currentNode = currentNode.next;
            }
        } else {
            currentNode = this.tail;
            for (var i = this.length - 1; i >= 0; i--) {
                if (position === i) {
                    return currentNode;
                }
                currentNode = currentNode.previous;
            }

        }
        return currentNode;

    }

    set(position, value) {
        var node = this.get(position);
        if (!node) {
            return false
        }
        node.value = value;
        return true;

    }

    insert(position, value) {
        if (this.length === 0 || position >= this.length) {
            return false
        }
        if (position === 0) {
            this.unshift(value);
            return true;
        } else if (position === this.length - 1) {
            this.push(value)
            return true;

        }
        var node = this.get(position);
        var newNode = new Node(value);
        newNode.previous = node.previous;
        node.previous.next = newNode;
        node.previous = newNode;
        newNode.next = node;
        this.length++;
        return true;
    }

    remove(position) {
        if (this.length === 0 || position >= this.length) {
            return false
        }
        if (position === 0) {
            return this.shift();

        } else if (position === this.length - 1) {
            return this.pop()

        }

        var node = this.get(position);
        node.previous.next = node.next;
        node.next.previous = node.previous;
        node.next = null
        node.previous = null
        this.length--;
        return node;
    }

    traverse() {
        var currentNode = this.head;
        if (!currentNode) {
            return null
        }
        for (var i = 0; i < this.length; i++) {
            console.log(currentNode.value);
            currentNode = currentNode.next;
        }
    }

}

var dll = new DoublyLinkedList();

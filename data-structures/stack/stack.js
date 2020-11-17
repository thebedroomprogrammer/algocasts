class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class Stack {
    constructor() {
        this.first = null;
        this.last = null;
        this.size = 0;
    }

    push(value) {
        var node = new Node(value);
        if (!this.first) {
            this.first = node;
            this.last = this.first;
        } else {
            node.next = this.first;
            this.first = node;
        }
        this.size++;
        return this;
    }

    pop() {
        var top = this.first;
        if (!top) {
            return null;
        }
        this.size--;
        this.first = this.first.next;
        if (this.size === 0) {
            this.last = null;
        }
        return top;
    }
}


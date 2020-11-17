class Node {
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

    enqueue(value) {
        var node = new Node(value);
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
        return currentfirst;
    }

}

const queue = new Queue()
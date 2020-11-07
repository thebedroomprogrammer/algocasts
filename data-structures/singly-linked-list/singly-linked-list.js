//insertion O(1)
// removal O(1)
// searching O(N)
// access O(N)

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class SinglyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    //pushes value at the end of the linked list
    push(value) {
        var node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
        this.length++;
        return this;
    }

    //traverse the list and print the value stored in the elements
    traverse() {
        var current = this.head;
        while (current) {
            console.log(current.value);
            current = current.next;
        }
    }

    // traverse the list
    // newTail lags behind the current as it will be the new tail
    // If length is zero reset head and tail
    // if length is not zero after the while loop, assign newTail to tail and let go of current which is the actual tail
    pop() {
        var current = this.head;
        var newTail = current;
        if (!current) {
            return null
        }
        while (current.next) {
            newTail = current;
            current = current.next;

        }
        this.length--;
        this.tail = newTail;
        this.tail.next = null;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
    }

    //remove the element at the first position and change the head
    shift() {
        var currentHead = this.head;
        if (!currentHead) {
            return null
        }
        this.length--;
        this.head = this.head.next;
        if (this.length === 0) {

            this.tail = null;
        }
        return currentHead;

    }

    //push new value at the start of the list
    unshift(value) {
        var node = new Node(value);
        if (!this.head) {
            this.head = node;
            this.tail = this.head;
        } else {
            node.next = this.head;
            this.head = node;
        }
        this.length++;
        return this;
    }

    //accepts a position and returns the data
    get(position) {
        if (this.length === 0 || position >= this.length) {
            return null
        }
        var current = this.head;
        for (var i = 0; i < this.length; i++) {

            if (i === position) {
                return current;
            }
            current = current.next;
        }

    }

    //accepts a position and a value and if the node is present at that position. the new value is set at that position.
    set(position, value) {
        var node = this.get(position);
        if (!node) {
            return false
        }
        node.value = value;
        return true;
    }

    //accepts a position and a value and if the node is present at that position. the new node inserted at that position.
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

        var preNode = this.get(position - 1);
        var node = preNode.next;

        var newNode = new Node(value);

        preNode.next = newNode;
        newNode.next = node;
        return true;
    }

    //accepts a position and removes the node at that positio
    remove(position) {
        if (this.length === 0 || position >= this.length) {
            return null
        }
        if (position === 0) {
            return this.shift();

        } else if (position === this.length - 1) {
            return this.pop()

        }
        var preNode = this.get(position - 1);
        var nodeRemoved = preNode.next;
        preNode.next = preNode.next.next;
        return nodeRemoved;

    }

    reverse() {
        var node = this.head;
        this.head = this.tail;
        this.tail = node;
        var next;
        var prev = null;
        for (var i = 0; i < this.length; i++) {
            next = node.next;
            node.next = prev;
            prev = node;
            node = next;
        }

        return this;

    }
}

var sll = new SinglyLinkedList();


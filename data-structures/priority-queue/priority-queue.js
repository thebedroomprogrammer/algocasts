class Node{
    constructor(value,priority){
        this.value = value;
        this.priority = priority;
    }
}

class PriorityQueue {
    constructor() {
        this.values = []
    }

    enqueue(value,priority) {
        var node = new Node(value,priority)
        this.values.push(node)
        this.bubbleUp()

    }

    bubbleUp() {
        var idx = this.values.length - 1;
        var element = this.values[idx];

        while (idx > 0) {
            var parentIdx = Math.floor((idx - 1) / 2);
            var parent = this.values[parentIdx];
            if (element.priority >= parent.priority)
                break;

            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;

        }

    }

    dequeue() {
        var root = this.values[0];
        var end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.bubbleDown()
        }

        return root;

    }

    bubbleDown() {
        var parent = this.values[0]
        var parentIdx = 0;
        while (true) {
            var leftIdx = (2 * parentIdx) + 1;
            var rightIdx = (2 * parentIdx) + 2;
            var leftChild, rightChild, swapIdx = null;

            if (leftIdx < this.values.length) {
                leftChild = this.values[leftIdx];
                if (leftChild.priority < parent.priority) {
                    swapIdx = leftIdx;
                }
            }
            if (rightIdx < this.values.length) {
                rightChild = this.values[rightIdx];
                if ((swapIdx === null && rightChild.priority < parent.priority) || (swapIdx !== null && rightChild.priority < leftChild.priority)) {
                    swapIdx = rightIdx
                }
            }

            if (swapIdx === null) {
                break
            }

            this.values[parentIdx] = this.values[swapIdx];
            this.values[swapIdx] = parent;
            parentIdx = swapIdx;
        }
    }

}

var queue = new PriorityQueue();
queue.enqueue("Work",5)
queue.enqueue("Wake up",1)
queue.enqueue("Eat",4)
queue.enqueue("Brush teeth",2)
queue.enqueue("Make Breakfast",3)




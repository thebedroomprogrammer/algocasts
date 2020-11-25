class MaxBinaryHeap {
    constructor() {
        this.values = []
    }

    insert(value) {
        this.values.push(value)
        this.bubbleUp()

    }

    bubbleUp() {
        var idx = this.values.length - 1;
        var element = this.values[idx];

        while (idx > 0) {
            var parentIdx = Math.floor((idx - 1) / 2);
            var parent = this.values[parentIdx];
            if (element <= parent)
                break;

            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;

        }

    }

    extractMax() {
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
                if (leftChild > parent) {
                    swapIdx = leftIdx;
                }
            }
            if (rightIdx < this.values.length) {
                rightChild = this.values[rightIdx];
                if ((swapIdx === null && rightChild > parent) || (swapIdx !== null && rightChild > leftChild)) {
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

    deleteKey(index) {
        if (index > this.values.length) {
            return null;
        }
        var elementToBeDeleted = this.values[index];
        this.values[index] = Infinity;
        var idx = index;
        var element = this.values[idx];

        while (idx !== 0) {
            var parentIdx = Math.floor((idx - 1) / 2);
            console.log(parentIdx);
            var parent = this.values[parentIdx];

            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
        this.extractMax();
        return elementToBeDeleted;

    }

}

var heap = new MaxBinaryHeap();
heap.insert(87)
heap.insert(72)
heap.insert(70)
heap.insert(55)
heap.insert(58)
heap.insert(47)
heap.insert(42)
heap.insert(35)
heap.insert(34)
heap.insert(26)
heap.insert(25)
heap.insert(38)
heap.insert(39)

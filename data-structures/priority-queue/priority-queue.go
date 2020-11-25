package main

import (
	"errors"
)

const MaxUint = ^uint(0)         // uint of 0 is 64 0s when you complement it you get 64 1s hence the max uint value
const MaxInt = int(MaxUint >> 1) // shift one bit to right 64 64 bits now become 32 and then convert it to int and Voila! you have max int value
type PriorityQueue struct {
	values []Node
}

type Node struct {
	value    string
	priority int
}

func (h *PriorityQueue) enqueue(value string, priority int) {
	node := Node{value, priority}
	h.values = append(h.values, node)
	h.bubbleUp()
}

func (h *PriorityQueue) bubbleUp() {
	idx := len(h.values) - 1
	element := h.values[idx]

	for idx > 0 {
		parentIdx := ((idx - 1) / 2)
		parent := h.values[parentIdx]
		if element.priority >= parent.priority {
			break
		}

		h.values[parentIdx] = element
		h.values[idx] = parent
		idx = parentIdx

	}
}

func (h *PriorityQueue) dequeue() (value Node, err error) {
	if len(h.values) > 0 {
		root := h.values[0]
		end := h.values[len(h.values)-1]
		h.values = h.values[:len(h.values)-1]

		if len(h.values) > 1 {
			h.values[0] = end
			h.bubbleDown()
		}
		return root, nil
	}
	return Node{}, errors.New("no element to extract")

}

func (h *PriorityQueue) bubbleDown() {
	parent := h.values[0]
	parentIdx := 0
	for true {
		leftIdx := (2 * parentIdx) + 1
		rightIdx := (2 * parentIdx) + 2
		var leftChild, rightChild Node
		var swapIdx interface{}
		if leftIdx < len(h.values) {
			leftChild = h.values[leftIdx]
			if leftChild.priority < parent.priority {
				swapIdx = leftIdx
			}
		}
		if rightIdx < len(h.values) {
			rightChild = h.values[rightIdx]
			if (swapIdx == nil && rightChild.priority < parent.priority) || (swapIdx != nil && rightChild.priority < leftChild.priority) {
				swapIdx = rightIdx
			}
		}

		if swapIdx == nil {
			break
		}

		h.values[parentIdx] = h.values[swapIdx.(int)]
		h.values[swapIdx.(int)] = parent
		parentIdx = swapIdx.(int)
	}
}

func main() {
	queue := PriorityQueue{}
	queue.enqueue("Work", 5)
	queue.enqueue("Wake up", 1)
	queue.enqueue("Eat", 4)
	queue.enqueue("Brush teeth", 2)
	queue.enqueue("Make Breakfast", 3)
}

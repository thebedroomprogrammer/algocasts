package main

import (
	"errors"
	"fmt"
)

const MaxUint = ^uint(0)         // uint of 0 is 64 0s when you complement it you get 64 1s hence the max uint value
const MaxInt = int(MaxUint >> 1) // shift one bit to right 64 64 bits now become 32 and then convert it to int and Voila! you have max int value
type MaxBinaryHeap struct {
	values []int
}

func (h *MaxBinaryHeap) insert(value int) {
	h.values = append(h.values, value)
	h.bubbleUp()
}

func (h *MaxBinaryHeap) bubbleUp() {
	idx := len(h.values) - 1
	element := h.values[idx]

	for idx > 0 {
		parentIdx := ((idx - 1) / 2)
		parent := h.values[parentIdx]
		if element <= parent {
			break
		}

		h.values[parentIdx] = element
		h.values[idx] = parent
		idx = parentIdx

	}
}

func (h *MaxBinaryHeap) extractMax() (value int, err error) {
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
	return 0, errors.New("no element to extract")

}

func (h *MaxBinaryHeap) bubbleDown() {
	parent := h.values[0]
	parentIdx := 0
	for true {
		leftIdx := (2 * parentIdx) + 1
		rightIdx := (2 * parentIdx) + 2
		var leftChild, rightChild, swapIdx interface{}
		if leftIdx < len(h.values) {
			leftChild = h.values[leftIdx]
			if leftChild.(int) > parent {
				swapIdx = leftIdx
			}
		}
		if rightIdx < len(h.values) {
			rightChild = h.values[rightIdx]
			if (swapIdx == nil && rightChild.(int) > parent) || (swapIdx != nil && rightChild.(int) > leftChild.(int)) {
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

func (h *MaxBinaryHeap) deleteKey(index int) (value int, err error) {
	if index > len(h.values) {
		return 0, errors.New("out of range")
	}
	elementToBeDeleted := h.values[index]
	h.values[index] = MaxInt
	idx := index
	element := h.values[idx]

	for idx != 0 {
		parentIdx := ((idx - 1) / 2)

		parent := h.values[parentIdx]

		h.values[parentIdx] = element
		h.values[idx] = parent
		idx = parentIdx
	}
	h.extractMax()
	return elementToBeDeleted, nil
}

func main() {
	heap := MaxBinaryHeap{}
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
	heap.extractMax()
	fmt.Println(heap.values)
}

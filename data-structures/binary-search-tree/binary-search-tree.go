package main

import (
	"fmt"
	"math"
)

const MaxUint = ^uint(0)         // uint of 0 is 64 0s when you complement it you get 64 1s hence the max uint value
const MaxInt = int(MaxUint >> 1) // shift one bit to right 64 64 bits now become 32 and then convert it to int and Voila! you have max int value
const MinInt = -MaxInt - 1

type QNode struct {
	value *Node
	next  *QNode
}

type Queue struct {
	first *QNode
	last  *QNode
	size  int32
}

//pushes value at the end of the linked list
func (ll *Queue) enqueue(value *Node) {
	node := QNode{value, nil}
	if ll.first == nil {
		ll.first = &node
		ll.last = &node
	} else {
		ll.last.next = &node
		ll.last = &node

	}
	ll.size++
}

// remove first element from the list
func (ll *Queue) dequeue() *QNode {
	first := ll.first
	if first == nil {
		return nil
	}
	ll.first = ll.first.next
	if ll.size == 0 {
		ll.last = nil
	}
	ll.size--
	return first
}

func (queue *Queue) empty() bool {
	if queue.size == 0 {
		return true
	}
	return false
}

type Node struct {
	value int
	left  *Node
	right *Node
}

type BinarySearchTree struct {
	root *Node
}

func (bst *BinarySearchTree) levelOrderTraversal() {
	if bst.root == nil {
		return
	}
	queue := Queue{}
	queue.enqueue(bst.root)
	for !queue.empty() {
		node := queue.dequeue()
		fmt.Println(node.value.value)
		if node.value.left != nil {
			queue.enqueue(node.value.left)
		}
		if node.value.right != nil {
			queue.enqueue(node.value.right)
		}

	}
}

func (bst *BinarySearchTree) inOrderTraversal(current *Node) {
	if current == nil {
		return
	}
	bst.inOrderTraversal(current.left)
	fmt.Println(current.value)
	bst.inOrderTraversal(current.right)
}

func (bst *BinarySearchTree) preOrderTraversal(current *Node) {
	if current == nil {
		return
	}
	fmt.Println(current.value)
	bst.preOrderTraversal(current.left)
	bst.preOrderTraversal(current.right)
}

func (bst *BinarySearchTree) postOrderTraversal(current *Node) {
	if current == nil {
		return
	}
	bst.postOrderTraversal(current.left)
	bst.postOrderTraversal(current.right)
	fmt.Println(current.value)
}

func (bst *BinarySearchTree) isBst() bool {
	return bst.checkBst(bst.root, MinInt, MaxInt)
}

func (bst *BinarySearchTree) min(current *Node) *Node {
	if current == nil {
		return nil
	}
	if current.left == nil {
		return current
	} else {
		return bst.min(current.left)
	}
}

func (bst *BinarySearchTree) max(current *Node) *Node {
	if current == nil {
		return nil
	}
	if current.right == nil {
		return current
	} else {
		return bst.max(current.right)
	}
}

func (bst *BinarySearchTree) height(current *Node) float64 {
	if current == nil {
		return -1
	}
	leftHeight := bst.height(current.left)
	rightHeight := bst.height(current.right)
	return math.Max(leftHeight, rightHeight) + 1

}

func (bst *BinarySearchTree) checkBst(current *Node, min int, max int) bool {
	if current == nil {
		return true
	}
	if current.value >= min && current.value < max && bst.checkBst(current.left, min, current.value) && bst.checkBst(current.right, current.value, max) {
		return true
	}

	return false
}

func (bst *BinarySearchTree) insert(value int) *BinarySearchTree {
	if bst.root == nil {
		node := Node{value, nil, nil}
		bst.root = &node
		return bst
	} else {
		current := bst.root
		for {
			if value <= current.value {
				if current.left == nil {
					node := Node{value, nil, nil}
					current.left = &node
					return bst
				} else {
					current = current.left
				}
			} else {
				if current.right == nil {
					node := Node{value, nil, nil}
					current.right = &node
					return bst
				} else {
					current = current.right
				}
			}
		}
	}
}

func (bst *BinarySearchTree) find(value int) *Node {
	if bst.root == nil {
		return nil
	} else {
		current := bst.root
		found := false
		for current != nil && found == false {
			if value == current.value {
				found = true
			} else if value <= current.value {
				current = current.left
			} else {
				current = current.right
			}
		}
		return current
	}
}

func (bst *BinarySearchTree) search(value int) bool {
	if bst.find(value) != nil {
		return true
	} else {
		return false
	}
}

func (bst *BinarySearchTree) delete(current *Node, value int) *Node {
	if current == nil {
		return current
	}
	if value < current.value {
		current.left = bst.delete(current.left, value)
	} else if value > current.value {
		current.left = bst.delete(current.right, value)
	} else {
		if current.left == nil && current.right == nil {
			current = nil
		} else if current.left == nil {
			current = current.right
		} else if current.right == nil {
			current = current.left
		} else {
			minRight := bst.min(current.right)
			current.value = minRight.value
			current.right = bst.delete(current.right, minRight.value)
		}
	}

	return current
}

func (bst *BinarySearchTree) inOrderSuccessor(value int) *Node {
	node := bst.find(value)
	if node == nil {
		return node
	}
	if node.right != nil {
		minRight := bst.min(node.right)
		return minRight
	} else {
		ancestor := bst.root

		var successor *Node
		for ancestor.value != node.value {
			if ancestor.value > node.value {
				successor = ancestor
				ancestor = ancestor.left
			} else {
				ancestor = ancestor.right
			}
		}
		return successor
	}

}

func main() {
	bst := BinarySearchTree{nil}
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
	fmt.Println(bst.inOrderSuccessor(42))
}

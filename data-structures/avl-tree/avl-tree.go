package main

import (
	"fmt"
	"math"
)

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

type AVLTree struct {
	root *Node
}

func (avlt *AVLTree) levelOrderTraversal() {
	if avlt.root == nil {
		return
	}
	queue := Queue{}
	queue.enqueue(avlt.root)
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

func (avlt *AVLTree) min(current *Node) *Node {
	if current == nil {
		return nil
	}
	if current.left == nil {
		return current
	} else {
		return avlt.min(current.left)
	}
}

func (avlt *AVLTree) height(current *Node) float64 {
	if current == nil {
		return -1
	}
	leftHeight := avlt.height(current.left)
	rightHeight := avlt.height(current.right)
	return math.Max(leftHeight, rightHeight) + 1

}

func (avlt *AVLTree) rotateRight(current *Node) *Node {
	pivot := current.left
	temp := pivot.right
	pivot.right = current
	current.left=temp
	return pivot

}


func (avlt *AVLTree) rotateLeft(current *Node) *Node {
	pivot := current.right
	temp := pivot.left
	pivot.right = current
	current.right=temp
	return pivot
}

func (avlt *AVLTree) getBalanceFactor(current *Node) float64  {
	return avlt.height(current.left) - avlt.height(current.right)
}

func (avlt *AVLTree) insert(value int) {
	node := Node{value, nil, nil}
	avlt.root = avlt.insertHelper(avlt.root, &node)

}
func (avlt *AVLTree) insertHelper(current *Node, node *Node) *Node {
	if current == nil {
		current = node
	}else if node.value <= current.value {
		current.left = avlt.insertHelper(current.left,node)
		if current.left != nil && avlt.getBalanceFactor(current) > 1{
			if node.value > current.left.value {
				current = avlt.rotateRight(current)
				current = avlt.rotateLeft(current)
			} else {
				current = avlt.rotateRight(current)
			}
		}
	}else if node.value > current.value {
		current.right = avlt.insertHelper(current.right,node)
		if current.right != nil && avlt.getBalanceFactor(current) > 1 {
			if node.value > current.right.value {
				current = avlt.rotateLeft(current);
			} else {
				current = avlt.rotateLeft(current)
				current = avlt.rotateRight(current)

			}
		}
	}
	return current

	// if avlt.root == nil {
	// 	node := Node{value, nil, nil}
	// 	avlt.root = &node
	// 	return avlt
	// } else {
	// 	current := avlt.root
	// 	for {
	// 		if value <= current.value {
	// 			if current.left == nil {
	// 				node := Node{value, nil, nil}
	// 				current.left = &node
	// 				return avlt
	// 			} else {
	// 				current = current.left
	// 			}
	// 		} else {
	// 			if current.right == nil {
	// 				node := Node{value, nil, nil}
	// 				current.right = &node
	// 				return avlt
	// 			} else {
	// 				current = current.right
	// 			}
	// 		}
	// 	}
	// }
}
func (avlt *AVLTree) delete(value int)  {
	avlt.root = avlt.deleteHelper(avlt.root,value)
}
func (avlt *AVLTree) deleteHelper(current *Node, value int) *Node {
	if current == nil {
		return current
	} else if value < current.value {
		current.left = avlt.deleteHelper(current.left, value)
	} else if value > current.value {
		current.right = avlt.deleteHelper(current.right, value)
	} else {
		if current.left == nil && current.right == nil {
			current = nil
		} else if current.left == nil {
			current = current.right
		} else if current.right == nil {
			current = current.left
		} else {
			minRight := avlt.min(current.right)
			current.value = minRight.value
			current.right = avlt.deleteHelper(current.right, minRight.value)
		}
	}

	if current!= nil {
		 balanceFactor := avlt.getBalanceFactor(current)

		if balanceFactor > 1 && avlt.getBalanceFactor(current.left) >= 0 {
			current = avlt.rotateRight(current)
		}
		if balanceFactor > 1 && avlt.getBalanceFactor(current.left) < 0 {
			current = avlt.rotateRight(current)
			current = avlt.rotateLeft(current)
		}
		if balanceFactor < -1 && avlt.getBalanceFactor(current.right) <= 0 {
			current = avlt.rotateLeft(current)
		}
		if balanceFactor < -1 && avlt.getBalanceFactor(current.right) > 0 {
			current = avlt.rotateLeft(current)
			current = avlt.rotateRight(current)
		}
	}
	return current
}

func main() {
	avlt := AVLTree{nil}
	avlt.insert(30)
	avlt.insert(10)
	avlt.insert(5)
	avlt.insert(3)
	avlt.delete(30)
	avlt.levelOrderTraversal()
}

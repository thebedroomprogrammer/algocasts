package main

import "fmt"

var COLOR = map[string]string{
	"RED":   "RED",
	"BLACK": "BLACK",
}

var STATE = map[string]string{
	"RECOLOR": "RECOLOR",
	"ROTATE":  "ROTATE",
	"NONE":    "NONE",
}

var STATE_DELETE = map[string]string{
	"NONE":                         "NONE",
	"SIBLING_BLACK_CHILDREN_BLACK": "SIBLING_BLACK_CHILDREN_BLACK",
	"SIBLING_BLACK_CHILDREN_RED":   "SIBLING_BLACK_CHILDREN_RED",
	"SIBLING_RED":                  "SIBLING_RED",
}

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
	color string
}

type RBTree struct {
	root *Node
}

func (rbt *RBTree) levelOrderTraversal() {
	if rbt.root == nil {
		return
	}
	queue := Queue{}
	queue.enqueue(rbt.root)
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

func (rbt *RBTree) rotateRight(current *Node) *Node {
	pivot := current.left
	temp := pivot.right
	pivot.right = current
	current.left = temp
	return pivot

}


func (rbt *RBTree) rotateLeft(current *Node) *Node {
	pivot := current.right
	temp := pivot.left
	pivot.right = current
	current.right = temp
	return pivot
}

func invert(color string)string {
	if(color == COLOR["RED"]){
		return COLOR["BLACK"]
	}else{
		return COLOR["RED"]
	}

}

func (rbt *RBTree) recolor(current *Node) {
	current.left.color = invert(current.left.color)
	current.right.color = invert(current.right.color)
	if (current != rbt.root) {
		current.color = invert(current.color)
	}
}


func (rbt *RBTree) delete(value int) {
	// rbt.root = rbt.deleteHelper(rbt.root, value)
}

func (rbt *RBTree) insert(value int) {
	newNodeColor := COLOR["BLACK"]
	if rbt.root != nil {
		newNodeColor = COLOR["RED"]
	}
	node := Node{value, nil, nil, newNodeColor}
	rbt.root = rbt.insertHelper(rbt.root,rbt.root &node)

}

func (rbt *RBTree) insertHelper(current *Node, node *Node) *Node,string {

}


func main() {
	rb := RBTree{nil}

	rb.insert(11)
	rb.insert(22)
	rb.insert(1)
	rb.insert(100)
	rb.insert(55)
	rb.insert(43)
	rb.insert(34)
	rb.insert(56)
	rb.insert(76)
	rb.insert(87)

	rb.insert(32)
	rb.insert(66)
	rb.insert(21)
	rb.insert(26)
	rb.insert(84)
	rb.insert(99)
	rb.insert(69)
	rb.insert(91)
	rb.insert(35)

	rb.delete(34)
	rb.delete(56)
	rb.delete(22)
	rb.delete(32)
}

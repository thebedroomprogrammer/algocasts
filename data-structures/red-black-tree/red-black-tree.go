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
		fmt.Println(node.value)
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
	pivot.left = current
	current.right = temp
	return pivot
}

func (rbt *RBTree) invert(color string) string {
	if color == COLOR["RED"] {
		return COLOR["BLACK"]
	} else {
		return COLOR["RED"]
	}

}

func (rbt *RBTree) recolor(current *Node) {
	current.left.color = rbt.invert(current.left.color)
	current.right.color = rbt.invert(current.right.color)
	if current != rbt.root {
		current.color = rbt.invert(current.color)
	}
}

func (rbt *RBTree) delete(value int) {
	rbt.root, _, _ = rbt.deleteHelper(value, rbt.root, rbt.root)
}

func (rbt *RBTree) deleteHelper(value int, current *Node, sibling *Node) (*Node, string, *Node) {
	currentState := STATE_DELETE["NONE"]
	var deletedNode *Node
	returnedState := STATE_DELETE["NONE"]
	var actualDeletedNode *Node
	if current == nil {
		return current, currentState, deletedNode
	}

	if value < current.value {

		returnedNode, stateReturned, nodeDeleted := rbt.deleteHelper(value, current.left, current.right)
		actualDeletedNode = nodeDeleted
		returnedState = stateReturned
		current.left = returnedNode

	} else if value > current.value {

		returnedNode, stateReturned, nodeDeleted := rbt.deleteHelper(value, current.right, current.left)
		actualDeletedNode = nodeDeleted
		returnedState = stateReturned
		current.right = returnedNode

	} else if current.value == value {

		if current.left == nil && current.right == nil {
			deletedNode = current

			current = nil

		} else if current.left == nil {

			current.value = current.right.value
			returnedNode, stateReturned, nodeDeleted := rbt.deleteHelper(current.right.value, current.right, current.left)
			actualDeletedNode = nodeDeleted
			returnedState = stateReturned
			current.right = returnedNode

		} else if current.right == nil {

			current.value = current.left.value
			returnedNode, stateReturned, nodeDeleted := rbt.deleteHelper(current.left.value, current.left, current.right)
			actualDeletedNode = nodeDeleted
			returnedState = stateReturned
			current.left = returnedNode

		} else {

			minRight := rbt.min(current.right)
			current.value = minRight.value
			returnedNode, stateReturned, nodeDeleted := rbt.deleteHelper(minRight.value, current.right, current.left)
			actualDeletedNode = nodeDeleted
			returnedState = stateReturned
			current.right = returnedNode

		}

	}

	if deletedNode != nil {

		node := deletedNode

		// case 1: Node deleted was red
		currentState = rbt.getState(node, sibling)

	}

	if returnedState != STATE_DELETE["NONE"] {

		// case 2: Sibling black and children black
		if returnedState == STATE_DELETE["SIBLING_BLACK_CHILDREN_BLACK"] {
			current, currentState = rbt.siblingBlackChildrenBlack(current, currentState, actualDeletedNode, value, sibling)

		} else if returnedState == STATE_DELETE["SIBLING_RED"] {
			current, currentState = rbt.siblingRed(current, currentState, actualDeletedNode, value)

		} else if returnedState == STATE_DELETE["SIBLING_BLACK_CHILDREN_RED"] {

			current, currentState = rbt.siblingBlackChildrenRed(current, currentState, actualDeletedNode, value)

		}

	}

	if deletedNode != nil {
		return current, currentState, deletedNode

	} else {
		return current, currentState, actualDeletedNode

	}
}

func (rbt *RBTree) siblingBlackChildrenBlack(current *Node, currentState string, actualDeltedNode *Node, value int, sibling *Node) (*Node, string) {
	var sibling1 *Node
	if actualDeltedNode.value == value {
		if value < current.value {
			sibling1 = current.right
		} else {
			sibling1 = current.left

		}

	} else {
		if value > current.value {
			sibling1 = current.right
		} else {
			sibling1 = current.left

		}

	}
	sibling1.color = COLOR["RED"]

	// case where parent made red and child black thats it
	if current.color == COLOR["RED"] {
		current.color = COLOR["BLACK"]

	} else {
		currentState = rbt.getState(current, sibling)
	}

	return current, currentState
}

func (rbt *RBTree) siblingRed(current *Node, currentState string, actualDeltedNode *Node, value int) (*Node, string) {
	// do rotation
	current.color = rbt.invert(current.color)
	var sibling *Node
	var newCurrent *Node
	//comparision must be made always to the cureent value
	// always compare actual deleted nodes value.

	var valueToCompare int

	if actualDeltedNode.value == value {
		valueToCompare = value
	} else {
		valueToCompare = actualDeltedNode.value
	}

	if valueToCompare < current.value {
		current = rbt.rotateLeft(current)

	} else if valueToCompare > current.value {
		current = rbt.rotateRight(current)

	}
	current.color = rbt.invert(current.color)
	if valueToCompare < current.value {
		currentState = rbt.getState(actualDeltedNode, current.left.right)
		sibling = current.left.right
		newCurrent = current.left

	} else if valueToCompare > current.value {
		currentState = rbt.getState(actualDeltedNode, current.right.left)
		sibling = current.right.left
		newCurrent = current.right

	}

	if currentState == STATE_DELETE["SIBLING_BLACK_CHILDREN_BLACK"] {
		returnedNode, stateReturned := rbt.siblingBlackChildrenBlack(newCurrent, currentState, actualDeltedNode, value, sibling)
		currentState = stateReturned
		if valueToCompare < current.value {
			current.left.right = returnedNode

		} else if valueToCompare > current.value {

			current.right.left = returnedNode

		}
	} else if currentState == STATE_DELETE["SIBLING_BLACK_CHILDREN_RED"] {
		returnedNode, stateReturned := rbt.siblingBlackChildrenRed(newCurrent, currentState, actualDeltedNode, value)
		currentState = stateReturned

		if valueToCompare < current.value {
			current.left.right = returnedNode

		} else if valueToCompare > current.value {

			current.right.left = returnedNode

		}
	}

	return current, currentState
}

func (rbt *RBTree) siblingBlackChildrenRed(current *Node, currentState string, actualDeltedNode *Node, value int) (*Node, string) {

	var sibling1 *Node

	if actualDeltedNode.value == value {
		if value < current.value {
			sibling1 = current.right
		} else {
			sibling1 = current.left
		}

	} else {
		if value > current.value {
			sibling1 = current.right
		} else {
			sibling1 = current.left
		}

	}

	//check for far and near child logic

	// sibling is to the left of parent
	if value > sibling1.value {
		//check if child is near
		if sibling1.right.color != COLOR["RED"] && sibling1.left.color == COLOR["RED"] {

			siblingColor := sibling1.color
			sibling1.color = sibling1.right.color
			sibling1.right.color = siblingColor
			current.left = rbt.rotateLeft(current.left)

		}
		//child is far

		//swap color of parent and sibling
		//rotate right
		//change color of far child to black

		parentColor := current.color
		current.color = sibling1.color
		sibling1.color = parentColor
		sibling1.left.color = COLOR["BLACK"]

		current = rbt.rotateRight(current)

	} else if value < sibling1.value {
		//check if child is near
		if sibling1.right.color != COLOR["RED"] && sibling1.left.color == COLOR["RED"] {
			siblingColor := sibling1.color
			sibling1.color = sibling1.left.color
			sibling1.right.color = siblingColor
			current.right = rbt.rotateLeft(current.right)

		}
		//check if child is far

		parentColor := current.color
		current.color = sibling1.color
		sibling1.color = parentColor
		sibling1.right.color = COLOR["BLACK"]

		current = rbt.rotateLeft(current)

	}

	return current, currentState
}

func (rbt *RBTree) min(current *Node) *Node {
	if current == nil {
		return current
	}

	if current.left != nil {
		return rbt.min(current.left)
	}
	return current

}

func (rbt *RBTree) insert(value int) {
	newNodeColor := COLOR["BLACK"]
	if rbt.root != nil {
		newNodeColor = COLOR["RED"]
	}
	node := Node{value, nil, nil, newNodeColor}
	rbt.root, _ = rbt.insertHelper(rbt.root, rbt.root, &node)

}

func (rbt *RBTree) getState(node *Node, sibling *Node) string {
	currentState := STATE_DELETE["NONE"]
	if node.color == COLOR["RED"] { //do nothing
	} else if sibling.color == COLOR["RED"] {
		currentState = STATE_DELETE["SIBLING_RED"]
	} else if sibling.color == COLOR["BLACK"] && ((sibling.left != nil && sibling.left.color == COLOR["RED"]) || (sibling.right != nil && sibling.right.color == COLOR["RED"])) {
		currentState = STATE_DELETE["SIBLING_BLACK_CHILDREN_RED"]
	} else if node.color == COLOR["BLACK"] && sibling.color == COLOR["BLACK"] && (sibling.left == nil || sibling.left.color == COLOR["BLACK"]) && (sibling.right == nil || sibling.right.color == COLOR["BLACK"]) {
		currentState = STATE_DELETE["SIBLING_BLACK_CHILDREN_BLACK"]
	}

	return currentState
}

func (rbt *RBTree) insertHelper(current *Node, sibling *Node, node *Node) (*Node, string) {
	currentState := STATE["NONE"]
	if current == nil {
		current = node
	} else if node.value < current.value {
		returnedNode, returnedState := rbt.insertHelper(current.left, current.right, node)

		current.left = returnedNode
		//detecting red red edge

		if current.color == COLOR["RED"] && current.left.color == COLOR["RED"] {

			if sibling != nil && sibling.color == COLOR["RED"] {

				currentState = STATE["RECOLOR"]
			} else {
				currentState = STATE["ROTATE"]

			}
		}

		if returnedState == STATE["RECOLOR"] {
			rbt.recolor(current)

		} else if returnedState == STATE["ROTATE"] {
			child := current.left
			if child.left != nil && child.left.color == COLOR["RED"] {
				// right rotate
				current.color = rbt.invert(current.color)
				current = rbt.rotateRight(current)
				current.color = rbt.invert(current.color)

			} else if child.right != nil && child.right.color == COLOR["RED"] {
				// left - right rotate
				current.color = rbt.invert(current.color)
				current.left = rbt.rotateLeft(current.left)
				current = rbt.rotateRight(current)
				current.color = rbt.invert(current.color)

			}
		}

	} else if node.value > current.value {
		returnedNode, returnedState := rbt.insertHelper(current.right, current.left, node)

		current.right = returnedNode

		//detecting red red edge
		if current.color == COLOR["RED"] && current.right.color == COLOR["RED"] {
			if sibling != nil && sibling.color == COLOR["RED"] {
				currentState = STATE["RECOLOR"]
			} else {

				currentState = STATE["ROTATE"]

			}
		}

		if returnedState == STATE["RECOLOR"] {
			rbt.recolor(current)

		} else if returnedState == STATE["ROTATE"] {
			child := current.right
			if child.right != nil && child.right.color == COLOR["RED"] {

				// left rotate
				current.color = rbt.invert(current.color)
				current = rbt.rotateLeft(current)
				current.color = rbt.invert(current.color)

			} else if child.left != nil && child.left.color == COLOR["RED"] {

				// right - left rotate

				current.color = rbt.invert(current.color)

				current.right = rbt.rotateRight(current.right)

				current = rbt.rotateLeft(current)
				current.color = rbt.invert(current.color)
			}
		}
	}

	return current, currentState
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
	rb.levelOrderTraversal()

	// fmt.Println(rb)
}

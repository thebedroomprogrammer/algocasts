package main

import "fmt"

type Node struct {
	value int
	left  *Node
	right *Node
}

type BinarySearchTree struct {
	root *Node
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

func (bst *BinarySearchTree) search(value int) bool {

	if bst.root == nil {
		return false
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
		return found
	}
}

func main() {
	bst := BinarySearchTree{nil}
	bst.insert(20)
	bst.insert(25)
	bst.insert(15)
	bst.insert(10)
	bst.insert(30)
	fmt.Println(bst.search(30))
}

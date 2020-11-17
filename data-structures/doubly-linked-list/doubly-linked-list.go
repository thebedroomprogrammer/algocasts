package main

import (
	"fmt"
)

type Node struct {
	value    int32
	next     *Node
	previous *Node
}

type DoublyLinkedList struct {
	head   *Node
	tail   *Node
	length int32
}

//pushes value at the end of the linked list
func (dl *DoublyLinkedList) push(value int32) {
	node := Node{value, nil, nil}

	if dl.head == nil {
		dl.head = &node
		dl.tail = &node
	} else {
		dl.tail.next = &node
		node.previous = dl.tail
		dl.tail = &node
	}
	dl.length++
}

//traverse and print the list
func (dl *DoublyLinkedList) traverse() {
	current := dl.head
	for current != nil {
		fmt.Println(current.value)
		current = current.next
	}
}

//push new value at the start of the list
func (dl *DoublyLinkedList) unshift(value int32) *DoublyLinkedList {
	node := Node{value, nil, nil}
	if dl.head == nil {
		dl.head = &node
		dl.tail = &node
	} else {
		node.next = dl.head
		dl.head.previous = &node
		dl.head = &node
	}
	dl.length++
	return dl
}

//pop last element
func (dl *DoublyLinkedList) pop() *Node {
	if dl.length == 0 {
		return nil
	}
	removedNode := dl.head
	if dl.length == 1 {
		dl.head = nil
		dl.tail = nil
		dl.length--
		return removedNode
	} else {
		dl.tail = dl.tail.previous
		dl.tail.next = nil
		removedNode.previous = nil
		dl.length--
		return removedNode
	}
}

// remove first element from the list
func (dl *DoublyLinkedList) shift() *Node {
	head := dl.head
	if head == nil {
		return nil
	}
	if dl.length == 1 {
		dl.head = nil
		dl.tail = nil
	} else {
		dl.head.next.previous = nil
		dl.head = dl.head.next
		head.next = nil
	}
	dl.length--
	return head
}

//get element at the position
func (dl *DoublyLinkedList) get(position int32) *Node {
	if dl.length == 0 || position >= dl.length {
		return nil
	}
	var currentNode *Node
	if position <= dl.length/2 {
		currentNode = dl.head
		for i := 0; int32(i) < dl.length; i++ {
			if position == int32(i) {
				return currentNode
			}
			currentNode = currentNode.next
		}
	} else {
		currentNode = dl.tail
		for i := dl.length - 1; int32(i) >= 0; i-- {
			if position == int32(i) {
				return currentNode
			}
			currentNode = currentNode.previous
		}
	}
	return currentNode
}

//accepts a position and a value and if the node is present at that position. the new value is set at that position.
func (dl *DoublyLinkedList) set(position int32, value int32) bool {
	node := dl.get(position)
	if node == nil {
		return false
	}
	node.value = value
	return true
}

//accepts a position and a value and if the node is present at that position. the new node inserted at that position.
func (dl *DoublyLinkedList) insert(position int32, value int32) bool {
	if dl.length == 0 || position >= dl.length {
		return false
	}
	if position == 0 {
		dl.unshift(value)
		return true
	} else if position == dl.length-1 {
		dl.push(value)
		return true
	} else {
		node := dl.get(position)
		newNode := Node{value, nil, nil}
		newNode.previous = node.previous
		node.previous.next = &newNode
		node.previous = &newNode
		newNode.next = node
		dl.length++
		return true
	}
}
func (dl *DoublyLinkedList) remove(position int32) *Node {
	if dl.length == 0 || position >= dl.length {
		return nil
	}
	if position == 0 {
		return dl.shift()
	} else if position == dl.length-1 {
		return dl.pop()
	} else {
		node := dl.get(position)
		node.previous.next = node.next
		node.next.previous = node.previous
		node.next = nil
		node.previous = nil
		dl.length--
		return node

	}
}

func main() {
	dl := DoublyLinkedList{}
	dl.push(1)
	dl.push(2)
	dl.push(3)
	dl.push(4)

	dl.remove(0)
	dl.traverse()

}

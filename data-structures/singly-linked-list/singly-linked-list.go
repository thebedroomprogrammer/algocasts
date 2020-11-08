package main

import (
	"fmt"
)

type Node struct {
	value int32
	next  *Node
}

type SinglyLinkedList struct {
	head   *Node
	tail   *Node
	length int32
}

//pushes value at the end of the linked list
func (ll *SinglyLinkedList) push(value int32) {
	node := Node{value, nil}
	if ll.head == nil {
		ll.head = &node
		ll.tail = &node
	} else {
		ll.tail.next = &node
		ll.tail = &node

	}
	ll.length++
}

//traverse and print the list
func (ll *SinglyLinkedList) traverse() {
	current := ll.head
	for current != nil {
		fmt.Println(current.value)
		current = current.next
	}
}

//push new value at the start of the list
func (ll *SinglyLinkedList) unshift(value int32) *SinglyLinkedList {
	node := Node{value, nil}
	if ll.head == nil {
		ll.head = &node
		ll.tail = &node
	} else {
		node.next = ll.head
		ll.head = &node
	}
	ll.length++
	return ll
}

//pop last element
func (ll *SinglyLinkedList) pop() *Node {
	current := ll.head
	newTail := current
	if current == nil {
		return nil
	}

	for current.next != nil {
		newTail = current
		current = current.next
	}
	ll.length--
	ll.tail = newTail
	ll.tail.next = nil
	if ll.length == 0 {
		ll.head = nil
		ll.tail = nil
	}
	return current
}

// remove first element from the list
func (ll *SinglyLinkedList) shift() *Node {
	head := ll.head
	if head == nil {
		return nil
	}
	ll.head = ll.head.next
	if ll.length == 0 {
		ll.tail = nil
	}
	ll.length--
	return head
}

//get element at the position
func (ll *SinglyLinkedList) get(position int32) *Node {
	if ll.length == 0 || position >= ll.length {
		return nil
	}
	current := ll.head

	for i := int32(0); i < ll.length; i++ {
		if i == position {
			break
		}
		current = current.next
	}
	return current
}

//accepts a position and a value and if the node is present at that position. the new value is set at that position.
func (ll *SinglyLinkedList) set(position int32, value int32) bool {
	node := ll.get(position)
	if node == nil {
		return false
	}
	node.value = value
	return true
}

//accepts a position and a value and if the node is present at that position. the new node inserted at that position.
func (ll *SinglyLinkedList) insert(position int32, value int32) bool {
	if ll.length == 0 || position >= ll.length {
		return false
	}
	if position == 0 {
		ll.unshift(value)
		return true
	} else if position == ll.length-1 {
		ll.push(value)
		return true
	} else {
		preNode := ll.get(position - 1)
		node := preNode.next
		newNode := Node{value, nil}
		preNode.next = &newNode
		newNode.next = node
		ll.length++
		return true
	}
}
func (ll *SinglyLinkedList) remove(position int32) *Node {
	if ll.length == 0 || position >= ll.length {
		return nil
	}
	if position == 0 {
		return ll.shift()
	} else if position == ll.length-1 {
		return ll.pop()
	} else {
		preNode := ll.get(position - 1)
		nodeRemoved := preNode.next
		preNode.next = preNode.next.next
		return nodeRemoved
	}
}

func (ll *SinglyLinkedList) reverse() *SinglyLinkedList {
	node := ll.head
	ll.head = ll.tail
	ll.tail = node
	var next *Node
	var prev *Node = nil
	for i := 0; int32(i) < ll.length; i++ {
		next = node.next
		node.next = prev
		prev = node
		node = next
	}

	return ll
}

func main() {
	ll := SinglyLinkedList{}
	ll.push(1)
	ll.push(2)
	ll.push(3)
	ll.push(4)
	ll.traverse()
	ll.reverse()
	ll.traverse()
}

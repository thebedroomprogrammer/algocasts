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

func main() {
	ll := SinglyLinkedList{}
	
	ll.push(1)
	ll.push(2)
	ll.push(3)
	
fmt.Println(ll.head.next.next.next)

}


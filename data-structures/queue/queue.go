package main

import "fmt"

type Node struct {
	value int32
	next  *Node
}

type Queue struct {
	first *Node
	last  *Node
	size  int32
}

//pushes value at the end of the linked list
func (ll *Queue) enqueue(value int32) {
	node := Node{value, nil}
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
func (ll *Queue) dequeue() *Node {
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

func main() {
	q := Queue{}
	q.enqueue(1)
	q.enqueue(2)
	q.enqueue(3)
	fmt.Println(q.dequeue())

}

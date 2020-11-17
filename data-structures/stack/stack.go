package main

import "fmt"

type Node struct {
	value int32
	next  *Node
}

type Stack struct {
	first *Node
	last  *Node
	size  int32
}

func (ll *Stack) push(value int32) *Stack {
	node := Node{value, nil}
	if ll.first == nil {
		ll.first = &node
		ll.last = &node
	} else {
		node.next = ll.first
		ll.first = &node
	}
	ll.size++
	return ll
}

func (ll *Stack) pop() *Node {
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
	stack := Stack{}
	stack.push(1)
	stack.push(2)
	stack.push(3)
	stack.pop()
	fmt.Println(stack.pop())

}

package main

import "fmt"

type FenwickTree struct {
	indexedArray []int
}

func (ft *FenwickTree) getSum(position int) int {
	sum := 0
	position += 1
	for position > 0 {
		sum += ft.indexedArray[position]

		position -= (position & -position)
	}
	return sum
}

func (ft *FenwickTree) update(position int, element int) {
	position += 1

	for position < len(ft.indexedArray) {
		ft.indexedArray[position] += element
		position += (position & -position)
	}
}

func (ft *FenwickTree) create(arr []int) {
	ft.indexedArray = make([]int, len(arr)+1)

	for i, element := range arr {
		ft.update(i, element)
	}
}

func main() {
	arr := []int{3, 2, -1, 5, 6, 4, -2, 3, 7, 2, 3}
	ft := FenwickTree{}
	ft.create(arr)
	fmt.Println(ft.getSum(10))
}

package main

import "fmt"

func main() {
	arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11}
	fmt.Println(binarySearch(arr, 112))
}

func binarySearch(arr []int, value int) int {
	left := 0
	right := len(arr) - 1
	middle := (right + left) / 2
	for left <= right && arr[middle] != value {
		if value < arr[middle] {
			right = middle - 1
		} else {
			left = middle + 1
		}

		middle = (right + left) / 2

	}
	if arr[middle] == value {
		return middle
	}

	return -1
}

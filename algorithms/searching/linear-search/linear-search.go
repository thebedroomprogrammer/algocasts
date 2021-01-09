package main

import (
	"fmt"
)

func main() {
	arr := []int{1, 2, 3, 4, 5, 6, 67, 8}
	fmt.Println(linearSearch(arr, 1))

}

func linearSearch(arr []int, value int) bool {
	for i := 0; i < len(arr); i++ {
		if arr[i] == value {
			return i
		}
	}
	return -1
}

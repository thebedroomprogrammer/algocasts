package main

import "fmt"

func main() {
	arr := []int{3, 4, 5, 1, 3, 5, 6, 6, 78}
	fmt.Println(selectionSort(arr))
}

func selectionSort(arr []int) []int {
	for i := 0; i < len(arr); i++ {
		min := i
		for j := i + 1; j < len(arr); j++ {

			if arr[j] < arr[min] {
				min = j

			}
		}

		if min != i {
			var temp = arr[i]
			arr[i] = arr[min]
			arr[min] = temp

		}

	}
	return arr
}

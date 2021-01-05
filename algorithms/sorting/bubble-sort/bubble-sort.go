package main

import "fmt"

func main() {
	arr := []int{3, 4, 5, 1, 3, 5, 6, 6, 78}
	fmt.Println(bubbleSort(arr))
}

func bubbleSort(arr []int) []int {
	for i := len(arr); i > 0; i-- {
		hasSwapped := false
		for j := 0; j < i-1; j++ {

			if arr[j+1] < arr[j] {
				hasSwapped = true
				temp := arr[j]
				arr[j] = arr[j+1]
				arr[j+1] = temp
			}
		}
		if !hasSwapped {
			break
		}
	}
	return arr
}

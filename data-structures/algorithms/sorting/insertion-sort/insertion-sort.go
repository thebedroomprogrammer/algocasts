package main

import "fmt"

func main() {
	arr := []int{3, 4, 5, 1, 3, 5, 6, 6, 78}
	fmt.Println(insertionSort(arr))
}

func insertionSort(a []int) []int {
	for i := 0; i < len(a); i++ {
		val := a[i]
		j := i - 1
		for ; j >= 0 && a[j] > val; j-- {
			a[j+1] = a[j]
		}
		a[j+1] = val
	}
	return a
}

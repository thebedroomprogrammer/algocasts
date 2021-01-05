package main

import "fmt"

func main() {
	a := []int{22, 11, 231, 101, 222, 412, 99, 87, 66}
	fmt.Println(mergeSort(a))

}

func mergeSort(a []int) []int {
	length := len(a)
	if length <= 1 {
		return a
	}
	a1 := a[0 : length/2]
	a2 := a[length/2:]

	return merge(mergeSort(a1), mergeSort(a2))

}

func merge(a []int, b []int) []int {
	result := []int{}
	i := 0
	j := 0

	for i < len(a) && j < len(b) {

		if a[i] < b[j] {
			result = append(result, a[i])
			i++
		} else {
			result = append(result, b[j])
			j++
		}
	}

	if i < len(a) {
		result = append(result, a[i:]...)
	}
	if j < len(b) {
		result = append(result, b[j:]...)

	}
	return result
}

package main

import "fmt"

func main() {
	a := []int{33, 1123, 3, 45, 4, 54, 52, 12, 3132, 12315, 5, 565}
	fmt.Println(quickSort(a, 0, len(a)-1))
}

func swap(a []int, i int, j int) {
	temp := a[i]
	a[i] = a[j]
	a[j] = temp
}

func pivot(a []int, start int) int {
	pivotElement := a[start]
	pivotIdx := start

	for i := start; i < len(a); i++ {
		if pivotElement > a[i] {
			pivotIdx++
			swap(a, pivotIdx, i)
		}
	}
	swap(a, start, pivotIdx)
	return pivotIdx

}

func quickSort(a []int, start int, end int) []int {
	if start < end {
		pivotIdx := pivot(a, start)
		quickSort(a, start, pivotIdx-1)
		quickSort(a, pivotIdx+1, end)
	}
	return a

}

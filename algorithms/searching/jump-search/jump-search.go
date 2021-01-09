package main

import (
	"fmt"
	"math"
)

func main() {
	k := []int{3, 4, 5, 6, 7, 8, 9, 10, 14, 15, 17}
	fmt.Println(jumpSearch(k, 142))
}

func jumpSearch(arr []int, value int) int {
	len := len(arr)
	step := math.Floor(math.Sqrt(float64(len)))

	prev := 0
	for arr[int(math.Min(step, float64(len))-1)] < value {

		prev = int(step)
		step += math.Floor(math.Sqrt(float64(len)))
		if prev >= len {
			return -1

		}
	}

	for i := prev; i < int(step); i++ {
		if arr[i] == value {
			return i
		}
	}

	return -1
}
